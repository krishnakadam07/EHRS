<<<<<<< HEAD
import api from './api';

export const doctorService = {
=======
// Service integration placeholder
import api from './api';

export const doctorService = {
    // Issue a new prescription to a patient


>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    // Get all patients assigned to or scanned by this doctor
    getDoctorPatients: async (doctorEmail) => {
        try {
            const response = await api.get(`/doctor/patients`, { params: { email: doctorEmail } });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch patients";
        }
    },

<<<<<<< HEAD
=======
    // Get details of a specific patient by ID (Requires verified scan or assignment)


>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    issuePrescription: async (prescriptionData) => {
        const response = await api.post('/api/doctors/prescribe', prescriptionData);
        return response.data;
    },
<<<<<<< HEAD

    getDoctorProfile: async (email) => {
        const response = await api.get(`/api/doctors/profile/${email}`);
        return response.data;
    },

=======
        getDoctorProfile: async (email) => {
        const response = await api.get(`/api/doctors/profile/${email}`);
        return response.data;
    },
    // 🌟 ADD THIS:
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    updateDoctorProfile: async (email, profileData) => {
        const response = await api.put(`/api/doctors/profile/${email}`, profileData);
        return response.data;
    },
<<<<<<< HEAD

    getPatientDetails: async (patientId, doctorEmail) => {
        // Passes the doctorEmail so the backend can log WHO viewed it
        const response = await api.get(`/api/doctors/patient/${patientId}?doctorEmail=${doctorEmail}`);
        return response.data;
    },

=======
    getPatientDetails: async (patientId, doctorEmail) => {
        // 🌟 Now passes the doctorEmail so the backend can log WHO viewed it
        const response = await api.get(`/api/doctors/patient/${patientId}?doctorEmail=${doctorEmail}`);
        return response.data;
    },
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    getIssuedPrescriptions: async (email) => {
        const response = await api.get(`/api/doctors/history/${email}`);
        return response.data;
    },
<<<<<<< HEAD

=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    getPatientRecords: async (patientId) => {
        const response = await api.get(`/api/doctors/patient/${patientId}/records`);
        return response.data;
    },
<<<<<<< HEAD

=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    getPatientPrescriptions: async (patientId) => {
        const response = await api.get(`/api/doctors/patient/${patientId}/prescriptions`);
        return response.data;
    },
<<<<<<< HEAD

=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    getMyAccessLogs: async (email) => {
        const response = await api.get(`/api/doctors/access-logs/${email}`);
        return response.data;
    },
<<<<<<< HEAD

    // 🌟 NEW: Spring AI Endpoint for Doctor Triage
    analyzeTriageVitals: async (vitalsData) => {
        const response = await api.post(`/api/doctor/triage/analyze`, vitalsData);
        // Ensure it parses the String into a JSON object if Axios doesn't do it automatically
        return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    }
=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
};