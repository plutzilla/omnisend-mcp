import { Contact } from '../contacts/index.js';

export interface Event {
  eventID: string;
  eventName: string;
  email?: string;
  phone?: string;
  contactID?: string;
  contact?: Contact;
  properties?: Record<string, unknown>;
  createdAt?: string;
  origin?: string;
  [key: string]: unknown;
} 