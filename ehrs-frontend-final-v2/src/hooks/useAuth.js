import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginUser, registerUser } from '../redux/auth/authApi';
import { requestOtp, verifyOtp as verifyOtpCode, logout, clearAuthStates } from '../redux/auth/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading, error, otpVerified, forgotPasswordSuccess } = useSelector((state) => state.auth);

  const login = useCallback(async (email, password, role) => {
    try { return await dispatch(loginUser({ email, password, role })).unwrap(); } catch (err) { return false; }
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    try { return await dispatch(registerUser(userData)).unwrap(); } catch (err) { return false; }
  }, [dispatch]);

  const handleLogout = useCallback(() => { dispatch(logout()); }, [dispatch]);
  const sendOtp = useCallback(async (email) => { return await dispatch(requestOtp(email)); }, [dispatch]);
  const verifyOtp = useCallback(async (otp) => { return await dispatch(verifyOtpCode(otp)); }, [dispatch]);
  const clearStates = useCallback(() => { dispatch(clearAuthStates()); }, [dispatch]);

  const userRole = currentUser?.role || 'patient';

  return { currentUser, userRole, isAuthenticated, loading, error, otpVerified, forgotPasswordSuccess, login, register, logout: handleLogout, sendOtp, verifyOtp, clearStates };
}