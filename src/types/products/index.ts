import { Pagination } from '../shared/common.js';

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

export interface ProductsResponse {
  products: Product[];
  paging?: Pagination;
}

// API parameter types
export interface ListProductsParams {
  limit?: number;
  offset?: number;
} 