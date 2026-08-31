import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiDroplet, FiHeart, FiActivity, FiPhoneCall } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function EmergencyProfile() {
  const { currentUser } = useAuth();
  
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.email) {
      patientService.getProfile(currentUser.email)
        .then(data => {
          setPatientData(data); 
          setLoading(false);
        })
        .catch(err => {
          console.error("Error loading emergency profile", err);
          setLoading(false);
        });
    }
  }, [currentUser]);

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  if (loading) return <div className="text-center mt-20 text-slate-500 font-bold">Fetching Live Emergency Data...</div>;
  if (!patientData) return <div className="text-center mt-20 text-red-500 font-bold">Failed to load profile.</div>;

  const allergiesList = patientData.allergies ? patientData.allergies.split(',').map(a => a.trim()) : [];
  const chronicList = patientData.chronicConditions ? patientData.chronicConditions.split(',').map(c => c.trim()) : [];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <PageHeader 
        title="Emergency Profile" 
        subtitle="This critical medical information is made instantly available to first responders during an emergency."
      />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        <motion.div variants={itemVariants} className="md:col-span-12">
          <motion.div whileHover={{ scale: 1.01 }} className="bg-red-50 border-2 border-red-200 rounded-[32px] p-8 shadow-sm transition-all hover:shadow-md hover:border-red-300">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <FiAlertTriangle className="text-red-500 w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-red-600 tracking-tight">Critical Medical Alerts</h2>
                {allergiesList.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {allergiesList.map((allergy, idx) => (
                      <motion.span key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (idx * 0.1) }} className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-red-500/20">
                        Allergic: {allergy}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-600/80 mt-2 font-bold bg-white/50 px-4 py-2 rounded-xl inline-block">No known allergies reported.</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-center group transition-all hover:shadow-md hover:border-red-300">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors text-red-500"><FiDroplet className="w-8 h-8" /></div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Group</h3>
            <div className="text-5xl font-black text-slate-800">{patientData.bloodType || "N/A"}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8 flex-1">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><FiHeart className="text-blue-600" /> Chronic Conditions</h3>
            {chronicList.length > 0 ? (
              <ul className="space-y-3">
                {chronicList.map((condition, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }} className="flex items-center gap-3 text-slate-700 font-bold bg-slate-50 p-3 rounded-2xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-600/50"></span>{condition}
                  </motion.li>
                ))}
              </ul>
            ) : <p className="text-slate-500 font-bold bg-slate-50 p-4 rounded-2xl text-center text-sm">No chronic conditions reported.</p>}
          </motion.div>
        </div>

        <div className="md:col-span-8 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><FiPhoneCall className="text-orange-500" /> Emergency Contacts</h3>
            {patientData.emergencyContacts && patientData.emergencyContacts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {patientData.emergencyContacts.map((contact, idx) => (
                  <motion.div key={idx} whileHover={{ y: -4 }} className="p-5 rounded-[20px] border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all flex flex-col">
                    <h4 className="font-black text-slate-800">{contact.name}</h4>
                    <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-md mt-2 w-max">{contact.relation}</span>
                    <a href={`tel:${contact.phone}`} className="mt-4 flex items-center justify-center gap-2 bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-600 font-bold p-3 rounded-xl transition-colors">
                      <FiPhoneCall /> Call Now
                    </a>
                  </motion.div>
                ))}
              </div>
            ) : <div className="bg-slate-50 rounded-[24px] p-8"><EmptyState icon={<FiPhoneCall />} title="No Emergency Contacts" description="Please add emergency contacts in your Profile." /></div>}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}