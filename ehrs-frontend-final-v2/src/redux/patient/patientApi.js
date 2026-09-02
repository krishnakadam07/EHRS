import { createAsyncThunk } from '@reduxjs/toolkit';
import { patientService } from '../../services/patientService';

export const updatePatientProfile = createAsyncThunk(
  'patient/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const email = profileData.email; 
      const response = await patientService.updateProfile(email, profileData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);