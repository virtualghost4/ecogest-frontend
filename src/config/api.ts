// Get API URL from window object (injected at runtime) or environment variable (build-time)
// This allows dynamic configuration without rebuilding
declare global {
  interface Window {
    __API_BASE_URL__?: string;
  }
}

const getApiUrl = (): string => {
  // Priority 1: Runtime injection (from window object)
  if (typeof window !== 'undefined' && window.__API_BASE_URL__) {
    return window.__API_BASE_URL__;
  }

  // Priority 2: Build-time environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Priority 3: Fallback to relative path
  return '/api';
};

export const API_BASE_URL = getApiUrl();

console.log('=== API Configuration ===');
console.log('Runtime API URL (window.__API_BASE_URL__):', window.__API_BASE_URL__);
console.log('Build-time API URL (VITE_API_URL):', import.meta.env.VITE_API_URL);
console.log('Final API Base URL:', API_BASE_URL);
console.log('========================');
