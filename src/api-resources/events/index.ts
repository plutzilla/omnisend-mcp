import omnisendApi from '../shared/api.js';
import { Event } from '../../types/events/index.js';

// Send event
export const sendEvent = async (eventData: Partial<Event>): Promise<Event> => {
  try {
    const response = await omnisendApi.post<Event>('/events', eventData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error sending event: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when sending event');
    }
  }
}; 