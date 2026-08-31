import api from './api';
export const patientService = {
  getProfile: async (email) => { const response = await api.get(`/api/patients/dashboard/${email}`); return response.data; },
  updateProfile: async (email, profileData) => { const response = await api.put(`/api/patients/update/${email}`, profileData); return response.data; },
  getAccessLogs: async (email) => { const response = await api.get(`/api/access-logs/${email}`); return response.data; },
  getNotifications: async (email) => { const response = await api.get(`/api/notifications/${email}`); return response.data; },
  markNotificationRead: async (id) => { const response = await api.put(`/api/notifications/read/${id}`); return response.data; },
  getSettings: async (email) => { const response = await api.get(`/api/settings/${email}`); return response.data; },
  updateSettings: async (email, settingsData) => { const response = await api.put(`/api/settings/${email}`, settingsData); return response.data; },
  getMyPrescriptions: async (email) => {
    const response = await api.get(`/api/patients/prescriptions/${email}`);
    return response.data;
  },
  getMyAccessLogs: async (email) => {
    const response = await api.get(`/api/patients/access-logs/${email}`);
    return response.data;
  },
  getMyMedicalRecords: async (email) => {
    const response = await api.get(`/api/patients/my-records/${email}`);
    return response.data;
  },
};