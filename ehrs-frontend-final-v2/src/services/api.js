import axios from 'axios';

// 🌟 Production Ready: Uses Vercel Environment Variable if available, otherwise defaults to localhost
const api = axios.create({
<<<<<<< HEAD
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
=======
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
});

api.interceptors.request.use(
    (config) => {
<<<<<<< HEAD
        // dYOY Bug Fix: Look for 'ehr_jwt_token' since that is what authSlice and Login.jsx saves!
        const token = localStorage.getItem('ehr_jwt_token') || localStorage.getItem('ehr_token') || localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
=======
      // 🌟 Bug Fix: Look for 'ehr_token' since that is what authService.js saves!
      // (We also check 'token' just in case you have older code relying on it)
      const token = localStorage.getItem('ehr_token') || localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    },
    (error) => Promise.reject(error)
);

export default api;