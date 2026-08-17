import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const routeNames = {
  'patient': 'Patient Portal',
  'doctor': 'Doctor Portal',
  'admin': 'Admin Dashboard',
  'dashboard': 'Dashboard',
  'medical-records': 'Medical Records',
  'upload-record': 'Upload Record',
  'nearby-hospitals': 'Nearby Hospitals',
  'blood-bank': 'Blood Banks',
  'profile': 'Profile',
  'scan-qr': 'Scan QR',
  'access-history': 'Access History',
  'manage-doctors': 'Manage Doctors',
  'manage-patients': 'Manage Patients',
  'system-logs': 'System Logs',
  'settings': 'Settings',
  'notifications': 'Notifications',
  'qr': 'QR Code'
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we are at the root or just auth pages, we might not want breadcrumbs
  if (pathnames.length === 0 || ['login', 'register', 'forgot-password'].includes(pathnames[0])) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 font-medium hidden sm:flex">
      <Link to="/" className="hover:text-primary transition-colors flex items-center">
        <FiHome className="w-4 h-4" />
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        // Format the name
        let name = routeNames[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <div key={to} className="flex items-center space-x-2">
            <FiChevronRight className="w-4 h-4 text-slate-300" />
            {isLast ? (
              <span className="text-slate-800 font-bold bg-slate-100/50 px-2 py-0.5 rounded-md border border-slate-200/50">
                {name}
              </span>
            ) : (
              <Link to={to} className="hover:text-primary transition-colors">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
