import omnisendApi from '../utils/api.js';
import { Contact, ContactsResponse, ListContactsParams } from '../types/index.js';
import { AxiosError } from 'axios';

// Get contacts list
export const listContacts = async (params: ListContactsParams = {}): Promise<ContactsResponse> => {
  try {
    const response = await omnisendApi.get<ContactsResponse>('/contacts', { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error getting contacts list: ${axiosError.message}`);
  }
};

// Create or update contact
export const createOrUpdateContact = async (contactData: Partial<Contact>): Promise<Contact> => {
  try {
    const response = await omnisendApi.post<Contact>('/contacts', contactData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error creating contact: ${axiosError.message}`);
  }
};

// Get specific contact information
export const getContact = async (contactId: string): Promise<Contact> => {
  try {
    const response = await omnisendApi.get<Contact>(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error getting contact information: ${axiosError.message}`);
  }
};

// Update contact
export const updateContact = async (contactId: string, contactData: Partial<Contact>): Promise<Contact> => {
  try {
    const response = await omnisendApi.patch<Contact>(`/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error updating contact: ${axiosError.message}`);
  }
}; 