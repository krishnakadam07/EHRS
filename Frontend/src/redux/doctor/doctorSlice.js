import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialAccessLogs } from '../../utils/mockData';

// --- MOCK DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ASYNC THUNKS ---

export const fetchDoctorLogs = createAsyncThunk(
  'doctor/fetchDoctorLogs',
  async (doctorId, { rejectWithValue }) => {
    await delay(600);
    try {
      const logs = JSON.parse(localStorage.getItem('ehr_access_logs')) || initialAccessLogs;
      return logs.filter(log => log.doctorId === doctorId);
    } catch (err) {
      return rejectWithValue('Failed to fetch access logs.');
    }
  }
);

export const scanPatientQR = createAsyncThunk(
  'doctor/scanPatientQR',
  async ({ doctorId, qrData }, { rejectWithValue }) => {
    await delay(1000);
    try {
      if (!qrData || !qrData.includes('patient-')) {
        return rejectWithValue('Invalid QR Code. Please scan a valid patient QR.');
      }
      
      const patientId = qrData.split('-')[1] ? qrData : 'patient-1'; // Mock fallback
      
      // Log the access
      const logs = JSON.parse(localStorage.getItem('ehr_access_logs')) || initialAccessLogs;
      const newLog = {
        id: `log-${Date.now()}`,
        patientId,
        doctorId,
        timestamp: new Date().toISOString(),
        purpose: 'Emergency Scan',
        status: 'Granted'
      };
      
      logs.unshift(newLog);
      localStorage.setItem('ehr_access_logs', JSON.stringify(logs));
      
      return patientId;
    } catch (err) {
      return rejectWithValue('Failed to scan QR code.');
    }
  }
);

export const addPrescription = createAsyncThunk(
  'doctor/addPrescription',
  async (prescriptionData, { rejectWithValue }) => {
    await delay(1000);
    try {
      // In a real app this would POST to /prescriptions
      return true;
    } catch (err) {
      return rejectWithValue('Failed to add prescription.');
    }
  }
);

// --- INITIAL STATE ---

const initialState = {
  accessLogs: [],
  scannedPatientId: null,
  loading: false,
  error: null
};

// --- SLICE ---

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    clearDoctorError(state) {
      state.error = null;
    },
    clearScannedPatient(state) {
      state.scannedPatientId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Doctor Logs
      .addCase(fetchDoctorLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.accessLogs = action.payload;
      })
      .addCase(fetchDoctorLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Scan Patient QR
      .addCase(scanPatientQR.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.scannedPatientId = null;
      })
      .addCase(scanPatientQR.fulfilled, (state, action) => {
        state.loading = false;
        state.scannedPatientId = action.payload;
      })
      .addCase(scanPatientQR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Prescription
      .addCase(addPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPrescription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// --- ACTIONS & REDUCER ---

export const { clearDoctorError, clearScannedPatient } = doctorSlice.actions;
export default doctorSlice.reducer;

// --- SELECTORS ---

export const selectDoctorLogs = (state) => state.doctor.accessLogs;
export const selectScannedPatientId = (state) => state.doctor.scannedPatientId;
export const selectDoctorLoading = (state) => state.doctor.loading;
export const selectDoctorError = (state) => state.doctor.error;
