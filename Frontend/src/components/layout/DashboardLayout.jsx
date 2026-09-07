import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import Loader from '../common/Loader';

export default function DashboardLayout() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (loading) {
        return <Loader fullScreen size="lg" />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Determine background topic based on URL path
    const getTopicBackground = () => {
        const path = location.pathname;
        if (path.includes('/admin')) return 'from-slate-200/50 via-slate-50 to-slate-100'; // Admin: Authoritative Slate
        if (path.includes('/doctor')) return 'from-emerald-100/40 via-slate-50 to-teal-50'; // Doctor: Clinical Teal
        if (path.includes('/emergency')) return 'from-red-100/40 via-red-50/20 to-slate-50'; // Emergency: Critical Red
        return 'from-sky-100/40 via-slate-50 to-slate-50'; // Default/Patient: Trustworthy Blue
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden relative">
            {/* Dynamic Background Mesh Gradient based on Topic */}
            <div className={`absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${getTopicBackground()} transition-colors duration-1000 pointer-events-none opacity-80`} />

            {/* Premium Vercel/Linear Dot Pattern overlay */}
            <div className="absolute inset-0 z-0 bg-dots-pattern pointer-events-none mix-blend-multiply opacity-50" />

            <Sidebar isOpen={isSidebarOpen} />

            <MobileNavigation
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col h-full relative z-10 w-full min-w-0">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    onMobileMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
