import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import {
  FiHome, FiActivity, FiUser, FiFileText, FiUploadCloud,
  FiMapPin, FiDroplet, FiSettings, FiLogOut, FiCpu, FiMonitor,
  FiShield, FiUsers, FiPieChart, FiBell
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
=======
import { motion } from 'framer-motion';
import {
  FiActivity, FiUsers, FiFileText, FiShield,
  FiSettings, FiLogOut, FiPieChart, FiMonitor, FiHeart, FiBell, FiCpu, FiUser
} from 'react-icons/fi';
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';

export const menuGroups = {
  patient: [
    { path: ROUTES.PATIENT.DASHBOARD, icon: <FiActivity />, label: 'Overview' },
<<<<<<< HEAD
    { path: ROUTES.PATIENT.PROFILE, icon: <FiUser />, label: 'My Profile' },
    { path: ROUTES.PATIENT.RECORDS, icon: <FiFileText />, label: 'Medical Records' },
    { path: ROUTES.PATIENT.UPLOAD, icon: <FiUploadCloud />, label: 'Upload Record' },
    { path: ROUTES.PATIENT.AI_ANALYSIS, icon: <FiCpu />, label: 'AI Health Insights' },
    { path: ROUTES.PATIENT.QR, icon: <FiMonitor />, label: 'Emergency QR' },
    { path: ROUTES.PATIENT.BLOOD_BANK, icon: <FiDroplet />, label: 'Blood Banks' },
    { path: ROUTES.PATIENT.HOSPITALS, icon: <FiMapPin />, label: 'Find Hospitals' },
=======
    { path: ROUTES.PATIENT.RECORDS, icon: <FiFileText />, label: 'My Records' },
    { path: ROUTES.PATIENT.QR, icon: <FiShield />, label: 'Medical ID' },
    { path: ROUTES.PATIENT.AI_ANALYSIS, icon: <FiCpu />, label: 'AI Analyzer' },
    { path: ROUTES.PATIENT.HOSPITALS, icon: <FiHeart />, label: 'Find Hospital' },
    { path: ROUTES.PATIENT.BLOOD_BANK, icon: <FiHeart />, label: 'Blood Banks' },
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    { path: ROUTES.PATIENT.HISTORY, icon: <FiShield />, label: 'Emergency Scans' },
    { path: ROUTES.PATIENT.NOTIFICATIONS, icon: <FiBell />, label: 'Pending Reports' },
  ],
  doctor: [
    { path: ROUTES.DOCTOR.DASHBOARD, icon: <FiActivity />, label: 'Dashboard' },
    { path: ROUTES.DOCTOR.SCAN_QR, icon: <FiMonitor />, label: 'Scan Patient' },
    { path: ROUTES.DOCTOR.AI_TRIAGE, icon: <FiCpu />, label: 'AI Triage' },
    { path: ROUTES.DOCTOR.MEDICAL_HISTORY, icon: <FiFileText />, label: 'Medical History' },
    { path: ROUTES.DOCTOR.LOGS, icon: <FiShield />, label: 'Access Logs' },
  ],
  admin: [
    { path: ROUTES.ADMIN.DASHBOARD, icon: <FiActivity />, label: 'Control Panel' },
    { path: ROUTES.ADMIN.ANALYTICS, icon: <FiPieChart />, label: 'Analytics' },
    { path: ROUTES.ADMIN.VERIFY_DOCTORS, icon: <FiShield />, label: 'Verify Doctors' },
    { path: ROUTES.ADMIN.PATIENTS, icon: <FiUsers />, label: 'Patients' },
    { path: ROUTES.ADMIN.DOCTORS, icon: <FiUsers />, label: 'Doctors' },
    { path: ROUTES.ADMIN.LOGS, icon: <FiFileText />, label: 'System Logs' },
<<<<<<< HEAD
    { path: ROUTES.ADMIN.PROFILE, icon: <FiUser />, label: 'My Profile' },
    { path: ROUTES.ADMIN.NOTIFICATIONS, icon: <FiBell />, label: 'System Alerts' },
  ]
};

// 🌟 HERE IS THE CORRECT EXPORT
export const getNavItems = (role) => menuGroups[role] || menuGroups['patient'];

export default function Sidebar({ isOpen }) {
=======
    { path: ROUTES.ADMIN.PROFILE, icon: <FiUser />, label: 'My Profile' }, // NEW PROFILE BUTTON ADDED HERE
  ]
};

export const getNavItems = (role) => menuGroups[role] || [];

export default function Sidebar({ isOpen }) {

>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  const navItems = getNavItems(userRole);

  return (
      <aside className={`
<<<<<<< HEAD
      fixed lg:static top-0 left-0 z-40 h-full
      w-[260px] bg-slate-900 border-r border-slate-800
      flex flex-col text-slate-300 transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
    `}>
        <div className="h-20 flex items-center justify-center border-b border-slate-800 shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <FiActivity className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-black tracking-tight text-white">CareVault</span>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-white">
                  <FiActivity className="w-6 h-6" />
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <NavLink key={item.path} to={item.path} className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group overflow-hidden ${isActive ? 'text-white bg-slate-800/80' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                  {isActive && <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <div className={`flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'w-5 h-5' : 'w-6 h-6 mx-auto group-hover:scale-110'} ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-slate-400 group-hover:text-primary'}`}>
                    {item.icon}
                  </div>
                  {isOpen && <span className="truncate">{item.label}</span>}
                </NavLink>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex flex-col gap-2 shrink-0">
          {isOpen ? (
              <>
                <NavLink
                    to={
                      userRole === 'patient' ? ROUTES.PATIENT.SETTINGS :
                          userRole === 'admin' ? ROUTES.ADMIN.SETTINGS :
                              ROUTES.DOCTOR.SETTINGS
                    }
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                >
                  <FiSettings className="w-5 h-5" />
                  <span>Settings</span>
                </NavLink>
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-danger hover:text-white hover:bg-danger/90 transition-colors group">
                  <FiLogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Log out</span>
                </button>
              </>
          ) : (
              <div className="flex flex-col gap-3">
                <NavLink to={
                  userRole === 'patient' ? ROUTES.PATIENT.SETTINGS :
                      userRole === 'admin' ? ROUTES.ADMIN.SETTINGS :
                          ROUTES.DOCTOR.SETTINGS
                } className="flex justify-center p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
                  <FiSettings className="w-5 h-5" />
                </NavLink>
                <button onClick={handleLogout} className="flex justify-center p-2 text-danger hover:text-white hover:bg-danger rounded-xl">
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
          )}
=======
      hidden lg:flex flex-col bg-slate-900 text-slate-300 w-64 h-full shrink-0
      transition-all duration-300 ease-in-out border-r border-slate-800
      ${isOpen ? 'translate-x-0' : '-translate-x-full absolute'}
    `}>
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <FiActivity className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">EHRS<span className="text-primary">.</span></span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={`
                   relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group overflow-hidden
                   ${isActive ? 'text-white bg-slate-800/80' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                `}
                >
                  {isActive && (
                      <motion.div
                          layoutId="activeSidebarIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                  )}
                  <span className={isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>
                   {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                </span>
                  {item.label}
                </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 flex flex-col gap-1.5 shrink-0">
          <NavLink
              to={`/${userRole}/settings`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <FiSettings className="w-5 h-5 text-slate-500" /> Settings
          </NavLink>
          <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-danger hover:bg-danger/10 transition-colors w-full text-left"
          >
            <FiLogOut className="w-5 h-5" /> Sign Out
          </button>
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
        </div>
      </aside>
  );
}