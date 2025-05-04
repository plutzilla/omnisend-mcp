import omnisendApi from '../utils/api.js';
import { Product, ProductsResponse, ListProductsParams } from '../types/index.js';
import { AxiosError } from 'axios';

// Get products list
export const listProducts = async (params: ListProductsParams = {}): Promise<ProductsResponse> => {
  try {
    const response = await omnisendApi.get<ProductsResponse>('/products', { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error getting products list: ${axiosError.message}`);
  }
};

// Create product
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await omnisendApi.post<Product>('/products', productData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error creating product: ${axiosError.message}`);
  }
};

// Get specific product information
export const getProduct = async (productId: string): Promise<Product> => {
  try {
    const response = await omnisendApi.get<Product>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error getting product information: ${axiosError.message}`);
  }
};

// Replace product
export const replaceProduct = async (productId: string, productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await omnisendApi.put<Product>(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error replacing product: ${axiosError.message}`);
  }
};

// Delete product
export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const response = await omnisendApi.delete(`/products/${productId}`);
    return response.status === 204;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Error deleting product: ${axiosError.message}`);
  }
}; 