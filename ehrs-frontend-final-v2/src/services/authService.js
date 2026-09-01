import api from './api';

export const authService = {

  changePassword: async (email, oldPassword, newPassword) => {
    try {
      const response = await api.post('/api/auth/change-password', { email, oldPassword, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to change password";
    }
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('ehr_token', response.data.token);
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('userRole', credentials.role || 'patient');
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('ehr_token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  },

  getCurrentUser: () => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('ehr_token');
    const role = localStorage.getItem('userRole') || 'patient';

    if (email && token) {
      return { email: email, role: role };
    }
    return null;
  },

  // 🌟 OTP METHODS
  sendOtp: async (email) => {
    try {
      const response = await api.post('/api/auth/send-otp', { email });
      localStorage.setItem('reset_email', email); // Remember email for verification step
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to send OTP";
    }
  },

  verifyOtp: async (otp) => {
    try {
      const email = localStorage.getItem('reset_email');
      const response = await api.post('/api/auth/verify-otp', { email, otp });
      localStorage.removeItem('reset_email'); // Clean up securely
      return response.data;
    } catch (error) {
      throw error.response?.data || "Invalid or Expired OTP";
    }
  }
};