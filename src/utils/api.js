import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OMNISEND_API_KEY;
const baseURL = process.env.OMNISEND_API_URL || 'https://api.omnisend.com/v5';

if (!apiKey) {
  console.error('OMNISEND_API_KEY environment variable is not set!');
  process.exit(1);
}

const omnisendApi = axios.create({
  baseURL,
  headers: {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default omnisendApi; 