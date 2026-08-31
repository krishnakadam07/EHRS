import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialRecords } from '../../utils/mockData';

// --- MOCK DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ASYNC THUNKS ---

export const fetchMedicalRecords = createAsyncThunk(
  'records/fetchMedicalRecords',
  async (patientId, { rejectWithValue }) => {
    await delay(600);
    try {
      const records = JSON.parse(localStorage.getItem('ehr_medical_records')) || initialRecords;
      return records.filter(r => r.patientId === patientId);
    } catch (err) {
      return rejectWithValue('Failed to load medical records.');
    }
  }
);

export const uploadMedicalRecord = createAsyncThunk(
  'records/uploadMedicalRecord',
  async (recordData, { rejectWithValue }) => {
    await delay(1200);
    try {
      const newRecord = {
        id: `rec-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...recordData
      };
      
      const records = JSON.parse(localStorage.getItem('ehr_medical_records')) || initialRecords;
      records.unshift(newRecord);
      localStorage.setItem('ehr_medical_records', JSON.stringify(records));
      
      return newRecord;
    } catch (err) {
      return rejectWithValue('Failed to upload record.');
    }
  }
);

export const deleteMedicalRecord = createAsyncThunk(
  'records/deleteMedicalRecord',
  async (recordId, { rejectWithValue }) => {
    await delay(800);
    try {
      const records = JSON.parse(localStorage.getItem('ehr_medical_records')) || initialRecords;
      const updated = records.filter(r => r.id !== recordId);
      localStorage.setItem('ehr_medical_records', JSON.stringify(updated));
      return recordId;
    } catch (err) {
      return rejectWithValue('Failed to delete record.');
    }
  }
);

// --- INITIAL STATE ---

const getStoredRecords = () => {
  const stored = localStorage.getItem('ehr_medical_records');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('ehr_medical_records', JSON.stringify(initialRecords));
  return initialRecords;
};

const initialState = {
  allRecords: getStoredRecords(),
  patientRecords: [],
  loading: false,
  error: null
};

// --- SLICE ---

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    clearRecordsError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Medical Records
      .addCase(fetchMedicalRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.patientRecords = action.payload;
      })
      .addCase(fetchMedicalRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Record
      .addCase(uploadMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.allRecords.unshift(action.payload);
        state.patientRecords.unshift(action.payload);
      })
      .addCase(uploadMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Record
      .addCase(deleteMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.allRecords = state.allRecords.filter(r => r.id !== action.payload);
        state.patientRecords = state.patientRecords.filter(r => r.id !== action.payload);
      })
      .addCase(deleteMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// --- ACTIONS & REDUCER ---

export const { clearRecordsError } = recordsSlice.actions;
export default recordsSlice.reducer;

// --- SELECTORS ---

export const selectPatientRecords = (state) => state.records.patientRecords;
export const selectRecordsLoading = (state) => state.records.loading;
export const selectRecordsError = (state) => state.records.error;
