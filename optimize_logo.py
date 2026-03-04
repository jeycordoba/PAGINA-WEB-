import os
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call(["pip", "install", "Pillow"])
    from PIL import Image

image_path = 'images/Spiral_logo.png'
logo_out = 'images/logo_optimized.webp'
favicon_out = 'images/favicon.png'

with Image.open(image_path) as img:
    print(f"Original size: {img.size}")
    
    # Create optimized webp
    img.save(logo_out, 'WEBP', quality=85)
    print(f"Saved {logo_out}")
    
    # Create favicon
    width, height = img.size
    if width != height:
        new_size = max(width, height)
        new_img = Image.new('RGBA', (new_size, new_size), (255, 255, 255, 0))
        new_img.paste(img, ((new_size - width) // 2, (new_size - height) // 2))
        favicon_img = new_img.resize((64, 64), Image.Resampling.LANCZOS)
    else:
        favicon_img = img.resize((64, 64), Image.Resampling.LANCZOS)
        
    favicon_img.save(favicon_out, 'PNG')
    print(f"Saved {favicon_out}")
