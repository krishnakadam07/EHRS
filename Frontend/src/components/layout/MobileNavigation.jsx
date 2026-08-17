import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { FiX, FiActivity } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { getNavItems } from './Sidebar';

export default function MobileNavigation({ isOpen, onClose }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close nav on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  if (!currentUser) return null;

  const navItems = getNavItems(currentUser.role);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Off-canvas panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
                  <FiActivity className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">EHRS</h1>
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-500">Portal</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-bold transition-all duration-200
                      ${isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`shrink-0 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                          {item.icon}
                        </span>
                        {item.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden shrink-0">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name?.charAt(0) || 'U'
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</span>
                  <span className="text-xs text-slate-500 truncate">{currentUser.email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
