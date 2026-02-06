import os
from PIL import Image, ImageEnhance, ImageOps
import numpy as np
from pathlib import Path
from typing import Tuple, Optional
import json

# ===============================
# CONFIG
# ===============================
RAW_DIR = "dataset/raw"
PROCESSED_DIR = "dataset/processed"
TARGET_SIZE = 384  # Taille plus élevée pour préserver la qualité
MIN_SIZE_THRESHOLD = 300  # Ne pas upscaler si l'image est plus petite
CROP_MODE = "center"  # Center crop - pas de padding artificiel
APPLY_CLAHE = False  # Désactiver CLAHE pour préserver les couleurs naturelles

# ===============================
# PREPROCESSING FUNCTIONS
# ===============================
def center_crop_resize(img: Image.Image, target_size: int) -> Tuple[Image.Image, dict]:
    """
    Center crop to square then resize. No padding = no artificial patterns.
    This prevents the model from learning padding artifacts.
    """
    w, h = img.size
    
    # Don't upscale very small images
    max_dim = max(w, h)
    if max_dim < MIN_SIZE_THRESHOLD:
        actual_target = max_dim
        print(f"      ⚠️  Small image ({w}x{h}), using size: {actual_target}x{actual_target}")
    else:
        actual_target = target_size
    
    # Center crop to square
    crop_size = min(w, h)  # Take the smaller dimension
    left = (w - crop_size) // 2
    top = (h - crop_size) // 2
    right = left + crop_size
    bottom = top + crop_size
    
    cropped = img.crop((left, top, right, bottom))
    
    # Resize to target size with high quality
    if crop_size != actual_target:
        resized = cropped.resize((actual_target, actual_target), Image.LANCZOS)
    else:
        resized = cropped
    
    metadata = {
        "original_size": (w, h),
        "crop_size": crop_size,
        "crop_box": (left, top, right, bottom),
        "final_size": actual_target,
        "aspect_ratio": w / h
    }
    
    return resized, metadata

def enhance_quality(img: Image.Image) -> Image.Image:
    """
    Apply subtle enhancements to improve image quality without distortion.
    Uses PIL for better quality preservation.
    """
    # Slight sharpness boost
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.1)
    
    # Slight contrast adjustment
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.05)
    
    return img

def quality_check(img: Image.Image) -> dict:
    """
    Perform quality checks on image using PIL.
    """
    img_array = np.array(img.convert('L'))  # Convert to grayscale
    
    # Check brightness
    brightness = float(np.mean(img_array))
    
    # Check contrast
    contrast = float(np.std(img_array))
    
    # Get image size
    width, height = img.size
    resolution = width * height
    
    return {
        "brightness": brightness,
        "contrast": contrast,
        "resolution": resolution,
        "dimensions": (width, height),
        "is_too_dark": brightness < 50,
        "is_too_bright": brightness > 200,
        "is_low_contrast": contrast < 30
    }

# ===============================
# MAIN PREPROCESSING PIPELINE
# ===============================
def preprocess_phone_dataset():
    """
    Preprocess raw phone images with scientific rigor.
    """
    Path(PROCESSED_DIR).mkdir(parents=True, exist_ok=True)
    
    # Get class names from RAW_DIR (folders)
    classes = [d for d in os.listdir(RAW_DIR) if os.path.isdir(os.path.join(RAW_DIR, d))]
    
    print(f"🔬 High-Quality Preprocessing Pipeline")
    print(f"Target size: {TARGET_SIZE}×{TARGET_SIZE} (square crop)")
    print(f"Min threshold: {MIN_SIZE_THRESHOLD}px (no upscaling)")
    print(f"Crop mode: {CROP_MODE} (no padding artifacts)")
    print(f"CLAHE: {'Enabled' if APPLY_CLAHE else 'Disabled (preserving natural colors)'}")
    print(f"Classes: {classes}\n")
    
    processing_log = {
        "config": {
            "target_size": TARGET_SIZE,
            "min_size_threshold": MIN_SIZE_THRESHOLD,
            "crop_mode": CROP_MODE,
            "apply_clahe": APPLY_CLAHE,
            "preprocessing_steps": [
                "center_crop_square",
                "resize_lanczos",
                "subtle_enhancement",
                "quality_check"
            ],
            "quality_settings": {
                "resampling": "LANCZOS",
                "jpeg_quality": 98,
                "no_padding": True
            }
        },
        "classes": {}
    }
    
    for cls in classes:
        print(f"📁 Processing class: {cls}")
        
        class_input = os.path.join(RAW_DIR, cls)
        class_output = os.path.join(PROCESSED_DIR, cls)
        Path(class_output).mkdir(parents=True, exist_ok=True)
        
        images = [f for f in os.listdir(class_input)
                 if f.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp'))]
        
        class_stats = {
            "total_images": len(images),
            "processed": 0,
            "failed": 0,
            "quality_issues": []
        }
        
        for img_name in images:
            img_path = os.path.join(class_input, img_name)
            
            try:
                # Read image with PIL (better quality than cv2)
                img = Image.open(img_path).convert('RGB')
                
                # Step 1: Center crop to square (no padding)
                cropped, metadata = center_crop_resize(img, TARGET_SIZE)
                
                # Step 2: Subtle quality enhancement (no aggressive processing)
                enhanced = enhance_quality(cropped)
                
                # Step 3: Quality check
                quality = quality_check(enhanced)
                
                # Save processed image with maximum quality
                base_name = os.path.splitext(img_name)[0]
                output_path = os.path.join(class_output, f"{base_name}.jpg")
                enhanced.save(output_path, 'JPEG', quality=98, optimize=True, subsampling=0)
                
                # Log quality issues
                if quality["is_too_dark"] or quality["is_too_bright"] or quality["is_low_contrast"]:
                    class_stats["quality_issues"].append({
                        "filename": img_name,
                        "quality": quality,
                        "metadata": metadata
                    })
                
                class_stats["processed"] += 1
                
            except Exception as e:
                print(f"   ⚠️  Failed: {img_name} - {e}")
                class_stats["failed"] += 1
        
        processing_log["classes"][cls] = class_stats
        print(f"   ✅ Processed: {class_stats['processed']}/{len(images)}")
        
        if class_stats["quality_issues"]:
            print(f"   ⚠️  Quality issues: {len(class_stats['quality_issues'])}")
    
    # Save processing log
    log_path = os.path.join(PROCESSED_DIR, "preprocessing_log.json")
    with open(log_path, 'w') as f:
        json.dump(processing_log, f, indent=2)
    
    print(f"\n✅ Preprocessing complete!")
    print(f"📊 Log saved: {log_path}")

# ===============================
# RUN
# ===============================
if __name__ == "__main__":
    preprocess_phone_dataset()
