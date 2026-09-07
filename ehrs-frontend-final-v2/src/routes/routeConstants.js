export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
<<<<<<< HEAD
    EMERGENCY_VIEW: '/emergency',
=======
    EMERGENCY_VIEW: '/emergency-view',
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    NOT_FOUND: '/404'
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_OTP: '/verify-otp'
  },
  PATIENT: {
    DASHBOARD: '/patient',
    PROFILE: '/patient/profile',
    RECORDS: '/patient/records',
    UPLOAD: '/patient/upload',
    QR: '/patient/qr',
    EMERGENCY: '/patient/emergency',
    HISTORY: '/patient/history',
    NOTIFICATIONS: '/patient/notifications',
    BLOOD_BANK: '/patient/blood-bank',
    HOSPITALS: '/patient/hospitals',
    SETTINGS: '/patient/settings',
    AI_ANALYSIS: '/patient/ai-analysis'
  },
  DOCTOR: {
    DASHBOARD: '/doctor',
    SCAN_QR: '/doctor/scan-qr',
    PATIENT_DETAILS: '/doctor/patient-details',
    ADD_PRESCRIPTION: '/doctor/add-prescription',
    MEDICAL_HISTORY: '/doctor/medical-history',
    LOGS: '/doctor/logs',
    PROFILE: '/doctor/profile',
    AI_TRIAGE: '/doctor/ai-triage',
<<<<<<< HEAD
    NOTIFICATIONS: '/doctor/notifications',
    SETTINGS: '/doctor/settings'
=======
    NOTIFICATIONS: '/doctor/notifications'
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
  },
  ADMIN: {
    DASHBOARD: '/admin',
    PATIENTS: '/admin/patients',
    DOCTORS: '/admin/doctors',
    VERIFY_DOCTORS: '/admin/verify-doctors',
    ANALYTICS: '/admin/analytics',
    LOGS: '/admin/logs',
<<<<<<< HEAD
    NOTIFICATIONS: '/admin/notifications',
    PROFILE: '/admin/profile',
    SETTINGS: '/admin/settings'
=======
    NOTIFICATIONS: '/admin/notifications'
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
  }
};