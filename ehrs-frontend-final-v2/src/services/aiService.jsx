import api from './api';

export const aiService = {
    // Predict Urgency based on vitals (AI Triage)
    predictTriage: async (vitalsData) => {
        try {
            const response = await api.post('/ai/triage/predict', vitalsData);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to predict triage urgency";
        }
    },

    // Analyze Lab Report (AI Analysis)
    analyzeReport: async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await api.post('/ai/analyze-report', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to analyze document";
        }
    }
};