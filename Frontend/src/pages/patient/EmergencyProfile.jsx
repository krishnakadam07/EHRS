import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiPhoneCall, FiDroplet, FiHeart, FiActivity } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';
import PageHeader from '../../components/common/PageHeader';

export default function EmergencyProfile() {
  const { currentUser } = useSelector(state => state.auth);

  if (!currentUser) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
      <div className="max-w-5xl mx-auto pb-12">
        <PageHeader
            title="Emergency Profile"
            subtitle="This critical medical information is made instantly available to first responders during an emergency."
        />

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8"
        >

          {/* Critical Info Alert */}
          <motion.div variants={itemVariants} className="md:col-span-12">
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-danger/10 border-2 border-danger/20 rounded-[32px] p-8 shadow-soft transition-all hover:shadow-danger/20 hover:border-danger/40"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-danger/20 flex items-center justify-center shrink-0">
                  <FiAlertTriangle className="text-danger w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-black text-danger tracking-tight">Critical Medical Alerts</h2>
                  {currentUser.allergies && currentUser.allergies.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {currentUser.allergies.map((allergy, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                                className="bg-danger text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-danger/20"
                            >
                              Allergic: {allergy}
                            </motion.span>
                        ))}
                      </div>
                  ) : (
                      <p className="text-danger/80 mt-2 font-bold bg-white/50 px-4 py-2 rounded-xl inline-block">No known allergies reported.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Basic Health Info Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-white rounded-[32px] shadow-soft border border-slate-200 p-8 flex flex-col items-center justify-center text-center group transition-all hover:shadow-premium hover:border-danger/30">
              <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-4 group-hover:bg-danger group-hover:text-white transition-colors text-danger">
                <FiDroplet className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Group</h3>
              <div className="text-5xl font-black text-slate-800">
                {currentUser.bloodGroup || "N/A"}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-[32px] shadow-soft border border-slate-200 p-8 flex-1">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <FiHeart className="text-primary" /> Chronic Conditions
              </h3>
              {currentUser.chronicConditions && currentUser.chronicConditions.length > 0 ? (
                  <ul className="space-y-3">
                    {currentUser.chronicConditions.map((condition, idx) => (
                        <motion.li
                            key={idx}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 text-slate-700 font-bold bg-slate-50 p-3 rounded-2xl"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/50"></span>
                          {condition}
                        </motion.li>
                    ))}
                  </ul>
              ) : (
                  <p className="text-slate-500 font-bold bg-slate-50 p-4 rounded-2xl text-center text-sm">No chronic conditions reported.</p>
              )}
            </motion.div>
          </div>

          {/* Medications & Contacts Column */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <motion.div variants={itemVariants} className="bg-white rounded-[32px] shadow-soft border border-slate-200 p-8">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <FiActivity className="text-emerald-500" /> Current Medications
              </h3>
              {currentUser.medications && currentUser.medications.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentUser.medications.map((med, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            className="p-5 rounded-[20px] bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
                        >
                          <h4 className="font-black text-slate-800 text-lg">{med.name}</h4>
                          <p className="text-sm font-bold text-slate-500 mt-1">{med.dosage} • {med.frequency}</p>
                          <div className="mt-4 flex items-center">
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2 py-1 rounded-md">
                         By {med.prescribedBy}
                       </span>
                          </div>
                        </motion.div>
                    ))}
                  </div>
              ) : (
                  <div className="bg-slate-50 rounded-[24px] p-8">
                    <EmptyState
                        icon={<FiActivity />}
                        title="No Active Medications"
                        description="You are currently not taking any prescribed medications."
                    />
                  </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-[32px] shadow-soft border border-slate-200 p-8">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <FiPhoneCall className="text-warning" /> Emergency Contacts
              </h3>
              {currentUser.emergencyContacts && currentUser.emergencyContacts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentUser.emergencyContacts.map((contact, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="p-5 rounded-[20px] border border-slate-200 hover:border-warning/50 hover:shadow-md transition-all flex flex-col"
                        >
                          <h4 className="font-black text-slate-800">{contact.name}</h4>
                          <span className="inline-block bg-warning/10 text-warning text-xs font-bold px-2 py-1 rounded-md mt-2 w-max">
                      {contact.relation}
                    </span>
                          <a href={`tel:${contact.phone}`} className="mt-4 flex items-center justify-center gap-2 bg-slate-50 hover:bg-warning hover:text-white text-slate-600 font-bold p-3 rounded-xl transition-colors">
                            <FiPhoneCall /> Call Now
                          </a>
                        </motion.div>
                    ))}
                  </div>
              ) : (
                  <div className="bg-slate-50 rounded-[24px] p-8">
                    <EmptyState
                        icon={<FiPhoneCall />}
                        title="No Emergency Contacts"
                        description="Please add emergency contacts to your profile."
                    />
                  </div>
              )}
            </motion.div>
          </div>

        </motion.div>
      </div>
  );
}
