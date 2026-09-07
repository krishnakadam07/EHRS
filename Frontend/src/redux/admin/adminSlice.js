import { createSlice } from '@reduxjs/toolkit';
import { initialSystemLogs } from '../../utils/mockData';

const getStoredSystemLogs = () => {
  const stored = localStorage.getItem('ehr_system_logs');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('ehr_system_logs', JSON.stringify(initialSystemLogs));
  return initialSystemLogs;
};

const initialState = {
  logs: getStoredSystemLogs(),
  loading: false,
  error: null,
  analytics: {
    totalPatients: 148,
    totalDoctors: 32,
    totalScans: 1042,
    monthlySignups: [10, 25, 45, 78, 120, 180]
  }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminStart(state) {
      state.loading = true;
      state.error = null;
    },
    adminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addSystemLog(state, action) {
      state.logs.unshift(action.payload);
      localStorage.setItem('ehr_system_logs', JSON.stringify(state.logs));
    },
    updateAnalytics(state, action) {
      state.analytics = { ...state.analytics, ...action.payload };
    }
  }
});

export const {
  adminStart,
  adminFailure,
  addSystemLog,
  updateAnalytics
} = adminSlice.actions;

export default adminSlice.reducer;
