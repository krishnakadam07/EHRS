import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routeConstants';

// Layout & Guards
import DashboardLayout from '../components/layout/DashboardLayout';
import PatientRoute from './PatientRoute';
import DoctorRoute from './DoctorRoute';
import AdminRoute from './AdminRoute';
import SuspenseLoader from '../components/common/SuspenseLoader';

// Lazy load Auth Pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'));

// Lazy load Patient Pages
const PatientDashboard = lazy(() => import('../pages/patient/PatientDashboard'));
const Profile = lazy(() => import('../pages/patient/Profile'));
const MedicalRecords = lazy(() => import('../pages/patient/MedicalRecords'));
const UploadRecord = lazy(() => import('../pages/patient/UploadRecord'));
const QRCodePage = lazy(() => import('../pages/patient/QRCodePage'));
const EmergencyProfile = lazy(() => import('../pages/patient/EmergencyProfile'));
const AccessHistory = lazy(() => import('../pages/patient/AccessHistory'));
const Notifications = lazy(() => import('../pages/patient/Notifications'));
const BloodBankFinder = lazy(() => import('../pages/patient/BloodBankFinder'));
const NearbyHospitals = lazy(() => import('../pages/patient/NearbyHospitals'));
const Settings = lazy(() => import('../pages/patient/Settings'));

// Lazy load Doctor Pages
const DoctorDashboard = lazy(() => import('../pages/doctor/DoctorDashboard'));
const ScanQR = lazy(() => import('../pages/doctor/ScanQR'));
const PatientDetails = lazy(() => import('../pages/doctor/PatientDetails'));
const AddPrescription = lazy(() => import('../pages/doctor/AddPrescription'));
const MedicalHistory = lazy(() => import('../pages/doctor/MedicalHistory'));
const AccessLogs = lazy(() => import('../pages/doctor/AccessLogs'));
const DoctorProfile = lazy(() => import('../pages/doctor/DoctorProfile'));

// Lazy load Admin Pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ManagePatients = lazy(() => import('../pages/admin/ManagePatients'));
const ManageDoctors = lazy(() => import('../pages/admin/ManageDoctors'));
const VerifyDoctors = lazy(() => import('../pages/admin/VerifyDoctors'));
const Analytics = lazy(() => import('../pages/admin/Analytics'));
const SystemLogs = lazy(() => import('../pages/admin/SystemLogs'));

// Lazy load Emergency & Misc Pages
const EmergencyView = lazy(() => import('../pages/emergency/EmergencyView'));
const Home = lazy(() => import('../pages/misc/Home'));
const About = lazy(() => import('../pages/misc/About'));
const Contact = lazy(() => import('../pages/misc/Contact'));
const NotFound = lazy(() => import('../pages/misc/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
        <Route path={ROUTES.PUBLIC.ABOUT} element={<About />} />
        <Route path={ROUTES.PUBLIC.CONTACT} element={<Contact />} />
        
        {/* Auth Routes */}
        <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
        <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.AUTH.VERIFY_OTP} element={<VerifyOtp />} />

        {/* Emergency View */}
        <Route path={ROUTES.PUBLIC.EMERGENCY_VIEW} element={<EmergencyView />} />

        {/* Patient Role-based Routes */}
        <Route element={<PatientRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.PATIENT.DASHBOARD} element={<PatientDashboard />} />
            <Route path={ROUTES.PATIENT.PROFILE} element={<Profile />} />
            <Route path={ROUTES.PATIENT.RECORDS} element={<MedicalRecords />} />
            <Route path={ROUTES.PATIENT.UPLOAD} element={<UploadRecord />} />
            <Route path={ROUTES.PATIENT.QR} element={<QRCodePage />} />
            <Route path={ROUTES.PATIENT.EMERGENCY} element={<EmergencyProfile />} />
            <Route path={ROUTES.PATIENT.HISTORY} element={<AccessHistory />} />
            <Route path={ROUTES.PATIENT.NOTIFICATIONS} element={<Notifications />} />
            <Route path={ROUTES.PATIENT.BLOOD_BANK} element={<BloodBankFinder />} />
            <Route path={ROUTES.PATIENT.HOSPITALS} element={<NearbyHospitals />} />
            <Route path={ROUTES.PATIENT.SETTINGS} element={<Settings />} />
          </Route>
        </Route>

        {/* Doctor Role-based Routes */}
        <Route element={<DoctorRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DOCTOR.DASHBOARD} element={<DoctorDashboard />} />
            <Route path={ROUTES.DOCTOR.SCAN_QR} element={<ScanQR />} />
            <Route path={ROUTES.DOCTOR.PATIENT_DETAILS} element={<PatientDetails />} />
            <Route path={ROUTES.DOCTOR.ADD_PRESCRIPTION} element={<AddPrescription />} />
            <Route path={ROUTES.DOCTOR.MEDICAL_HISTORY} element={<MedicalHistory />} />
            <Route path={ROUTES.DOCTOR.LOGS} element={<AccessLogs />} />
            <Route path={ROUTES.DOCTOR.PROFILE} element={<DoctorProfile />} />
          </Route>
        </Route>

        {/* Admin Role-based Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN.PATIENTS} element={<ManagePatients />} />
            <Route path={ROUTES.ADMIN.DOCTORS} element={<ManageDoctors />} />
            <Route path={ROUTES.ADMIN.VERIFY_DOCTORS} element={<VerifyDoctors />} />
            <Route path={ROUTES.ADMIN.ANALYTICS} element={<Analytics />} />
            <Route path={ROUTES.ADMIN.LOGS} element={<SystemLogs />} />
          </Route>
        </Route>

        {/* Wildcard redirects */}
        <Route path={ROUTES.PUBLIC.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.PUBLIC.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
}
