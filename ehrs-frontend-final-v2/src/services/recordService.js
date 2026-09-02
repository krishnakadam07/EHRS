import api from './api';

export const recordService = {
  getPatientRecords: async (email) => {
    const response = await api.get(`/api/records/patient/${email}`);
    return response.data;
  },
  uploadRecord: async (email, formData) => {
    const response = await api.post(`/api/records/upload/${email}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};