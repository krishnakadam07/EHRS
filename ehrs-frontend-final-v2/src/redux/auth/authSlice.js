import { createSlice } from '@reduxjs/toolkit';
import { loginUser, requestOtp, verifyOtp } from './authApi'; // 🌟 IMPORTED FROM AUTH API
import { authService } from '../../services/authService';

const initialState = {
  currentUser: authService.getCurrentUser(),
  loading: false,
  error: null,
  isAuthenticated: !!authService.getCurrentUser(),
  otpVerified: false,           // 🌟 TRACK OTP STATUS
  forgotPasswordSuccess: false  // 🌟 TRACK EMAIL STATUS
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.currentUser = null;
      state.isAuthenticated = false;
      state.otpVerified = false;
      state.forgotPasswordSuccess = false;
    },
    clearAuthStates: (state) => {
      state.error = null;
      state.otpVerified = false;
      state.forgotPasswordSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
        // LOGIN
        .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.currentUser = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // 🌟 REQUEST OTP (Email sending)
        .addCase(requestOtp.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(requestOtp.fulfilled, (state) => {
          state.loading = false;
          state.forgotPasswordSuccess = true;
        })
        .addCase(requestOtp.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // 🌟 VERIFY OTP (Checking code)
        .addCase(verifyOtp.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(verifyOtp.fulfilled, (state) => {
          state.loading = false;
          state.otpVerified = true;
        })
        .addCase(verifyOtp.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  }
});

export const { logout, clearAuthStates } = authSlice.actions;

// 🌟 RE-EXPORT THUNKS SO useAuth.js DOESN'T BREAK!
export { loginUser, requestOtp, verifyOtp } from './authApi';

export default authSlice.reducer;