import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiPhone, FiDroplet, FiHeart, FiShield, FiClock, FiActivity } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';

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

        {/* CRITICAL VITALS - The "3 Second" Rule Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Blood Type - Massive Visibility */}
          <div className="bg-red-500 rounded-3xl p-6 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] border border-red-400 relative overflow-hidden text-white min-h-[200px]">
             <FiDroplet className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20 pointer-events-none" />
             <span className="text-sm font-black uppercase tracking-widest opacity-90 mb-2 relative z-10">Blood Group</span>
             <span className="text-8xl font-black tracking-tighter relative z-10 leading-none">{profile.bloodType}</span>
          </div>

          {/* Severe Allergies - High Alert */}
          <div className="bg-orange-500 rounded-3xl p-6 flex flex-col shadow-[0_0_40px_rgba(249,115,22,0.2)] border border-orange-400 text-white min-h-[200px]">
             <div className="flex items-center gap-2 mb-4 opacity-90">
                <FiAlertTriangle className="w-5 h-5" />
                <span className="text-sm font-black uppercase tracking-widest">Critical Allergies</span>
             </div>
             <div className="flex flex-col gap-2">
               {profile.allergies.map(allergy => (
                 <div key={allergy} className="bg-orange-600/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-orange-400/50 font-black text-lg">
                   {allergy}
                 </div>
               ))}
             </div>
          </div>

        </motion.div>

        {/* Chronic Diseases */}
        <motion.div variants={itemVariants} className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
           <div className="flex items-center gap-2 mb-6">
              <FiActivity className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-black text-white uppercase tracking-widest">Chronic Conditions</h2>
           </div>
           <div className="flex flex-wrap gap-3">
              {profile.diseases.map(disease => (
                <span key={disease} className="px-4 py-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-xl font-bold text-lg">
                  {disease}
                </span>
              ))}
           </div>
        </motion.div>

        {/* Current Medications */}
        <motion.div variants={itemVariants} className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
           <div className="flex items-center gap-2 mb-6">
              <FiHeart className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-black text-white uppercase tracking-widest">Active Medications</h2>
           </div>
           <div className="flex flex-col divide-y divide-slate-700">
              {profile.medications.map((med, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 first:pt-0 last:pb-0 gap-1">
                  <span className="text-xl font-bold text-white">{med.name}</span>
                  <span className="text-sm font-bold text-slate-400 bg-slate-700 px-3 py-1 rounded-lg self-start sm:self-auto">{med.dosage}</span>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Emergency Contacts - 1 Click Dial */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 mt-4">
           <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest pl-2">Emergency Contacts</h2>
           
           {profile.contacts.map((contact, idx) => (
             <a 
               key={idx} 
               href={`tel:${contact.phone}`}
               className="bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-3xl p-6 flex items-center justify-between shadow-lg shadow-emerald-500/20 group cursor-pointer"
             >
                <div className="flex flex-col text-white">
                  <span className="text-sm font-black uppercase tracking-widest opacity-90 mb-1">{contact.relation}</span>
                  <span className="text-2xl font-black">{contact.name}</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-white text-emerald-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <FiPhone className="w-8 h-8" />
                </div>
             </a>
           ))}
        </motion.div>

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
