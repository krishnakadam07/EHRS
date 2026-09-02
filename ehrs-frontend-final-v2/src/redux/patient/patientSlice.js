import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialHospitals, initialBloodBanks } from '../../utils/mockData';

// --- MOCK DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ASYNC THUNKS ---

export const fetchNearbyHospitals = createAsyncThunk(
  'patient/fetchNearbyHospitals',
  async (searchQuery, { rejectWithValue }) => {
    await delay(600);
    try {
      const list = JSON.parse(localStorage.getItem('ehr_hospitals')) || initialHospitals;
      if (!searchQuery) {
        return list;
      }
      const filtered = list.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filtered;
    } catch (err) {
      return rejectWithValue('Failed to load hospitals list');
    }
  }
);

export const fetchBloodBanks = createAsyncThunk(
  'patient/fetchBloodBanks',
  async (bloodType, { rejectWithValue }) => {
    await delay(600);
    try {
      const list = JSON.parse(localStorage.getItem('ehr_blood_banks')) || initialBloodBanks;
      if (!bloodType || bloodType === 'All') {
        return list;
      }
      const filtered = list.filter(bb => {
        const stock = bb.stock[bloodType];
        return stock && stock !== 'Out of Stock';
      });
      return filtered;
    } catch (err) {
      return rejectWithValue('Failed to load blood banks list');
    }
  }
);

// --- INITIAL STATE ---

const getStoredHospitals = () => {
  const stored = localStorage.getItem('ehr_hospitals');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('ehr_hospitals', JSON.stringify(initialHospitals));
  return initialHospitals;
};

const getStoredBloodBanks = () => {
  const stored = localStorage.getItem('ehr_blood_banks');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('ehr_blood_banks', JSON.stringify(initialBloodBanks));
  return initialBloodBanks;
};

const initialState = {
  hospitals: getStoredHospitals(),
  bloodBanks: getStoredBloodBanks(),
  loading: false,
  error: null
};

// --- SLICE ---

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearPatientError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Hospitals
      .addCase(fetchNearbyHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchNearbyHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Blood Banks
      .addCase(fetchBloodBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBloodBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.bloodBanks = action.payload;
      })
      .addCase(fetchBloodBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// --- ACTIONS & REDUCER ---

export const { clearPatientError } = patientSlice.actions;
export default patientSlice.reducer;

// --- SELECTORS ---

export const selectHospitals = (state) => state.patient.hospitals;
export const selectBloodBanks = (state) => state.patient.bloodBanks;
export const selectPatientLoading = (state) => state.patient.loading;
export const selectPatientError = (state) => state.patient.error;
