import axios from 'axios';

// Get API URL from window config or use default
const getApiUrl = (): string => {
  const windowConfig = (window as any).__API_URL__;
  if (windowConfig) {
    return windowConfig;
  }
  // Fallback to relative path (works in development)
  return '/api';
};

// Create axios instance with base URL
export const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Axios] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Axios] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios] Response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
