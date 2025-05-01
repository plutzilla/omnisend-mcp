import omnisendApi from '../utils/api.js';

// Send event
export const sendEvent = async (eventData) => {
  try {
    // Add required 'origin' field if it doesn't exist
    const data = {
      ...eventData,
      origin: eventData.origin || "api"
    };
    
    const response = await omnisendApi.post('/events', data);
    return response.data;
  } catch (error) {
    throw new Error(`Error sending event: ${error.message}`);
  }
}; 