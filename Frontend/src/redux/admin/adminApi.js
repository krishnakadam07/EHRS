import { adminStart, adminFailure, addSystemLog } from './adminSlice';
import { verifyDoctorLicense } from '../auth/authSlice';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const logAdminEvent = (category, message) => (dispatch) => {
  const newLog = {
    id: `slog-${Date.now()}`,
    timestamp: new Date().toISOString(),
    category,
    message,
    ipAddress: "192.168.1.100"
  };
  dispatch(addSystemLog(newLog));
};

export const approveDoctorRegistration = (doctorId) => async (dispatch) => {
  dispatch(adminStart());
  await delay(800);
  try {
    // 1. Dispatch profile update to set isVerified: true
    dispatch(verifyDoctorLicense({ doctorId, verified: true }));
    
    // 2. Add system audit log
    dispatch(logAdminEvent("Admin Action", `Approved registration for doctor ID ${doctorId}.`));
    return true;
  } catch (err) {
    dispatch(adminFailure("Failed to approve doctor license."));
    return false;
  }
};

export const rejectDoctorRegistration = (doctorId) => async (dispatch) => {
  dispatch(adminStart());
  await delay(800);
  try {
    // We reject by setting verified to false (or we could delete them, but keeping them as unverified is clean)
    dispatch(verifyDoctorLicense({ doctorId, verified: false }));
    
    // Add system audit log
    dispatch(logAdminEvent("Admin Action", `Rejected registration for doctor ID ${doctorId}.`));
    return true;
  } catch (err) {
    dispatch(adminFailure("Failed to reject doctor license."));
    return false;
  }
};
