// Get API URL from environment variable or use relative path
const apiUrl = import.meta.env.VITE_API_URL || '/api';

export const API_BASE_URL = apiUrl;

console.log('API Base URL:', API_BASE_URL);
