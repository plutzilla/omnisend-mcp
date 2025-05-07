import omnisendApi from '../shared/api.js';
import { Contact, ContactsResponse, ListContactsParams } from '../../types/contacts/index.js';

// Get contacts list
export const listContacts = async (params: ListContactsParams = {}): Promise<ContactsResponse> => {
  try {
    // Pridėkime trumpą užlaikymą, kad išvengtume daug užklausų per trumpą laiką
    const response = await omnisendApi.get<ContactsResponse>('/contacts', { params });
    return response.data;
  } catch (error) {
    // Pagerinkime klaidos apdorojimą
    if (error instanceof Error) {
      throw new Error(`Error getting contacts list: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting contacts list');
    }
  }
};

// Create or update contact
export const createOrUpdateContact = async (contactData: Partial<Contact>): Promise<Contact> => {
  try {
    const response = await omnisendApi.post<Contact>('/contacts', contactData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating contact: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when creating contact');
    }
  }
};

// Get specific contact information
export const getContact = async (contactId: string): Promise<Contact> => {
  try {
    const response = await omnisendApi.get<Contact>(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting contact information: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting contact');
    }
  }
};

// Update contact
export const updateContact = async (contactId: string, contactData: Partial<Contact>): Promise<Contact> => {
  try {
    const response = await omnisendApi.patch<Contact>(`/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating contact: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when updating contact');
    }
  }
}; 