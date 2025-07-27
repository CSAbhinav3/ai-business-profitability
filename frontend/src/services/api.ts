import { BusinessInput, BusinessAnalysis } from '../types';

const API_BASE_URL = 'http://localhost:8000'; // Update this to match your FastAPI server

export const analyzeBusinessData = async (data: BusinessInput): Promise<BusinessAnalysis> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze_business`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to analyze business data. Please check your connection and try again.');
  }
};