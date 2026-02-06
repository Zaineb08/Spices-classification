import os
import shutil
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps
import random
import json

# ===============================
# CONFIG
# ===============================
MERGED_DIR = "dataset/merged"
EXTERNAL_DIR = "dataset/external"
BALANCED_DIR = "dataset/balanced"
TARGET_IMAGES_PER_CLASS = 200
RANDOM_SEED = 42

# ===============================
# AUGMENTATION FUNCTIONS
# ===============================
def augment_image(img: Image.Image, aug_type: str) -> Image.Image:
    """
    Apply specific augmentation to an image.
    """
    if aug_type == "flip":
        return img.transpose(Image.FLIP_LEFT_RIGHT)
    
    elif aug_type == "rotate_15":
        return img.rotate(15, resample=Image.BICUBIC, expand=False, fillcolor=(255, 255, 255))
    
    elif aug_type == "rotate_-15":
        return img.rotate(-15, resample=Image.BICUBIC, expand=False, fillcolor=(255, 255, 255))
    
    elif aug_type == "brightness_up":
        enhancer = ImageEnhance.Brightness(img)
        return enhancer.enhance(1.2)
    
    elif aug_type == "brightness_down":
        enhancer = ImageEnhance.Brightness(img)
        return enhancer.enhance(0.8)
    
    elif aug_type == "contrast_up":
        enhancer = ImageEnhance.Contrast(img)
        return enhancer.enhance(1.2)
    
    elif aug_type == "contrast_down":
        enhancer = ImageEnhance.Contrast(img)
        return enhancer.enhance(0.8)
    
    elif aug_type == "color":
        enhancer = ImageEnhance.Color(img)
        return enhancer.enhance(1.1)
    
    elif aug_type == "sharpness":
        enhancer = ImageEnhance.Sharpness(img)
        return enhancer.enhance(1.3)
    
    return img

def create_augmentations(img_path: str, num_augmentations: int) -> list:
    """
    Create multiple augmented versions of an image.
    """
    img = Image.open(img_path).convert('RGB')
    
    aug_types = ["flip", "rotate_15", "rotate_-15", "brightness_up", 
                 "brightness_down", "contrast_up", "contrast_down", 
                 "color", "sharpness"]
    
    augmented_images = []
    
    # Generate augmentations
    for i in range(num_augmentations):
        aug_type = random.choice(aug_types)
        aug_img = augment_image(img, aug_type)
        augmented_images.append((aug_img, aug_type))
    
    return augmented_images

