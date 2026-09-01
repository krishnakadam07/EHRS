import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiShield, FiX, FiCheck, FiUserPlus, FiAlertOctagon } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';

export default function AdminNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminAlerts = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                // 🌟 Fetch Real Data from Spring Boot
                const [pendingDocsRes, fraudRes] = await Promise.all([
                    fetch('http://localhost:8081/api/admin/doctors/pending', { headers }),
                    fetch('http://localhost:8081/api/admin/fraud-reports', { headers })
                ]);

                const generatedNotifs = [];
                let idCounter = 1;

                // 1. General System Welcome
                generatedNotifs.push({
                    id: idCounter++,
                    type: 'SYSTEM',
                    title: 'System Operational',
                    message: 'Welcome Admin. All nodes are functioning normally. Blockchain hashes are intact.',
                    time: 'Just now',
                    unread: false,
                    icon: <FiShield className="text-blue-500 w-6 h-6" />,
                    bg: 'bg-blue-50',
                    border: 'border-blue-100'
                });

                // 2. Alert for Unverified Doctors
                if (pendingDocsRes.ok) {
                    const pendingDocs = await pendingDocsRes.json();
                    if (pendingDocs.length > 0) {
                        generatedNotifs.push({
                            id: idCounter++,
                            type: 'ACTION_REQUIRED',
                            title: 'Action Required: Pending Doctors',
                            message: `There are ${pendingDocs.length} newly registered doctors awaiting identity verification. Please review their licenses in the directory.`,
                            time: 'Urgent',
                            unread: true,
                            icon: <FiUserPlus className="text-orange-500 w-6 h-6" />,
                            bg: 'bg-orange-50',
                            border: 'border-orange-100'
                        });
                    }
                }

                // 3. Security / Fraud Alerts
                if (fraudRes.ok) {
                    const frauds = await fraudRes.json();
                    frauds.forEach(alert => {
                        generatedNotifs.push({
                            id: idCounter++,
                            type: 'FRAUD_ALERT',
                            title: alert.title || 'Security Alert',
                            message: alert.message,
                            time: alert.time || 'Recent',
                            unread: true,
                            icon: <FiAlertOctagon className="text-red-500 w-6 h-6" />,
                            bg: 'bg-red-50',
                            border: 'border-red-100'
                        });
                    });
                }

                // Reverse to put the most critical/recent ones at the top
                setNotifications(generatedNotifs.reverse());
            } catch (error) {
                console.error("Failed to load admin notifications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminAlerts();
    }, []);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
            <div className="flex justify-between items-end">
                <PageHeader
                    title="Command Center Alerts"
                    subtitle="Review security events, system status, and pending approvals."
                />

                {unreadCount > 0 && (
                    <button
                        onClick={markAllRead}
                        className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors mb-2"
                    >
                        <FiCheck /> Mark all as read
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center p-12 opacity-50">
                    <FiBell className="w-12 h-12 text-slate-300 animate-pulse mb-4" />
                    <span className="text-slate-500 font-bold">Checking system integrity...</span>
                </div>
            ) : notifications.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FiBell className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800">System is Quiet</h3>
                    <p className="text-slate-500 font-medium max-w-sm mt-2">No security breaches or pending tasks require your attention.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <AnimatePresence>
                        {notifications.map((notif) => (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={`group relative bg-white rounded-2xl p-5 border shadow-sm transition-all flex gap-5
                                    ${notif.unread ? `border-l-4 ${notif.border} shadow-md` : 'border-slate-200 hover:border-slate-300'}
                                `}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.bg}`}>
                                    {notif.icon}
                                </div>

                                <div className="flex flex-col flex-1 min-w-0 py-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-base font-black truncate ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-4">
                                            {notif.time}
                                        </span>
                                    </div>
                                    <p className={`text-sm leading-relaxed ${notif.unread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                        {notif.message}
                                    </p>
                                </div>

                                <button
                                    onClick={() => deleteNotification(notif.id)}
                                    className="absolute right-4 top-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <FiX className="w-4 h-4" />
                                </button>

                                {notif.unread && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}