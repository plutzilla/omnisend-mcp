import omnisendApi from '../utils/api.js';

// Get contacts list
export const listContacts = async (params = {}) => {
  try {
    const response = await omnisendApi.get('/contacts', { params });
    return response.data;
  } catch (error) {
    throw new Error(`Error getting contacts list: ${error.message}`);
  }
};

// Create or update contact
export const createOrUpdateContact = async (contactData) => {
  try {
    const response = await omnisendApi.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating contact: ${error.message}`);
  }
};

// Get specific contact information
export const getContact = async (contactId) => {
  try {
    const response = await omnisendApi.get(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error getting contact information: ${error.message}`);
  }
};

// Update contact
export const updateContact = async (contactId, contactData) => {
  try {
    const response = await omnisendApi.patch(`/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating contact: ${error.message}`);
  }
}; 