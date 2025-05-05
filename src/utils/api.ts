import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OMNISEND_API_KEY;
const baseURL = process.env.OMNISEND_API_URL || 'https://api.omnisend.com/v5';

if (!apiKey) {
  process.stderr.write('OMNISEND_API_KEY environment variable is not set!\n');
  process.exit(1);
}

// Konfigūruokime Axios su geresnėmis laiko ribomis ir pakartotiniais bandymais
const omnisendApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 sekundžių timeout
  timeoutErrorMessage: 'Request timed out connecting to Omnisend API'
});

// Pridėkime atsakymo tarpininką (interceptor) geresniam klaidų apdorojimui
omnisendApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Serverio atsakymas su klaidos statusu
      return Promise.reject(new Error(`API response error (${error.response.status}): ${error.response.data?.message || JSON.stringify(error.response.data)}`));
    } else if (error.request) {
      // Užklausa išsiųsta, bet negautas atsakymas
      return Promise.reject(new Error(`No response received from API: ${error.message}`));
    } else {
      // Kažkas sukėlė klaidą kuriant užklausą
      return Promise.reject(new Error(`Error creating request: ${error.message}`));
    }
  }
);

export default omnisendApi; 