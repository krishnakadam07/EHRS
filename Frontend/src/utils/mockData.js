export const initialUsers = [
  {
    id: "patient-1",
    name: "John Doe",
    email: "patient@ehr.com",
    password: "password123",
    role: "patient",
    phone: "+1 555-0199",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    dob: "1988-06-15",
    gender: "Male",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Peanuts", "Sulfa Drugs"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescribedBy: "Dr. Robert House" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", prescribedBy: "Dr. Robert House" }
    ],
    emergencyContacts: [
      { name: "Sarah Doe", relation: "Spouse", phone: "+1 555-0145" },
      { name: "James Doe", relation: "Father", phone: "+1 555-0167" }
    ],
    insurance: { provider: "Blue Cross Blue Shield", policyNumber: "BCBS-9928374-X", expiry: "2028-12-31" }
  },
  {
    id: "doctor-1",
    name: "Dr. Robert House",
    email: "doctor@ehr.com",
    password: "password123",
    role: "doctor",
    phone: "+1 555-0122",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
    specialty: "Diagnostic Medicine",
    hospital: "Princeton-Plainsboro Teaching Hospital",
    licenseNumber: "MD-94821",
    isVerified: true
  },
  {
    id: "doctor-2",
    name: "Dr. Allison Cameron",
    email: "cameron@ehr.com",
    password: "password123",
    role: "doctor",
    phone: "+1 555-0123",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150",
    specialty: "Immunology",
    hospital: "Princeton-Plainsboro Teaching Hospital",
    licenseNumber: "MD-98831",
    isVerified: false
  },
  {
    id: "admin-1",
    name: "Dr. Lisa Cuddy",
    email: "admin@ehr.com",
    password: "password123",
    role: "admin",
    phone: "+1 555-0100",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    department: "Hospital Administration"
  }
];

export const initialRecords = [
  {
    id: "rec-1",
    patientId: "patient-1",
    title: "Annual Cardiovascular Report",
    date: "2026-07-12",
    category: "Cardiology",
    doctorName: "Dr. Robert House",
    notes: "Patient shows steady blood pressure improvement. Recommended continuing Lisinopril 10mg.",
    attachmentUrl: "#",
    attachmentName: "cardiovascular_report_july2026.pdf"
  },
  {
    id: "rec-2",
    patientId: "patient-1",
    title: "Glycated Hemoglobin (HbA1c) Test Result",
    date: "2026-05-18",
    category: "Endocrinology",
    doctorName: "Dr. Robert House",
    notes: "HbA1c is stable at 6.4%. Maintain current Metformin dosage and low-carb diet.",
    attachmentUrl: "#",
    attachmentName: "hba1c_lab_result_may2026.pdf"
  },
  {
    id: "rec-3",
    patientId: "patient-1",
    title: "Chest X-Ray Diagnostic",
    date: "2025-11-05",
    category: "Radiology",
    doctorName: "Dr. Allison Cameron",
    notes: "Clear lung fields. No active cardiopulmonary disease detected.",
    attachmentUrl: "#",
    attachmentName: "chest_xray_nov2025.jpg"
  }
];

export const initialAccessLogs = [
  {
    id: "log-1",
    patientId: "patient-1",
    doctorName: "Dr. Robert House",
    hospitalName: "Princeton-Plainsboro Teaching Hospital",
    purpose: "Routine Follow-up & Prescription Update",
    date: "2026-08-10T14:32:00Z",
    accessType: "Full Access"
  },
  {
    id: "log-2",
    patientId: "patient-1",
    doctorName: "Dr. Allison Cameron",
    hospitalName: "Princeton-Plainsboro Teaching Hospital",
    purpose: "Emergency Responder (Auto QR Scan)",
    date: "2026-08-15T03:10:00Z",
    accessType: "Emergency Profile"
  }
];

export const initialHospitals = [
  {
    id: "hosp-1",
    name: "Princeton-Plainsboro Teaching Hospital",
    distance: "1.2 km",
    address: "221b Baker St, Mercer County",
    phone: "+1 555-0120",
    lat: 40.3573,
    lng: -74.6672,
    icuAvailable: 4,
    emergencyStatus: "Active"
  },
  {
    id: "hosp-2",
    name: "Mercy Care Clinic & Trauma Center",
    distance: "3.8 km",
    address: "500 Main Dr, Mercer County",
    phone: "+1 555-0822",
    lat: 40.3601,
    lng: -74.6300,
    icuAvailable: 0,
    emergencyStatus: "Busy"
  },
  {
    id: "hosp-3",
    name: "St. Jude Children Hospital",
    distance: "5.5 km",
    address: "100 Hospital Way, Lawrenceville",
    phone: "+1 555-0911",
    lat: 40.3340,
    lng: -74.7120,
    icuAvailable: 8,
    emergencyStatus: "Active"
  }
];

export const initialBloodBanks = [
  {
    id: "bb-1",
    name: "Mercer County Community Blood Center",
    distance: "2.3 km",
    address: "414 Red Cross Rd, Trenton",
    phone: "+1 555-0140",
    stock: { "O+": "High", "O-": "Low", "A+": "Critical", "B+": "High", "AB-": "Out of Stock" }
  },
  {
    id: "bb-2",
    name: "Metro Red Cross Blood Bank",
    distance: "4.5 km",
    address: "880 Donor Blvd, Princeton",
    phone: "+1 555-0211",
    stock: { "O+": "Medium", "O-": "Medium", "A+": "High", "B+": "Critical", "AB-": "Low" }
  }
];

export const initialSystemLogs = [
  { id: "slog-1", timestamp: "2026-08-16T09:45:00Z", category: "Auth", message: "User patient@ehr.com logged in successfully.", ipAddress: "192.168.1.45" },
  { id: "slog-2", timestamp: "2026-08-16T09:12:00Z", category: "EHR Access", message: "EHR profile accessed for John Doe via Emergency QR Scanner.", ipAddress: "10.0.1.200" },
  { id: "slog-3", timestamp: "2026-08-16T08:30:00Z", category: "Admin", message: "License MD-94821 verified for Dr. Robert House.", ipAddress: "192.168.1.10" }
];
