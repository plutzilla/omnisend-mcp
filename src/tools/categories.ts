import omnisendApi from '../utils/api.js';
import { ProductCategory, CategoriesResponse, ListCategoriesParams } from '../types/index.js';
import { AxiosError } from 'axios';

// Get product categories list
export const listCategories = async (params: ListCategoriesParams = {}): Promise<CategoriesResponse> => {
  try {
    const response = await omnisendApi.get<CategoriesResponse>('/product-categories', { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error getting product categories list: ${axiosError.message}`);
  }
};

// Create product category
export const createCategory = async (categoryData: Partial<ProductCategory>): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.post<ProductCategory>('/product-categories', categoryData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error creating product category: ${axiosError.message}`);
  }
};

// Get specific product category information
export const getCategory = async (categoryId: string): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.get<ProductCategory>(`/product-categories/${categoryId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error getting product category information: ${axiosError.message}`);
  }
};

// Update product category
export const updateCategory = async (categoryId: string, categoryData: Partial<ProductCategory>): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.patch<ProductCategory>(`/product-categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error updating product category: ${axiosError.message}`);
  }
};

// Delete product category
export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const response = await omnisendApi.delete(`/product-categories/${categoryId}`);
    return response.status === 204; // Returns true if successfully deleted
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error deleting product category: ${axiosError.message}`);
  }
}; 