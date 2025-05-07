import { Pagination } from '../shared/common.js';

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
  paging?: Pagination;
}

// API parameter types
export interface ListCategoriesParams {
  limit?: number;
  offset?: number;
} 