import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiActivity, FiUsers, FiFileText, FiShield,
  FiSettings, FiLogOut, FiPieChart, FiMonitor
} from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';

export const menuGroups = {
  patient: [
    { path: ROUTES.PATIENT.DASHBOARD, icon: <FiActivity />, label: 'Overview' },
    { path: ROUTES.PATIENT.RECORDS, icon: <FiFileText />, label: 'My Records' },
    { path: ROUTES.PATIENT.QR_CODE, icon: <FiShield />, label: 'Medical ID' },
    { path: 'pages/patient/hospitals', icon: <FiMonitor />, label: 'Hospitals' },
    { path: 'pages/patient/blood-banks', icon: <FiHeart />, label: 'Blood Banks' },
  ],
  doctor: [
    { path: ROUTES.DOCTOR.DASHBOARD, icon: <FiActivity />, label: 'Dashboard' },
    { path: ROUTES.DOCTOR.SCANNER, icon: <FiMonitor />, label: 'Scan Patient QR' },
    { path: ROUTES.DOCTOR.PATIENT_DETAILS.replace(':id', 'PT-10492-AX'), icon: <FiUsers />, label: 'Patient Directory' },
    { path: ROUTES.DOCTOR.ACCESS_LOGS, icon: <FiShield />, label: 'Access History' },
  ],
  admin: [
    { path: ROUTES.ADMIN.DASHBOARD, icon: <FiActivity />, label: 'Control Panel' },
    { path: ROUTES.ADMIN.ANALYTICS, icon: <FiPieChart />, label: 'Analytics' },
    { path: ROUTES.ADMIN.VERIFY_DOCTORS, icon: <FiShield />, label: 'Verify Doctors' },
    { path: ROUTES.ADMIN.PATIENTS, icon: <FiUsers />, label: 'Patients' },
    { path: ROUTES.ADMIN.DOCTORS, icon: <FiUsers />, label: 'Doctors' },
    { path: ROUTES.ADMIN.LOGS, icon: <FiFileText />, label: 'System Logs' },
  ]
};

export const getNavItems = (role) => menuGroups[role] || [];

export default function Sidebar({ isOpen }) {
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
        </div>
      </aside>
  );
}

// Ensure FiHeart is imported for the patient menu
import { FiHeart } from 'react-icons/fi';
