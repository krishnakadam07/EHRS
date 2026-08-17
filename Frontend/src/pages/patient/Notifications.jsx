import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiInfo, FiAlertTriangle, FiFileText } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

// Mock Data
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'alert', title: 'Emergency Access Detected', message: 'Your medical profile was accessed by City General Hospital.', time: '10 minutes ago', unread: true },
  { id: 2, type: 'info', title: 'New Lab Report', message: 'Your recent blood test results have been uploaded.', time: '2 hours ago', unread: true },
  { id: 3, type: 'system', title: 'Profile Update Successful', message: 'Your emergency contact information was updated.', time: '1 day ago', unread: false },
  { id: 4, type: 'info', title: 'Appointment Reminder', message: 'You have an upcoming cardiology appointment tomorrow at 10 AM.', time: '2 days ago', unread: false },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
      <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PageHeader
              title="Notifications"
              subtitle="Stay updated on your health records and system alerts."
          />
          {unreadCount > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button variant="outline" onClick={markAllRead}>
                  <FiCheck className="mr-2" /> Mark all as read
                </Button>
              </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {notifications.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 border border-slate-200 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mb-4">
                    <FiBell className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800">All Caught Up!</h3>
                  <p className="text-slate-500 font-medium mt-1">You have no new notifications.</p>
                </motion.div>
            ) : (
                notifications.map((notif, idx) => (
                    <NotificationCard
                        key={notif.id}
                        notification={notif}
                        index={idx}
                        onRead={() => markAsRead(notif.id)}
                        onDelete={() => deleteNotification(notif.id)}
                    />
                ))
            )}
          </AnimatePresence>
        </div>
      </div>
  );
}

function NotificationCard({ notification, index, onRead, onDelete }) {
  const getIcon = () => {
    switch(notification.type) {
      case 'alert': return <FiAlertTriangle className="w-6 h-6" />;
      case 'info': return <FiFileText className="w-6 h-6" />;
      default: return <FiInfo className="w-6 h-6" />;
    }
  };

  const getColorClass = () => {
    switch(notification.type) {
      case 'alert': return 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-red-500/30';
      case 'info': return 'bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-sky-500/30';
      default: return 'bg-slate-100 text-slate-500 group-hover:bg-slate-500 group-hover:text-white group-hover:shadow-slate-500/30';
    }
  };

  return (
      <motion.div
          layout
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.01, x: 4 }}
          className={`
        relative p-5 sm:p-6 rounded-[24px] border transition-all duration-300 shadow-soft group flex flex-col sm:flex-row gap-4 sm:items-center overflow-hidden
        ${notification.unread ? 'bg-white border-primary/20 shadow-primary/5 hover:border-primary/40' : 'bg-slate-50/50 border-slate-200 hover:bg-white'}
      `}
      >
        {/* Unread Indicator Bar */}
        {notification.unread && (
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
        )}

        {/* Icon */}
        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm ${getColorClass()}`}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className={`text-base sm:text-lg font-black leading-tight ${notification.unread ? 'text-slate-800' : 'text-slate-600'}`}>
              {notification.title}
            </h3>
            <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm shrink-0">
            {notification.time}
          </span>
          </div>
          <p className={`text-sm mt-1 font-medium ${notification.unread ? 'text-slate-600' : 'text-slate-500'}`}>
            {notification.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0 self-end sm:self-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          {notification.unread && (
              <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={onRead}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  title="Mark as read"
              >
                <FiCheck className="w-5 h-5" />
              </motion.button>
          )}
        </div>
      </motion.div>
  );
}
