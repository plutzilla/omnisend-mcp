// MCP bendri tipai
export interface Resource {
  type: string;
  id: string;
  data: Record<string, unknown>;
}

// Omnisend API tipai
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
  paging?: {
    previous?: string;
    next?: string;
    limit?: number;
    offset?: number;
  };
}

export interface Product {
  productID: string;
  title: string;
  status?: string;
  description?: string;
  currency?: string;
  price?: number;
  oldPrice?: number;
  productUrl?: string;
  imageUrl?: string;
  vendor?: string;
  variants?: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface ProductVariant {
  variantID: string;
  title?: string;
  price?: number;
  oldPrice?: number;
  status?: string;
  sku?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface ProductsResponse {
  products: Product[];
  paging?: {
    previous?: string;
    next?: string;
    limit?: number;
    offset?: number;
  };
}

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

export interface ProductCategory {
  categoryID: string;
  title: string;
  handle?: string;
  description?: string;
  imageUrl?: string;
  categoryUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface CategoriesResponse {
  categories: ProductCategory[];
  paging?: {
    previous?: string;
    next?: string;
    limit?: number;
    offset?: number;
  };
}

// API parametrų tipai
export interface ListContactsParams {
  limit?: number;
  offset?: number;
  status?: 'subscribed' | 'unsubscribed' | 'nonSubscribed';
}

export interface ListProductsParams {
  limit?: number;
  offset?: number;
}

export interface ListCategoriesParams {
  limit?: number;
  offset?: number;
} 