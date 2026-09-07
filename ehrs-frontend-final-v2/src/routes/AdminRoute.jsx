import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from './routeConstants';

export default function AdminRoute() {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

<<<<<<< HEAD
  // 🌟 FIX: Enforce lowercase validation
  const role = currentUser?.role?.toLowerCase();

  if (role !== 'admin') {
    if (role === 'patient') return <Navigate to={ROUTES.PATIENT.DASHBOARD} replace />;
    if (role === 'doctor') return <Navigate to={ROUTES.DOCTOR.DASHBOARD} replace />;
=======
  if (currentUser?.role !== 'admin') {
    if (currentUser?.role === 'patient') return <Navigate to={ROUTES.PATIENT.DASHBOARD} replace />;
    if (currentUser?.role === 'doctor') return <Navigate to={ROUTES.DOCTOR.DASHBOARD} replace />;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    return <Navigate to={ROUTES.PUBLIC.HOME} replace />;
  }

  return <Outlet />;
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
