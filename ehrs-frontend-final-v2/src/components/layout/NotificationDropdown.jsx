import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const mockNotifications = [
  { id: 1, type: 'alert', message: 'Critical vitals reported for Patient John Doe', time: '5m ago', read: false },
  { id: 2, type: 'info', message: 'New system update available', time: '1h ago', read: false },
  { id: 3, type: 'success', message: 'Medical license MD-94821 verified', time: '2h ago', read: true },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      case 'success': return <FiCheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'info':
      default: return <FiInfo className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="View notifications"
      >
        <FiBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-danger border-2 border-slate-100"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white/50">
              <h3 className="font-bold text-slate-800">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-xs font-semibold text-primary hover:text-blue-700 transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>
            
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex gap-3 px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors cursor-pointer ${!notification.read ? 'bg-slate-50/50' : ''}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                          {notification.message}
                        </p>
                        <span className="text-xs text-slate-400 font-medium">{notification.time}</span>
                      </div>
                      {!notification.read && (
                        <div className="shrink-0 self-center ml-auto">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  No notifications to show.
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 text-center">
              <button className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
