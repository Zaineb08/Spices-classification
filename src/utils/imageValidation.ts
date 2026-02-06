export interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_FILE_SIZE = 10 * 1024; // 10KB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MIN_DIMENSION = 200;
const RECOMMENDED_DIMENSION = 500;

export async function validateImage(file: File): Promise<ImageValidationResult> {
  const result: ImageValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: [],
  };

  // Check file type
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    result.errors.push('Unsupported file format. Please use JPG, PNG, or WebP.');
    result.isValid = false;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    result.errors.push('File is too large. Maximum size is 10MB.');
    result.isValid = false;
  }

  if (file.size < MIN_FILE_SIZE) {
    result.warnings.push('File is very small. Image quality may be low.');
  }

  // Check image dimensions
  try {
    const dimensions = await getImageDimensions(file);
    
    if (dimensions.width < MIN_DIMENSION || dimensions.height < MIN_DIMENSION) {
      result.errors.push(`Image is too small. Minimum size is ${MIN_DIMENSION}x${MIN_DIMENSION}px.`);
      result.isValid = false;
    }

    if (dimensions.width < RECOMMENDED_DIMENSION || dimensions.height < RECOMMENDED_DIMENSION) {
      result.warnings.push('Image resolution is low. For best results, use images at least 500x500px.');
    }

    // Check aspect ratio
    const aspectRatio = dimensions.width / dimensions.height;
    if (aspectRatio < 0.5 || aspectRatio > 2) {
      result.suggestions.push('Try to use a more square image for better results.');
    }

    // Check if image is too dark or too bright (basic check)
    const brightness = await checkImageBrightness(file);
    if (brightness < 0.2) {
      result.suggestions.push('Image appears dark. Try better lighting.');
    } else if (brightness > 0.8) {
      result.suggestions.push('Image appears overexposed. Reduce lighting or adjust exposure.');
    }
  } catch (err) {
    result.errors.push('Unable to read image file.');
    result.isValid = false;
  }

  // Add general suggestions if no errors
  if (result.isValid && result.suggestions.length === 0) {
    result.suggestions.push('✓ Image quality looks good!');
  }

  return result;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

function checkImageBrightness(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(0.5); // Return neutral brightness if can't check
          return;
        }

        // Use smaller canvas for performance
        const size = 100;
        canvas.width = size;
        canvas.height = size;
        
        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        
        let totalBrightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Calculate relative luminance
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          totalBrightness += brightness;
        }
        
        const avgBrightness = totalBrightness / (size * size);
        URL.revokeObjectURL(url);
        resolve(avgBrightness);
      } catch (err) {
        URL.revokeObjectURL(url);
        resolve(0.5); // Return neutral brightness on error
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0.5);
    };

    img.src = url;
  });
}

export function getValidationIcon(result: ImageValidationResult): string {
  if (!result.isValid) return '❌';
  if (result.warnings.length > 0) return '⚠️';
  return '✓';
}

export function getValidationColor(result: ImageValidationResult): string {
  if (!result.isValid) return 'var(--moroccan-red)';
  if (result.warnings.length > 0) return 'var(--moroccan-gold)';
  return 'var(--moroccan-green)';
}
