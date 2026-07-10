from PIL import Image
import os
import math

folder = 'public/assets'
for filename in os.listdir(folder):
    if filename.endswith('.jpeg'):
        path = os.path.join(folder, filename)
        try:
            img = Image.open(path).convert("RGBA")
            data = img.load()
            width, height = img.size
            
            # Sample a few pixels from the corners to find the background color
            corners = [data[0,0], data[width-1,0], data[0,height-1], data[width-1,height-1]]
            # We assume the background is pinkish (R and B high, G lower)
            # Just take top-left corner
            bg = data[0,0]
            
            for y in range(height):
                for x in range(width):
                    r, g, b, a = data[x, y]
                    # Calculate distance to background color
                    dist = math.sqrt((r - bg[0])**2 + (g - bg[1])**2 + (b - bg[2])**2)
                    
                    # If it's very close to background, make it white
                    if dist < 50:
                        data[x, y] = (255, 255, 255, 255)
                    elif dist < 80:
                        # Blend it to white to reduce halo
                        factor = (dist - 50) / 30.0
                        new_r = int(r * factor + 255 * (1 - factor))
                        new_g = int(g * factor + 255 * (1 - factor))
                        new_b = int(b * factor + 255 * (1 - factor))
                        data[x, y] = (new_r, new_g, new_b, 255)
                        
            # Save it back as JPEG (convert back to RGB)
            img.convert("RGB").save(path, "JPEG", quality=95)
            print(f"Processed {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
