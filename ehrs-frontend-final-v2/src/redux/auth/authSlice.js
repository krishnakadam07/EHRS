import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authApi';
import { authService } from '../../services/authService';

const initialState = {
  currentUser: authService.getCurrentUser(), 
  loading: false,
  error: null,
  isAuthenticated: !!authService.getCurrentUser()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    clearAuthStates: (state) => { state.error = null; },
    requestOtp: (state) => {},
    verifyOtp: (state) => {}
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.currentUser = action.payload; 
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  }
});

export const { logout, clearAuthStates, requestOtp, verifyOtp } = authSlice.actions;
export default authSlice.reducer;