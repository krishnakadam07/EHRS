import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialUsers, initialRecords } from '../../utils/mockData';

// --- MOCK DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ASYNC THUNKS ---

export const fetchEmergencyProfile = createAsyncThunk(
  'emergency/fetchEmergencyProfile',
  async (token, { rejectWithValue }) => {
    await delay(1000);
    try {
      // In a real application, the backend would validate the token and return the emergency profile.
      // Here, we'll mock the extraction of patientId from the token.
      
      if (!token || !token.startsWith('qr-token-')) {
        return rejectWithValue('Invalid or expired QR token.');
      }
      
      // Expected token format: qr-token-{patientId}-{expiry}
      const parts = token.split('-');
      const patientId = parts[2] + '-' + parts[3]; // e.g., 'patient-1'
      const expiry = parseInt(parts[4]);
      
      if (Date.now() > expiry) {
        return rejectWithValue('QR token has expired. Please request a new one.');
      }
      
      const users = JSON.parse(localStorage.getItem('ehr_users')) || initialUsers;
      const patient = users.find(u => u.id === patientId && u.role === 'patient');
      
      if (!patient) {
        return rejectWithValue('Patient profile not found.');
      }
      
      // Fetch vital medical records marked as "Clinical Notes" or "Other" to mock recent vitals
      const records = JSON.parse(localStorage.getItem('ehr_medical_records')) || initialRecords;
      const patientRecords = records.filter(r => r.patientId === patientId);
      
      return {
        profile: patient,
        recentRecords: patientRecords.slice(0, 5) // Return only 5 most recent records
      };
      
    } catch (err) {
      return rejectWithValue('Failed to load emergency profile.');
    }
  }
);

// --- INITIAL STATE ---

const initialState = {
  activeProfile: null,
  recentRecords: [],
  loading: false,
  error: null
};

// --- SLICE ---

const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    clearEmergencyData(state) {
      state.activeProfile = null;
      state.recentRecords = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Emergency Profile
      .addCase(fetchEmergencyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.activeProfile = null;
        state.recentRecords = [];
      })
      .addCase(fetchEmergencyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.activeProfile = action.payload.profile;
        state.recentRecords = action.payload.recentRecords;
      })
      .addCase(fetchEmergencyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// --- ACTIONS & REDUCER ---

export const { clearEmergencyData } = emergencySlice.actions;
export default emergencySlice.reducer;

// --- SELECTORS ---

export const selectEmergencyProfile = (state) => state.emergency.activeProfile;
export const selectEmergencyRecords = (state) => state.emergency.recentRecords;
export const selectEmergencyLoading = (state) => state.emergency.loading;
export const selectEmergencyError = (state) => state.emergency.error;
