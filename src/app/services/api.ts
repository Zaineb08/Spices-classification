// API service for communicating with Flask backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface PredictionResponse {
  success: boolean;
  predicted_class?: string;
  confidence?: number;
  top_3_predictions?: Array<{
    class: string;
    probability: number;
  }>;
  image_path?: string;
  error?: string;
}

export const uploadImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const checkHealth = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking health:', error);
    return null;
  }
};
