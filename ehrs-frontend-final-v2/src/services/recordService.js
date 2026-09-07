import api from './api';

export const recordService = {

  // 🌟 FIX: Pointing to your real MedicalRecordController, NOT the deleted FileController!
  uploadRecord: async (email, formData) => {
    const response = await api.post(`/api/records/upload/${email}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getPatientRecords: async (email) => {
    const response = await api.get(`/api/patients/records/${email}`);
    return response.data;
  },

  deleteRecord: async (id) => {
    const response = await api.delete(`/api/patients/records/${id}`);
    return response.data;
  }
};