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