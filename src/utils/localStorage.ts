export interface ClassificationHistoryItem {
  id: string;
  imageUrl: string;
  timestamp: number;
  topPrediction: {
    spice: string;
    confidence: number;
  };
  allPredictions: Array<{
    spice: string;
    confidence: number;
  }>;
}

const HISTORY_KEY = 'moroccan-spices-history';
const MAX_HISTORY_ITEMS = 10;

export function saveClassification(item: Omit<ClassificationHistoryItem, 'id' | 'timestamp'>): void {
  try {
    const history = getClassificationHistory();
    const newItem: ClassificationHistoryItem = {
      ...item,
      id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    
    // Add to beginning of array
    history.unshift(newItem);
    
    // Keep only MAX_HISTORY_ITEMS
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save classification history:', error);
  }
}

export function getClassificationHistory(): ClassificationHistoryItem[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load classification history:', error);
    return [];
  }
}

export function clearClassificationHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear classification history:', error);
  }
}

export function deleteHistoryItem(id: string): void {
  try {
    const history = getClassificationHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete history item:', error);
  }
}

export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
