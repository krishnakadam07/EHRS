import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await authService.login(credentials);
    // FIXED: Now we ensure 'role' is successfully returned and passed into Redux!
    return { ...data, email: credentials.email, role: credentials.role || 'patient' };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
  }
});

// 🌟 ADDED OTP THUNKS BELOW
export const requestOtp = createAsyncThunk('auth/requestOtp', async (email, thunkAPI) => {
  try {
    return await authService.sendOtp(email);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (otp, thunkAPI) => {
  try {
    return await authService.verifyOtp(otp);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});