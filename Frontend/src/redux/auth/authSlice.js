import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialUsers } from '../../utils/mockData';

// --- MOCK DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ASYNC THUNKS ---

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        await delay(1000);
        const users = JSON.parse(localStorage.getItem('ehr_users')) || initialUsers;
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return rejectWithValue('Invalid email or password');
        }

        if (user.role === 'doctor' && !user.isVerified) {
            return rejectWithValue('Your doctor profile is pending admin verification.');
        }

        return user;
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        await delay(1200);
        const users = JSON.parse(localStorage.getItem('ehr_users')) || initialUsers;
        const exists = users.find(u => u.email === userData.email);

        if (exists) {
            return rejectWithValue('Email is already registered.');
        }

        const newUser = {
            id: `${userData.role}-${Date.now()}`,
            ...userData,
            isVerified: userData.role === 'doctor' ? false : true
        };

        return newUser;
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ otp }, { rejectWithValue }) => {
        await delay(800);
        if (otp !== '123456') {
            return rejectWithValue('Invalid OTP code.');
        }
        return true;
    }
);

export const requestOtp = createAsyncThunk(
    'auth/requestOtp',
    async (email, { rejectWithValue }) => {
        await delay(800);
        const users = JSON.parse(localStorage.getItem('ehr_users')) || initialUsers;
        const exists = users.find(u => u.email === email);
        if (!exists) {
            return rejectWithValue('Email not found in the system.');
        }
        return true;
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, { getState, rejectWithValue }) => {
        await delay(800);
        try {
            return profileData;
        } catch (err) {
            return rejectWithValue('Failed to update profile.');
        }
    }
);

// --- INITIAL STATE ---

const getStoredCurrentUser = () => {
    const stored = localStorage.getItem('ehr_current_user');
    return stored ? JSON.parse(stored) : null;
};

const getStoredUsers = () => {
    const stored = localStorage.getItem('ehr_users');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('ehr_users', JSON.stringify(initialUsers));
    return initialUsers;
};

const initialState = {
    users: getStoredUsers(),
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
                state.users.push(action.payload);
                localStorage.setItem('ehr_users', JSON.stringify(state.users));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Verify OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpVerified = true;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = { ...state.users[index], ...action.payload };
                    localStorage.setItem('ehr_users', JSON.stringify(state.users));

                    if (state.currentUser && state.currentUser.id === action.payload.id) {
                        state.currentUser = state.users[index];
                        localStorage.setItem('ehr_current_user', JSON.stringify(state.currentUser));
                    }
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
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
export const selectAllUsers = (state) => state.auth.users;
