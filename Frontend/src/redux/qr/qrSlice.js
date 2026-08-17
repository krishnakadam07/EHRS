import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- MOCK DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ASYNC THUNKS ---

export const generateQRToken = createAsyncThunk(
  'qr/generateQRToken',
  async (patientId, { rejectWithValue }) => {
    await delay(600);
    try {
      // In a real application, this would fetch a secure, time-limited JWT from the backend.
      // Here we mock a token payload containing the patientId and an expiry timestamp.
      const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes
      const token = `qr-token-${patientId}-${expiry}`;
      
      const qrData = {
        token,
        expiresAt: new Date(expiry).toISOString(),
        isActive: true
      };
      
      localStorage.setItem(`ehr_qr_${patientId}`, JSON.stringify(qrData));
      return qrData;
    } catch (err) {
      return rejectWithValue('Failed to generate QR token.');
    }
  }
);

export const revokeQRToken = createAsyncThunk(
  'qr/revokeQRToken',
  async (patientId, { rejectWithValue }) => {
    await delay(400);
    try {
      localStorage.removeItem(`ehr_qr_${patientId}`);
      return true;
    } catch (err) {
      return rejectWithValue('Failed to revoke QR token.');
    }
  }
);

// --- INITIAL STATE ---

const initialState = {
  currentQR: null,
  loading: false,
  error: null
};

// --- SLICE ---

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    clearQRError(state) {
      state.error = null;
    },
    loadStoredQR(state, action) {
      const patientId = action.payload;
      const stored = localStorage.getItem(`ehr_qr_${patientId}`);
      if (stored) {
        state.currentQR = JSON.parse(stored);
      } else {
        state.currentQR = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Generate QR Token
      .addCase(generateQRToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQRToken.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQR = action.payload;
      })
      .addCase(generateQRToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Revoke QR Token
      .addCase(revokeQRToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revokeQRToken.fulfilled, (state) => {
        state.loading = false;
        state.currentQR = null;
      })
      .addCase(revokeQRToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// --- ACTIONS & REDUCER ---

export const { clearQRError, loadStoredQR } = qrSlice.actions;
export default qrSlice.reducer;

// --- SELECTORS ---

export const selectCurrentQR = (state) => state.qr.currentQR;
export const selectQRLoading = (state) => state.qr.loading;
export const selectQRError = (state) => state.qr.error;
