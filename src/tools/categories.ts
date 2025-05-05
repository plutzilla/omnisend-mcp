import omnisendApi from '../utils/api.js';
import { ProductCategory, CategoriesResponse, ListCategoriesParams } from '../types/index.js';

// Get product categories list
export const listCategories = async (params: ListCategoriesParams = {}): Promise<CategoriesResponse> => {
  try {
    const response = await omnisendApi.get<CategoriesResponse>('/product-categories', { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting product categories list: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting product categories list');
    }
  }
};

// Create product category
export const createCategory = async (categoryData: Partial<ProductCategory>): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.post<ProductCategory>('/product-categories', categoryData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating product category: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when creating product category');
    }
  }
};

// Get specific product category information
export const getCategory = async (categoryId: string): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.get<ProductCategory>(`/product-categories/${categoryId}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting product category information: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting product category');
    }
  }
};

// Update product category
export const updateCategory = async (categoryId: string, categoryData: Partial<ProductCategory>): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.patch<ProductCategory>(`/product-categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating product category: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when updating product category');
    }
  }
};

// Delete product category
export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const response = await omnisendApi.delete(`/product-categories/${categoryId}`);
    return response.status === 204; // Returns true if successfully deleted
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting product category: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when deleting product category');
    }
  }
}; 