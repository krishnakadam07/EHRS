import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMaximize, FiUsers, FiFileText, FiClock, FiActivity, FiEdit3 } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function DoctorDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const recentScans = [
    { id: 'SCN-101', patient: 'Jane Doe', time: '10 mins ago', status: 'Emergency Access' },
    { id: 'SCN-102', patient: 'Robert Smith', time: '2 hours ago', status: 'Routine Checkup' },
    { id: 'SCN-103', patient: 'Emily Chen', time: 'Yesterday', status: 'Prescription Update' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader 
        title={`Welcome, Dr. ${currentUser?.name?.split(' ')[1] || 'Doctor'}`}
        subtitle="Manage your patients, scan medical IDs, and review access logs."
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        {/* Section 1: Quick Actions (Primary Focus for Doctors) */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate(ROUTES.DOCTOR.SCAN_QR)}
            className="bg-gradient-to-br from-primary to-sky-600 rounded-3xl p-6 flex items-center gap-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-left group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              <FiMaximize className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-white mb-1">Scan Patient QR</h2>
              <p className="text-sky-100 font-medium text-sm">Instantly access emergency profiles & records.</p>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4">
             <QuickActionButton 
                icon={<FiEdit3 />} 
                label="Write Prescription" 
                onClick={() => navigate(ROUTES.DOCTOR.ADD_PRESCRIPTION)} 
             />
             <QuickActionButton 
                icon={<FiClock />} 
                label="View Access Logs" 
                onClick={() => navigate(ROUTES.DOCTOR.LOGS)} 
             />
          </div>
        </motion.div>

        {/* Section 2: Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard 
            title="Total Scans Today" 
            value="12" 
            subtitle="+3 from yesterday" 
            icon={<FiActivity />} 
            color="text-emerald-500" 
            bgColor="bg-emerald-500/10" 
          />
          <MetricCard 
            title="Active Patients" 
            value="148" 
            subtitle="Verified identities" 
            icon={<FiUsers />} 
            color="text-primary" 
            bgColor="bg-primary/10" 
          />
          <MetricCard 
            title="Prescriptions Issued" 
            value="85" 
            subtitle="This month" 
            icon={<FiFileText />} 
            color="text-orange-500" 
            bgColor="bg-orange-500/10" 
          />
        </motion.div>

        {/* Section 3: Recent Activity */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Recent Scans</h2>
                  <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.DOCTOR.LOGS)}>View Full Log</Button>
                </div>
              </Card.Header>
              <Card.Body noPadding>
                <div className="flex flex-col divide-y divide-slate-100">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(ROUTES.DOCTOR.PATIENT_DETAILS)}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                          {scan.patient.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">{scan.patient}</span>
                          <span className="text-xs text-slate-500">{scan.id} &bull; {scan.status}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{scan.time}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
          
          <div className="bg-slate-800 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <FiShield className="w-32 h-32" />
             </div>
             <div className="relative z-10 flex flex-col gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                   <FiShield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black tracking-wide">Security Notice</h3>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                   All patient access is cryptographically logged. Ensure you have verbal or emergency consent before scanning a patient's Medical ID.
                </p>
             </div>
             <Button variant="outline" className="mt-6 border-white/20 text-white hover:bg-white/10 w-full relative z-10">
                View Security Policy
             </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center justify-center gap-3 group"
    >
      <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </button>
  );
}

function MetricCard({ title, value, subtitle, icon, color, bgColor }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <span className="text-sm font-bold text-slate-500">{title}</span>
        <div className={`w-12 h-12 rounded-xl ${bgColor} ${color} flex items-center justify-center shrink-0`}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-4xl font-black text-slate-800">{value}</span>
        <span className="text-xs font-semibold text-slate-400 mt-1">{subtitle}</span>
      </div>
    </div>
  );
}

// Temporary FiShield mock for internal usage if not imported
function FiShield(props) {
    return <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
}
