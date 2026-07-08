import logging
import cv2
import os
import tempfile
import numpy as np
import gc
import psutil

logger = logging.getLogger(__name__)

def log_memory(step_name):
    process = psutil.Process(os.getpid())
    mem_info = process.memory_info()
    # RSS (Resident Set Size) in MB
    rss_mb = mem_info.rss / (1024 * 1024)
    logger.info(f"MEMORY [{step_name}]: {rss_mb:.2f} MB")

# ============================================
# IMAGE ENHANCEMENT
# ============================================

def enhance_image(image_path: str):
    """
    Enhance brightness for low-light images.
    Returns temporary enhanced image path.
    """

    temp_path = None

    try:
        img = cv2.imread(image_path)

        if img is None:
            logger.error(f"Could not read image: {image_path}")
            return None

        # Convert to HSV
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        h, s, v = cv2.split(hsv)

        # Increase brightness safely (scalar, not array)
        v = cv2.add(v, 40)

        final_hsv = cv2.merge((h, s, v))

        enhanced_img = cv2.cvtColor(final_hsv, cv2.COLOR_HSV2BGR)

        # Create temp file
        fd, temp_path = tempfile.mkstemp(suffix=".jpg")

        os.close(fd)

        cv2.imwrite(temp_path, enhanced_img)

        return temp_path

    except Exception as e:
        logger.error(f"Image enhancement failed: {e}")

        # Cleanup if partially created
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass

        return None



# ============================================
# EMBEDDING COMPARISON
# ============================================

def compare_embeddings(emb1, emb2, threshold: float = 0.50):
    """
    Compare two embeddings using cosine distance.

    Returns:
        (is_match, distance)
    """

    try:
        a = np.array(emb1, dtype=np.float32)
        b = np.array(emb2, dtype=np.float32)

        # Shape validation
        if a.shape != b.shape:
            logger.warning(
                f"Embedding shape mismatch: {a.shape} vs {b.shape}"
            )
            return False, 1.0

        # Avoid divide-by-zero
        norm_a = np.linalg.norm(a)
        norm_b = np.linalg.norm(b)

        if norm_a == 0 or norm_b == 0:
            logger.warning("Zero vector embedding detected")
            return False, 1.0

        # Cosine distance
        cosine_dist = 1 - (np.dot(a, b) / (norm_a * norm_b))

        logger.info(
            f"Cosine Distance: {cosine_dist:.4f} (Threshold: {threshold})"
        )

        return bool(cosine_dist < threshold), float(cosine_dist)

    except Exception as e:
        logger.error(f"Embedding comparison failed: {e}")
        return False, 1.0
