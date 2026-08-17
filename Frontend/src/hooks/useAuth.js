import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  loginUser,
  registerUser,
  requestOtp,
  verifyOtp as verifyOtpCode,
  logout,
  clearAuthStates
} from '../redux/auth/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();

  const {
    currentUser,
    isAuthenticated,
    loading,
    error,
    otpVerified,
    forgotPasswordSuccess
  } = useSelector((state) => state.auth);

  const login = useCallback(async (email, password) => {
    return await dispatch(loginUser({ email, password }));
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    return await dispatch(registerUser(userData));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const sendOtp = useCallback(async (email) => {
    return await dispatch(requestOtp(email));
  }, [dispatch]);

  const verifyOtp = useCallback(async (otp) => {
    return await dispatch(verifyOtpCode(otp));
  }, [dispatch]);

  const clearStates = useCallback(() => {
    dispatch(clearAuthStates());
  }, [dispatch]);

  const userRole = currentUser?.role || 'patient';

  return {
    currentUser,
    userRole,
    isAuthenticated,
    loading,
    error,
    otpVerified,
    forgotPasswordSuccess,
    login,
    register,
    logout: handleLogout,
    sendOtp,
    verifyOtp,
    clearStates
  };
}
