import os
import time
import json
import gc
import cv2
import psutil
import logging
from flask import Flask
from models import db, PendingFace, FaceData

# Disable GPU/CUDA to prevent XLA/StreamExecutor crashes
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - WORKER - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load TensorFlow/DeepFace ONLY in this worker script
try:
    from deepface import DeepFace
    logger.info("Initializing DeepFace model globally in worker...")
    DeepFace.build_model("Facenet")
    logger.info("DeepFace initialized successfully.")
except Exception as e:
    logger.error(f"Failed to load DeepFace: {e}")

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

def create_worker_app():
    """Create a minimal Flask app solely to provide an application context for SQLAlchemy."""
    app = Flask(__name__)
    
    database_url = os.environ.get('DATABASE_URL', 'sqlite:///ration.db')
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
        
    if 'pgbouncer=true' in database_url:
        database_url = database_url.replace('&pgbouncer=true', '').replace('?pgbouncer=true', '')
        if database_url.endswith('?'):
            database_url = database_url[:-1]
            
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
        'pool_timeout': 30
    }
    
    db.init_app(app)
    return app

def log_memory(step_name):
    process = psutil.Process(os.getpid())
    mem_info = process.memory_info()
    rss_mb = mem_info.rss / (1024 * 1024)
    logger.info(f"MEMORY [{step_name}]: {rss_mb:.2f} MB")

def extract_embedding(image_path: str):
    """
    Extract face embedding specifically tuned for the daemon worker.
    """
    logger.info(f"Starting face extraction for: {image_path}")
    log_memory("Before Image Decoding")

    try:
        img = cv2.imread(image_path)
        log_memory("After Image Decoding")

        if img is None:
            raise ValueError(f"Failed to read image: {image_path}")

        # Downscale image to max 640x640 to prevent OOM crashes
        max_dim = 640
        h, w = img.shape[:2]
        if h > max_dim or w > max_dim:
            scale = max_dim / max(h, w)
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
            # Overwrite the original file with the downscaled version, using JPEG quality 75
            cv2.imwrite(image_path, img, [int(cv2.IMWRITE_JPEG_QUALITY), 75])
            logger.info(f"Image resized to prevent OOM. New Shape: {img.shape}")
            
        log_memory("After Image Resizing")
        logger.info("Trying OpenCV detector...")
        log_memory("Before DeepFace.represent")

        gc.collect()
        objs = DeepFace.represent(
            img_path=image_path,
            model_name="Facenet",
            detector_backend="opencv",
            enforce_detection=True,
            align=True
        )
        
        log_memory("After DeepFace.represent")

        if objs and len(objs) > 0:
            logger.info("Face detected successfully.")
            embedding = objs[0]["embedding"]
            del objs
            del img
            gc.collect()
            return embedding
        else:
            raise ValueError("No face found in image.")

    except Exception as e:
        logger.error(f"Extraction error: {e}")
        try:
            del img
            gc.collect()
        except Exception:
            pass
        raise e

def run_worker():
    app = create_worker_app()
    logger.info("Face Processing Worker Daemon Started.")
    
    while True:
        with app.app_context():
            try:
                # Find pending faces
                pending = PendingFace.query.filter_by(status='pending').all()
                
                if not pending:
                    pass # Sleep quietly
                else:
                    logger.info(f"Found {len(pending)} pending face(s) to process.")
                    
                    for task in pending:
                        logger.info(f"Processing task ID {task.id} for member {task.member_id}")
                        task.status = 'processing'
                        db.session.commit()
                        
                        full_path = os.path.join(UPLOAD_FOLDER, task.face_image_path)
                        
                        try:
                            if not os.path.exists(full_path):
                                raise FileNotFoundError(f"Image not found at {full_path}")
                                
                            embedding = extract_embedding(full_path)
                            
                            face_data = FaceData(
                                member_id=task.member_id,
                                family_id=task.family_id,
                                face_embedding_vector=json.dumps(embedding),
                                face_image_path=task.face_image_path
                            )
                            db.session.add(face_data)
                            task.status = 'completed'
                            db.session.commit()
                            logger.info(f"Task ID {task.id} completed successfully.")
                            
                        except Exception as e:
                            logger.error(f"Task ID {task.id} failed: {e}")
                            db.session.rollback() # Rollback the FaceData insert if failed
                            
                            # Update status to failed in a new transaction
                            failed_task = db.session.get(PendingFace, task.id)
                            if failed_task:
                                failed_task.status = 'failed'
                                failed_task.error_message = str(e)
                                db.session.commit()
                        
                        # Aggressive GC between tasks to maintain low memory
                        gc.collect()
                        
            except Exception as e:
                logger.error(f"Worker iteration crashed: {e}")
                db.session.rollback()
                
        # Wait 30 seconds before polling again
        time.sleep(30)

if __name__ == '__main__':
    run_worker()
