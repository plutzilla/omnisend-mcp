import omnisendApi from '../utils/api.js';
import { Event } from '../types/index.js';
import { AxiosError } from 'axios';

interface EventSendData extends Omit<Partial<Event>, 'contact'> {
  eventName: string;
  contact?: {
    contactID?: string;
    email?: string;
    phone?: string;
    [key: string]: unknown;
  };
}

// Send event
export const sendEvent = async (eventData: EventSendData): Promise<Event> => {
  try {
    // Add required 'origin' field if it doesn't exist
    const data = {
      ...eventData,
      origin: eventData.origin || "api"
    };
    
    const response = await omnisendApi.post<Event>('/events', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error sending event: ${axiosError.message}`);
  }
}; 