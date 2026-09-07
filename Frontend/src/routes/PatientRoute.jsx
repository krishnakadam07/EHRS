import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from './routeConstants';

export default function PatientRoute() {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (currentUser?.role !== 'patient') {
    if (currentUser?.role === 'doctor') return <Navigate to={ROUTES.DOCTOR.DASHBOARD} replace />;
    if (currentUser?.role === 'admin') return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    return <Navigate to={ROUTES.PUBLIC.HOME} replace />;
  }

  return <Outlet />;
}
