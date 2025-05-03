import omnisendApi from '../utils/api.js';

// Get product categories list
export const listCategories = async (params = {}) => {
  try {
    const response = await omnisendApi.get('/product-categories', { params });
    return response.data;
  } catch (error) {
    throw new Error(`Error getting product categories list: ${error.message}`);
  }
};

// Create product category
export const createCategory = async (categoryData) => {
  try {
    const response = await omnisendApi.post('/product-categories', categoryData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating product category: ${error.message}`);
  }
};

// Get specific product category information
export const getCategory = async (categoryId) => {
  try {
    const response = await omnisendApi.get(`/product-categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error getting product category information: ${error.message}`);
  }
};

// Update product category
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await omnisendApi.patch(`/product-categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating product category: ${error.message}`);
  }
};

// Delete product category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await omnisendApi.delete(`/product-categories/${categoryId}`);
    return response.status === 204; // Returns true if successfully deleted
  } catch (error) {
    throw new Error(`Error deleting product category: ${error.message}`);
  }
}; 