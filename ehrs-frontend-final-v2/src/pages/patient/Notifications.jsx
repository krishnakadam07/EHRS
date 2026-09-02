import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiInfo, FiAlertTriangle, FiFileText } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';
import PageHeader from '../../components/common/PageHeader';

export default function Notifications() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.email) {
      patientService.getNotifications(currentUser.email)
        .then(data => { setNotifications(data); setLoading(false); })
        .catch(err => { console.error("Failed to load notifications", err); setLoading(false); });
    }
  }, [currentUser]);

  const markAsRead = (id) => {
    patientService.markNotificationRead(id).then(() => {
      setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
    });
  };

  const deleteNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));

  if (loading) return <div className="text-center mt-20 text-slate-500 font-bold">Loading Notifications...</div>;

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Notifications" subtitle="Stay updated on your health records and system alerts." />
      </div>
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div className="bg-slate-50 border border-slate-200 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mb-4"><FiBell className="w-8 h-8" /></div>
              <h3 className="text-xl font-black text-slate-800">All Caught Up!</h3>
              <p className="text-slate-500 font-medium mt-1">You have no new notifications.</p>
            </motion.div>
          ) : (
            notifications.map((notif, idx) => <NotificationCard key={notif.id} notification={notif} index={idx} onRead={() => markAsRead(notif.id)} onDelete={() => deleteNotification(notif.id)} />)
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NotificationCard({ notification, index, onRead, onDelete }) {
  const type = notification.type?.toLowerCase() || 'info';
  const getIcon = () => { if (type === 'alert') return <FiAlertTriangle className="w-6 h-6" />; if (type === 'system') return <FiFileText className="w-6 h-6" />; return <FiInfo className="w-6 h-6" />; };
  const getColorClass = () => { if (type === 'alert') return 'bg-red-50 text-red-500'; if (type === 'system') return 'bg-blue-50 text-blue-500'; return 'bg-slate-100 text-slate-500'; };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`relative p-5 sm:p-6 rounded-[24px] border transition-all duration-300 shadow-sm group flex flex-col sm:flex-row gap-4 sm:items-center overflow-hidden ${notification.unread ? 'bg-white border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
      {notification.unread && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />}
      <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 ${getColorClass()}`}>{getIcon()}</div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className={`text-base sm:text-lg font-black leading-tight ${notification.unread ? 'text-slate-800' : 'text-slate-600'}`}>{notification.title}</h3>
          <span className="text-[10px] font-black uppercase text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shrink-0">{notification.date}</span>
        </div>
        <p className={`text-sm mt-1 font-medium ${notification.unread ? 'text-slate-600' : 'text-slate-500'}`}>{notification.message}</p>
      </div>
      <div className="flex gap-2 shrink-0 self-end sm:self-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {notification.unread && <button onClick={onRead} className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" title="Mark as read"><FiCheck className="w-5 h-5" /></button>}
      </div>
    </motion.div>
  );
}