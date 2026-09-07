import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import patientReducer from './patient/patientSlice';
import doctorReducer from './doctor/doctorSlice';
import recordsReducer from './records/recordsSlice';
import qrReducer from './qr/qrSlice';
import emergencyReducer from './emergency/emergencySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    records: recordsReducer,
    qr: qrReducer,
    emergency: emergencyReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
