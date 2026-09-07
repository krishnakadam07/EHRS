import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from './routeConstants';

export default function DoctorRoute() {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // 🌟 FIX: Enforce lowercase validation
  const role = currentUser?.role?.toLowerCase();

  if (role !== 'doctor') {
    if (role === 'patient') return <Navigate to={ROUTES.PATIENT.DASHBOARD} replace />;
    if (role === 'admin') return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    return <Navigate to={ROUTES.PUBLIC.HOME} replace />;
  }

  return <Outlet />;
}