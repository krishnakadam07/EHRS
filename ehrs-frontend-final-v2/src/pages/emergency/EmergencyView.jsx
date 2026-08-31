import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiClock } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import CriticalInfo from './CriticalInfo';
import EmergencyContact from './EmergencyContact';

// Mock Patient Data (Normally fetched via patientId from router state)
const MOCK_EMERGENCY_PROFILE = {
  id: 'PT-10492-AX',
  name: 'Jane Doe',
  age: 41,
  bloodType: 'B+',
  allergies: ['Peanuts', 'Penicillin', 'Latex'],
  diseases: ['Mild Asthma', 'Type 2 Diabetes'],
  medications: [
    { name: 'Metformin', dosage: '500mg daily' },
    { name: 'Albuterol Inhaler', dosage: 'As needed' }
  ],
  contacts: [
    { name: 'John Doe', relation: 'Spouse', phone: '+1 555-0199' },
    { name: 'Sarah Smith', relation: 'Sister', phone: '+1 555-0200' }
  ],
  verifiedAt: new Date().toLocaleTimeString()
};

export default function EmergencyView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure state passed from the QR Scanner
  const { patientId, verified } = location.state || {};

  // If accessed directly without a verified scan, we could block it, but for demo we show mock data.
  const profile = MOCK_EMERGENCY_PROFILE;

  useEffect(() => {
    // Scroll to top on mount for immediate visibility
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-12 selection:bg-red-500/30">
      
      {/* Top Security Banner - Fixed to ensure it's always seen */}
      <div className="bg-emerald-500 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <FiShield className="w-5 h-5 shrink-0" />
          <span className="text-sm font-black uppercase tracking-widest">Verified EHRS Scan</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold opacity-90">
          <FiClock className="w-4 h-4" /> {profile.verifiedAt}
        </div>
      </div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
        className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-6"
      >
        
        {/* Patient Identity Banner */}
        <motion.div variants={itemVariants} className="flex items-center gap-6 bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
           <div className="w-24 h-24 rounded-2xl bg-slate-700 flex items-center justify-center text-4xl font-black text-slate-500 shrink-0">
             {profile.name.charAt(0)}
           </div>
           <div className="flex flex-col">
             <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-1">{profile.name}</h1>
             <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{profile.id}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
               <span className="text-sm font-bold text-slate-400">{profile.age} yrs</span>
             </div>
           </div>
        </motion.div>

        {/* Extracted Reusable Components */}
        <CriticalInfo profile={profile} />
        
        <div className="mt-4">
          <EmergencyContact contacts={profile.contacts} />
        </div>

        {/* Doctor Action Gate */}
        {verified && (
          <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-700 flex justify-center">
             <button 
               onClick={() => navigate(ROUTES.DOCTOR.PATIENT_DETAILS)}
               className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-2xl text-white font-bold transition-all shadow-lg"
             >
               Switch to Full Medical History
             </button>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
