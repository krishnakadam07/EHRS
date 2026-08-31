import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiLogOut, FiShield } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  if (!currentUser) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-4 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="User profile menu"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden shrink-0">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          ) : (
            getInitials(currentUser.name)
          )}
        </div>
        <div className="flex flex-col items-start hidden sm:flex">
          <span className="text-sm font-bold text-slate-700 leading-tight truncate max-w-[100px]">
            {currentUser.name}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-tight">
            {currentUser.role}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-slate-100 bg-white/50">
              <p className="font-bold text-slate-800 truncate">{currentUser.name}</p>
              <p className="text-sm text-slate-500 truncate">{currentUser.email}</p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                <FiShield className="w-3 h-3" />
                {currentUser.role}
              </div>
            </div>

            <div className="p-2 flex flex-col gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-primary font-medium text-sm transition-colors w-full text-left"
              >
                <FiUser className="w-4 h-4 shrink-0" />
                My Profile
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-primary font-medium text-sm transition-colors w-full text-left"
              >
                <FiSettings className="w-4 h-4 shrink-0" />
                Account Settings
              </button>
            </div>

            <div className="p-2 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-bold text-sm transition-colors w-full text-left"
              >
                <FiLogOut className="w-4 h-4 shrink-0" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
