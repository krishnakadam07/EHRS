import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiSearch, FiChevronDown, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Navbar({ toggleSidebar, onMobileMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Format breadcrumb from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentView = pathParts.length > 0 
    ? pathParts[pathParts.length - 1].replace('-', ' ') 
    : 'Dashboard';
  
  // Determine role based on route for correct navigation
  const userRole = pathParts[0] || 'patient';
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 w-full">
      
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMobileMenuClick} 
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Toggle (Optional if you want to collapse sidebar) */}
        <button 
          onClick={toggleSidebar} 
          className="hidden lg:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs - Linear style */}
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
           <span className="text-slate-400 capitalize">{pathParts[0] || 'App'}</span>
           <span className="text-slate-300">/</span>
           <span className="text-slate-800 capitalize font-bold">{currentView}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Global Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 w-64 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
           <FiSearch className="text-slate-400 w-4 h-4 mr-2" />
           <input 
              type="text" 
              placeholder="Search patients, records..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-medium"
           />
           <div className="flex items-center gap-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-sm">
              <span className="text-[12px]">⌘</span> K
           </div>
        </div>

        {/* Notifications */}
        <motion.button 
           onClick={() => navigate(`/${userRole}/notifications`)}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full animate-pulse-emergency"></span>
        </motion.button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <button 
          onClick={() => navigate(`/${userRole}/profile`)}
          className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-sky-400 text-white flex items-center justify-center shadow-sm">
             <FiUser className="w-4 h-4" />
          </div>
          <div className="hidden md:flex flex-col items-start">
             <span className="text-sm font-bold text-slate-800 leading-none">My Profile</span>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{userRole}</span>
          </div>
        </button>

      </div>
    </header>
  );
}
