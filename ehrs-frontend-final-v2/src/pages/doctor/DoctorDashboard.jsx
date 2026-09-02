import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMaximize, FiUsers, FiFileText, FiClock, FiActivity, FiEdit3, FiShield, FiCpu } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function DoctorDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // 🌟 REAL-TIME STATE
    const [stats, setStats] = useState({
        scansToday: 0,
        activePatients: 0,
        prescriptions: 0,
        loading: true
    });

    // 🌟 FETCH REAL-TIME DATA FROM SPRING BOOT
    useEffect(() => {
        if (!currentUser?.email) return;

        const fetchRealTimeStats = async () => {
            try {
                // Connect to the DoctorController endpoints we built
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                // Fetch both logs and prescriptions simultaneously for speed
                const [logsRes, rxRes] = await Promise.all([
                    fetch(`http://localhost:8081/api/doctors/access-logs/${currentUser.email}`, { headers }),
                    fetch(`http://localhost:8081/api/doctors/history/${currentUser.email}`, { headers })
                ]);

                const logs = logsRes.ok ? await logsRes.json() : [];
                const prescriptions = rxRes.ok ? await rxRes.json() : [];

                // 1. Calculate Scans Today (matching today's date in the timestamp)
                const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
                const todayScans = logs.filter(log => log.timestamp && log.timestamp.includes(today)).length;

                // 2. Calculate Active Patients (Count unique patient names in the access logs)
                const uniquePatients = new Set(logs.map(log => log.patient).filter(p => p !== 'Unknown')).size;

                setStats({
                    scansToday: todayScans,
                    activePatients: uniquePatients,
                    prescriptions: prescriptions.length,
                    loading: false
                });

            } catch (error) {
                console.error("Failed to fetch real-time dashboard stats:", error);
                setStats(s => ({ ...s, loading: false }));
            }
        };

        fetchRealTimeStats();
    }, [currentUser]);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

    return (
        <div className="flex flex-col gap-6 pb-12">
            <PageHeader title={`Welcome, Dr. ${currentUser?.name?.split(' ')[1] || 'Doctor'}`} subtitle="Manage your patients, scan medical IDs, and review access logs." />

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => navigate(ROUTES.DOCTOR.SCAN_QR)} className="bg-gradient-to-br from-primary to-sky-600 rounded-3xl p-6 flex items-center gap-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-left group">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                            <FiMaximize className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black text-white mb-1">Scan Patient QR</h2>
                            <p className="text-sky-100 font-medium text-sm">Instantly access emergency profiles.</p>
                        </div>
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2">
                        <QuickActionButton icon={<FiEdit3 />} label="Prescribe" onClick={() => navigate(ROUTES.DOCTOR.ADD_PRESCRIPTION)} />
                        <QuickActionButton icon={<FiCpu />} label="AI Triage" onClick={() => navigate(ROUTES.DOCTOR.AI_TRIAGE)} />
                        <QuickActionButton icon={<FiClock />} label="Access Logs" onClick={() => navigate(ROUTES.DOCTOR.LOGS)} />
                    </div>
                </motion.div>

                {/* 🌟 REAL-TIME METRIC CARDS */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricCard
                        title="Total Scans Today"
                        value={stats.loading ? "..." : stats.scansToday}
                        subtitle="Real-time blockchain logs"
                        icon={<FiActivity />} color="text-emerald-500" bgColor="bg-emerald-500/10"
                    />
                    <MetricCard
                        title="Active Patients"
                        value={stats.loading ? "..." : stats.activePatients}
                        subtitle="Unique patients scanned"
                        icon={<FiUsers />} color="text-primary" bgColor="bg-primary/10"
                    />
                    <MetricCard
                        title="Prescriptions Issued"
                        value={stats.loading ? "..." : stats.prescriptions}
                        subtitle="Total secured on record"
                        icon={<FiFileText />} color="text-orange-500" bgColor="bg-orange-500/10"
                    />
                </motion.div>

                {/* Security Notice */}
                <motion.div variants={itemVariants} className="bg-slate-800 rounded-3xl p-6 text-white flex flex-col relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><FiShield className="w-32 h-32" /></div>
                    <div className="relative z-10 flex flex-col gap-2">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2"><FiShield className="w-5 h-5 text-white" /></div>
                        <h3 className="text-lg font-black tracking-wide">Security Notice</h3>
                        <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                            All patient access is cryptographically logged. Ensure you have verbal or emergency consent before scanning a patient's Medical ID.
                        </p>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}

function QuickActionButton({ icon, label, onClick }) {
    return (
        <button onClick={onClick} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {React.cloneElement(icon, { className: 'w-6 h-6' })}
            </div>
            <span className="text-sm font-bold text-slate-700">{label}</span>
        </button>
    );
}

function MetricCard({ title, value, subtitle, icon, color, bgColor }) {
    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-slate-500">{title}</span>
                <div className={`w-12 h-12 rounded-xl ${bgColor} ${color} flex items-center justify-center shrink-0`}>{React.cloneElement(icon, { className: 'w-6 h-6' })}</div>
            </div>
            <div className="flex flex-col mt-2">
                <span className="text-4xl font-black text-slate-800">{value}</span>
                <span className="text-xs font-semibold text-slate-400 mt-1">{subtitle}</span>
            </div>
        </div>
    );
}