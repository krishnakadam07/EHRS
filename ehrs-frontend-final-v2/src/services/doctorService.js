import api from './api';

export const doctorService = {
    // Get all patients assigned to or scanned by this doctor
    getDoctorPatients: async (doctorEmail) => {
        try {
            const response = await api.get(`/doctor/patients`, { params: { email: doctorEmail } });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch patients";
        }
    },

    issuePrescription: async (prescriptionData) => {
        const response = await api.post('/api/doctors/prescribe', prescriptionData);
        return response.data;
    },

    getDoctorProfile: async (email) => {
        const response = await api.get(`/api/doctors/profile/${email}`);
        return response.data;
    },

    updateDoctorProfile: async (email, profileData) => {
        const response = await api.put(`/api/doctors/profile/${email}`, profileData);
        return response.data;
    },

    getPatientDetails: async (patientId, doctorEmail) => {
        // Passes the doctorEmail so the backend can log WHO viewed it
        const response = await api.get(`/api/doctors/patient/${patientId}?doctorEmail=${doctorEmail}`);
        return response.data;
    },

    getIssuedPrescriptions: async (email) => {
        const response = await api.get(`/api/doctors/history/${email}`);
        return response.data;
    },

    getPatientRecords: async (patientId) => {
        const response = await api.get(`/api/doctors/patient/${patientId}/records`);
        return response.data;
    },

    getPatientPrescriptions: async (patientId) => {
        const response = await api.get(`/api/doctors/patient/${patientId}/prescriptions`);
        return response.data;
    },

    getMyAccessLogs: async (email) => {
        const response = await api.get(`/api/doctors/access-logs/${email}`);
        return response.data;
    },

    // 🌟 NEW: Spring AI Endpoint for Doctor Triage
    analyzeTriageVitals: async (vitalsData) => {
        const response = await api.post(`/api/doctor/triage/analyze`, vitalsData);
        // Ensure it parses the String into a JSON object if Axios doesn't do it automatically
        return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    }
};