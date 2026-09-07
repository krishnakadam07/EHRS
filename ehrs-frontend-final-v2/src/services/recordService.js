import api from './api';

export const recordService = {
<<<<<<< HEAD

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
=======
  getPatientRecords: async (email) => {
    const response = await api.get(`/api/records/patient/${email}`);
    return response.data;
  },
  uploadRecord: async (email, formData) => {
    const response = await api.post(`/api/records/upload/${email}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
  }
};