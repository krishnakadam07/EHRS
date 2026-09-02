import api from './api';

export const logService = {
    // Get cryptographic access logs for the doctor's dashboard
    getAccessLogs: async (email) => {
        try {
            const response = await api.get(`/logs/access`, { params: { email } });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch access logs";
        }
    },

    // Log a new QR scan or record view
    logAction: async (actionData) => {
        try {
            const response = await api.post(`/logs/action`, actionData);
            return response.data;
        } catch (error) {
            console.error("Failed to log action securely");
        }
    }
};