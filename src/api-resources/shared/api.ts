import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OMNISEND_API_KEY;
const baseURL = process.env.OMNISEND_API_URL || 'https://api.omnisend.com/v5';

if (!apiKey) {
  process.stderr.write('OMNISEND_API_KEY environment variable is not set!\n');
  process.exit(1);
}

// Configure Axios with better timeouts and retry options
const omnisendApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
  timeoutErrorMessage: 'Request timed out connecting to Omnisend API'
});

// Add response interceptor for better error handling
omnisendApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server response with error status
      return Promise.reject(new Error(`API response error (${error.response.status}): ${error.response.data?.message || JSON.stringify(error.response.data)}`));
    } else if (error.request) {
      // Request sent but no response received
      return Promise.reject(new Error(`No response received from API: ${error.message}`));
    } else {
      // Something caused an error when creating the request
      return Promise.reject(new Error(`Error creating request: ${error.message}`));
    }
  }
);

/**
 * Extract pagination details from a cursor-based pagination response
 * 
 * @param paging Pagination object from Omnisend API response
 * @returns Structured pagination object with limit, offset, next and previous fields
 */
export const extractPaginationDetails = (paging?: { next?: string; previous?: string; limit?: number; offset?: number }) => {
  if (!paging) return undefined;
  
  const result = {
    next: paging.next,
    previous: paging.previous,
    limit: paging.limit,
    offset: paging.offset
  };
  
  // Try to extract limit and offset from next/previous cursors if not directly provided
  if (paging.next && (!paging.limit || !paging.offset)) {
    try {
      const nextUrl = new URL(paging.next);
      const limit = nextUrl.searchParams.get('limit');
      const offset = nextUrl.searchParams.get('offset');
      
      if (limit && !result.limit) result.limit = parseInt(limit, 10);
      if (offset && !result.offset) result.offset = parseInt(offset, 10);
    } catch (error) {
      // Silently fail if URL parsing fails
    }
  }
  
  return result;
};

export default omnisendApi; 