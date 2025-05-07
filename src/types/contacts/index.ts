import { Pagination } from '../shared/common.js';

export interface ContactIdentifier {
  type: string;
  id: string;
  status: string;
  channels: {
    email?: {
      status: string;
    };
    sms?: {
      status: string;
    };
  };
}

export interface Contact {
  contactID: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  tags?: string[];
  identifiers?: ContactIdentifier[];
  createdAt?: string;
  updatedAt?: string;
  country?: string;
  state?: string;
  city?: string;
  gender?: string;
  birthdate?: string;
  [key: string]: unknown;
}

export interface ContactsResponse {
  contacts: Contact[];
  paging?: Pagination;
}

// API parameter types
export interface ListContactsParams {
  limit?: number;
  offset?: number;
  status?: 'subscribed' | 'unsubscribed' | 'nonSubscribed';
} 