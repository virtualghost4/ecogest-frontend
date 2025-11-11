import axios from 'axios';

// Add request interceptor to log all API calls
axios.interceptors.request.use(
  (config) => {
    console.log(`[AXIOS] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[AXIOS] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
axios.interceptors.response.use(
  (response) => {
    console.log(`[AXIOS] Response ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[AXIOS] Response error:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axios;
