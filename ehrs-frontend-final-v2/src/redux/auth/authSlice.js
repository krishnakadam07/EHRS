import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// --- ASYNC THUNKS ---

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('ehr_jwt_token', token);

            const loggedInUser = user || { email, role: role || 'patient', id: 'from-db' };
            return loggedInUser;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Invalid email or password');
        }
    }
);

// 🌟 FIX: Here is the missing registerUser export that caused your crash!
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ otp }, { rejectWithValue }) => {
        if (otp !== '123456') {
            return rejectWithValue('Invalid OTP code.');
        }
        return true;
    }
);

export const requestOtp = createAsyncThunk(
    'auth/requestOtp',
    async (email, { rejectWithValue }) => {
        return true;
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, { getState, rejectWithValue }) => {
        return profileData; // Mocked
    }
);

// --- INITIAL STATE ---

const getStoredCurrentUser = () => {
    const stored = localStorage.getItem('ehr_current_user');
    return stored ? JSON.parse(stored) : null;
};

const initialState = {
    users: [],
    currentUser: getStoredCurrentUser(),
    isAuthenticated: !!getStoredCurrentUser(),
    loading: false,
    error: null,
    otpVerified: false,
};

// --- SLICE ---

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.otpVerified = false;
            localStorage.removeItem('ehr_current_user');
            localStorage.removeItem('ehr_jwt_token');
        },
        clearError(state) {
            state.error = null;
        },
        clearAuthStates(state) {
            state.error = null;
            state.otpVerified = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('ehr_current_user', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// --- ACTIONS & REDUCER ---

export const { logout, clearError, clearAuthStates } = authSlice.actions;
export default authSlice.reducer;

// --- SELECTORS ---
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectOtpVerified = (state) => state.auth.otpVerified;