# ===============================
# BALANCING FUNCTION
# ===============================
def balance_dataset():
    """
    Balance dataset to TARGET_IMAGES_PER_CLASS per class.
    - Sample down classes with >200 images
    - Augment classes with <200 images
    """
    random.seed(RANDOM_SEED)
    
    # Create output directory
    Path(BALANCED_DIR).mkdir(parents=True, exist_ok=True)
    
    print(f"⚖️  Balancing dataset to {TARGET_IMAGES_PER_CLASS} images per class")
    print(f"Random seed: {RANDOM_SEED}\n")
    
    balance_log = {
        "config": {
            "target_per_class": TARGET_IMAGES_PER_CLASS,
            "random_seed": RANDOM_SEED
        },
        "classes": {},
        "summary": {
            "total_original": 0,
            "total_balanced": 0,
            "classes_sampled": [],
            "classes_augmented": []
        }
    }
    
    # Get all classes from merged and external
    all_sources = {}
    
    # From merged
    if os.path.exists(MERGED_DIR):
        for cls in os.listdir(MERGED_DIR):
            cls_path = os.path.join(MERGED_DIR, cls)
            if os.path.isdir(cls_path):
                images = [f for f in os.listdir(cls_path) 
                         if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                all_sources[cls] = [(os.path.join(cls_path, img), 'merged') for img in images]
    
    # Add from external
    if os.path.exists(EXTERNAL_DIR):
        for cls in os.listdir(EXTERNAL_DIR):
            cls_path = os.path.join(EXTERNAL_DIR, cls)
            if os.path.isdir(cls_path):
                images = [f for f in os.listdir(cls_path) 
                         if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                if cls not in all_sources:
                    all_sources[cls] = []
                all_sources[cls].extend([(os.path.join(cls_path, img), 'external') for img in images])
    
    if not all_sources:
        print("❌ No images found in merged or external directories!")
        return
    
    print(f"Found {len(all_sources)} classes\n")
    
    # Process each class
    for cls in sorted(all_sources.keys()):
        images_list = all_sources[cls]
        original_count = len(images_list)
        
        # Create output directory for this class
        output_class_dir = os.path.join(BALANCED_DIR, cls)
        Path(output_class_dir).mkdir(parents=True, exist_ok=True)
        
        balance_log["summary"]["total_original"] += original_count
        
        if original_count >= TARGET_IMAGES_PER_CLASS:
            # Sample down
            sampled = random.sample(images_list, TARGET_IMAGES_PER_CLASS)
            
            for idx, (img_path, source) in enumerate(sampled):
                img_name = f"{cls}_{idx:04d}.jpg"
                output_path = os.path.join(output_class_dir, img_name)
                shutil.copy2(img_path, output_path)
            
            balance_log["classes"][cls] = {
                "original_count": original_count,
                "final_count": TARGET_IMAGES_PER_CLASS,
                "action": "sampled",
                "sampled_from": original_count
            }
            balance_log["summary"]["classes_sampled"].append(cls)
            
            print(f"   {cls:15s}: {original_count:4d} → {TARGET_IMAGES_PER_CLASS:3d} (sampled)")
        
        else:
            # Need augmentation
            needed = TARGET_IMAGES_PER_CLASS - original_count
            
            # Copy all original images first
            for idx, (img_path, source) in enumerate(images_list):
                img_name = f"{cls}_{idx:04d}.jpg"
                output_path = os.path.join(output_class_dir, img_name)
                shutil.copy2(img_path, output_path)
            
            # Generate augmentations
            aug_per_image = (needed // original_count) + 1
            aug_count = 0
            
            for img_path, source in images_list:
                if aug_count >= needed:
                    break
                
                try:
                    augmented = create_augmentations(img_path, min(aug_per_image, needed - aug_count))
                    
                    for aug_img, aug_type in augmented:
                        img_name = f"{cls}_aug{aug_count:04d}_{aug_type}.jpg"
                        output_path = os.path.join(output_class_dir, img_name)
                        aug_img.save(output_path, 'JPEG', quality=95)
                        aug_count += 1
                        
                        if aug_count >= needed:
                            break
                
                except Exception as e:
                    print(f"      ⚠️  Augmentation failed for {img_path}: {e}")
                    continue
            
            final_count = original_count + aug_count
            
            balance_log["classes"][cls] = {
                "original_count": original_count,
                "augmented_count": aug_count,
                "final_count": final_count,
                "action": "augmented"
            }
            balance_log["summary"]["classes_augmented"].append(cls)
            
            print(f"   {cls:15s}: {original_count:4d} → {final_count:3d} (augmented +{aug_count})")
        
        balance_log["summary"]["total_balanced"] += TARGET_IMAGES_PER_CLASS if original_count >= TARGET_IMAGES_PER_CLASS else final_count
    
    # Save log
    log_path = os.path.join(BALANCED_DIR, "balance_log.json")
    with open(log_path, 'w') as f:
        json.dump(balance_log, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"✅ Dataset balanced!")
    print(f"📊 Summary:")
    print(f"   - Original total: {balance_log['summary']['total_original']} images")
    print(f"   - Balanced total: {balance_log['summary']['total_balanced']} images")
    print(f"   - Classes sampled: {len(balance_log['summary']['classes_sampled'])}")
    print(f"   - Classes augmented: {len(balance_log['summary']['classes_augmented'])}")
    print(f"\n📄 Log: {log_path}")
    print(f"📂 Balanced dataset: {BALANCED_DIR}/")
    print(f"{'='*60}")

if __name__ == "__main__":
    balance_dataset()
