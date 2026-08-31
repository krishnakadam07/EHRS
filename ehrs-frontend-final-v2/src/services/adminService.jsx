import api from './api';

export const adminService = {
    getDashboardStats: async () => {
        const response = await api.get('/api/admin/dashboard-stats');
        return response.data;
    },

    getAllDoctors: async () => {
        const response = await api.get('/api/admin/doctors/all');
        return response.data;
    },

    getAllPatients: async () => {
        const response = await api.get('/api/admin/patients/all');
        return response.data;
    },

    getPendingDoctors: async () => {
        const response = await api.get('/api/admin/doctors/pending');
        return response.data;
    },

    approveDoctor: async (doctorId) => {
        const response = await api.post(`/api/admin/doctors/approve/${doctorId}`);
        return response.data;
    },

    rejectDoctor: async (doctorId) => {
        const response = await api.post(`/api/admin/doctors/reject/${doctorId}`);
        return response.data;
    },

    // 🌟 FIX: Added the missing System Logs API call!
    getSystemLogs: async () => {
        const response = await api.get('/api/admin/system-logs');
        return response.data;
    },

    getAnalytics: async () => {
        const response = await api.get('/api/admin/analytics');
        return response.data;
    },

    // 🌟 NEW: Suspend Doctor
    suspendDoctor: async (doctorId) => {
        const response = await api.post(`/api/admin/doctors/suspend/${doctorId}`);
        return response.data;
    },
};