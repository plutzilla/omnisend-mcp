import omnisendApi from '../shared/api.js';
import { ProductCategory, CategoriesResponse, ListCategoriesParams } from '../../types/categories/index.js';

// List categories
export const listCategories = async (params: ListCategoriesParams = {}): Promise<CategoriesResponse> => {
  try {
    const response = await omnisendApi.get<CategoriesResponse>('/product-categories', { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting categories list: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting categories list');
    }
  }
};

// Create category
export const createCategory = async (categoryData: Partial<ProductCategory>): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.post<ProductCategory>('/product-categories', categoryData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating category: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when creating category');
    }
  }
};

// Get category details
export const getCategory = async (categoryId: string): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.get<ProductCategory>(`/product-categories/${categoryId}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting category information: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting category');
    }
  }
};

// Update category
export const updateCategory = async (categoryId: string, categoryData: Partial<ProductCategory>): Promise<ProductCategory> => {
  try {
    const response = await omnisendApi.put<ProductCategory>(`/product-categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating category: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when updating category');
    }
  }
};

// Delete category
export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const response = await omnisendApi.delete(`/product-categories/${categoryId}`);
    return response.status === 204;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting category: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when deleting category');
    }
  }
}; 