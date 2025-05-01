import omnisendApi from '../utils/api.js';

// Get products list
export const listProducts = async (params = {}) => {
  try {
    const response = await omnisendApi.get('/products', { params });
    return response.data;
  } catch (error) {
    throw new Error(`Error getting products list: ${error.message}`);
  }
};

// Create product
export const createProduct = async (productData) => {
  try {
    const response = await omnisendApi.post('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Get specific product information
export const getProduct = async (productId) => {
  try {
    const response = await omnisendApi.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error getting product information: ${error.message}`);
  }
};

// Replace product
export const replaceProduct = async (productId, productData) => {
  try {
    const response = await omnisendApi.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(`Error replacing product: ${error.message}`);
  }
};

// Delete product
export const deleteProduct = async (productId) => {
  try {
    const response = await omnisendApi.delete(`/products/${productId}`);
    return response.status === 204;
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
}; 