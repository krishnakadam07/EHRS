// Service integration placeholder
import api from './api';

export const doctorService = {
    // Issue a new prescription to a patient


    // Get all patients assigned to or scanned by this doctor
    getDoctorPatients: async (doctorEmail) => {
        try {
            const response = await api.get(`/doctor/patients`, { params: { email: doctorEmail } });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch patients";
        }
    },

    // Get details of a specific patient by ID (Requires verified scan or assignment)


    issuePrescription: async (prescriptionData) => {
        const response = await api.post('/api/doctors/prescribe', prescriptionData);
        return response.data;
    },
        getDoctorProfile: async (email) => {
        const response = await api.get(`/api/doctors/profile/${email}`);
        return response.data;
    },
    // 🌟 ADD THIS:
    updateDoctorProfile: async (email, profileData) => {
        const response = await api.put(`/api/doctors/profile/${email}`, profileData);
        return response.data;
    },
    getPatientDetails: async (patientId, doctorEmail) => {
        // 🌟 Now passes the doctorEmail so the backend can log WHO viewed it
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
};