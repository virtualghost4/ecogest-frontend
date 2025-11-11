// API Base URL - uses relative path which Nginx will proxy to the backend
// Nginx is configured to proxy /api/* requests to http://ecogest-app:8080/api/*
export const API_BASE_URL = '/api';

console.log('API Base URL:', API_BASE_URL);
