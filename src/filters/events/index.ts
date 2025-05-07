import { filterContactFields } from '../contacts/index.js';

// Filter function for event data
export const filterEventFields = (event: any) => {
  return {
    eventID: event.eventID,
    eventName: event.eventName,
    email: event.email,
    phone: event.phone,
    contactID: event.contactID,
    contact: event.contact ? filterContactFields(event.contact) : undefined,
    properties: event.properties,
    createdAt: event.createdAt
  };
}; 