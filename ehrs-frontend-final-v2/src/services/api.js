import axios from 'axios';

// 🌟 Production Ready: Uses Vercel Environment Variable if available, otherwise defaults to localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
});

api.interceptors.request.use(
    (config) => {
      // 🌟 Bug Fix: Look for 'ehr_token' since that is what authService.js saves!
      // (We also check 'token' just in case you have older code relying on it)
      const token = localStorage.getItem('ehr_token') || localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export default api;