import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to automatically add the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ehr_jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
