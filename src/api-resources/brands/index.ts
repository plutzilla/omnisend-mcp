import omnisendApi from '../shared/api.js';
import { Brand } from '../../types/brands/index.js';

// Get current brand information
export const getCurrentBrand = async (): Promise<Brand> => {
  try {
    const response = await omnisendApi.get<Brand>('/brands/current');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting current brand information: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred when getting current brand');
    }
  }
}; 