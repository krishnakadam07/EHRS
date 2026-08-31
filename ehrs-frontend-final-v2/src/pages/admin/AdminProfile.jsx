import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiShield, FiMail, FiLock, FiSettings, FiBell, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';

export default function AdminProfile() {
    const { currentUser } = useAuth();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock handler for updating password/settings
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-5xl mx-auto">
            <PageHeader
                title="Admin Profile"
                subtitle="Manage your master account settings and system preferences."
            />

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">

                {/* Left Column: Identity & Badges */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:col-span-1">
                    <Card className="overflow-hidden relative border-none shadow-lg bg-slate-900 text-white">
                        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                            <FiShield className="w-48 h-48" />
                        </div>

                        <Card.Body className="relative z-10 flex flex-col items-center text-center p-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-4 border-4 border-slate-800">
                                <FiUser className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-2xl font-black mb-1">System Admin</h2>
                            <p className="text-emerald-400 font-bold text-sm mb-6 flex items-center gap-1.5">
                                <FiCheckCircle /> Master Clearance
                            </p>

                            <div className="w-full bg-slate-800 rounded-xl p-4 flex flex-col gap-3 text-left">
                                <div className="flex items-center gap-3 text-slate-300 text-sm">
                                    <FiMail className="text-slate-500 w-5 h-5" />
                                    <span className="truncate">{currentUser?.email || 'admin@ehrs.com'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300 text-sm">
                                    <FiShield className="text-slate-500 w-5 h-5" />
                                    <span>Role: {currentUser?.role?.toUpperCase() || 'ADMIN'}</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>

                {/* Right Column: Settings Forms */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:col-span-2">

                    <Card>
                        <Card.Header>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FiLock className="text-primary" /> Security Settings
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Confirm New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-2 gap-4">
                                    {showSuccess && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                            className="text-emerald-500 text-sm font-bold flex items-center gap-1"
                                        >
                                            <FiCheckCircle /> Updated Successfully
                                        </motion.span>
                                    )}
                                    <Button type="submit" variant="primary" isLoading={isUpdating}>
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FiSettings className="text-primary" /> System Preferences
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex flex-col divide-y divide-slate-100">
                                <PreferenceToggle
                                    icon={<FiBell />}
                                    title="Security Alerts"
                                    description="Receive email notifications for failed doctor verifications and critical system events."
                                    defaultChecked={true}
                                />
                                <PreferenceToggle
                                    icon={<FiMail />}
                                    title="Weekly Reports"
                                    description="Automatically generate and email weekly network activity reports."
                                    defaultChecked={false}
                                />
                            </div>
                        </Card.Body>
                    </Card>

                </motion.div>
            </motion.div>
        </div>
    );
}

// Helper Component for the toggles
function PreferenceToggle({ icon, title, description, defaultChecked }) {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div className="flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <h4 className="font-bold text-slate-800">{title}</h4>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed max-w-md">{description}</p>
                </div>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 mt-2 ${checked ? 'bg-primary' : 'bg-slate-200'}`}
            >
                <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
            </button>
        </div>
    );
}