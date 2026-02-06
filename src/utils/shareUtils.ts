import * as htmlToImage from 'html-to-image';

export async function shareResults(
  imageUrl: string,
  spiceName: string,
  confidence: number
): Promise<void> {
  const text = `I just identified ${spiceName} with ${(confidence * 100).toFixed(1)}% confidence using the Moroccan Spices Classifier! 🌶️✨`;
  
  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Moroccan Spices Classification',
        text,
        url: window.location.href,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  } else {
    // Fallback: copy to clipboard
    await copyToClipboard(text);
    alert('Result copied to clipboard!');
  }
}

export async function downloadResultImage(
  elementId: string,
  spiceName: string
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const dataUrl = await htmlToImage.toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.download = `moroccan-spice-${spiceName}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Failed to download image. Please try again.');
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
  }
}

export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share;
}
