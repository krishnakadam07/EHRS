import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiInfo } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function CookiePolicy() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Navbar */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full border-b border-white/50 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-xl z-50 shadow-sm"
            >
                <button onClick={() => navigate(ROUTES.PUBLIC.HOME)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors">
                    <FiArrowLeft /> Back
                </button>
                <div className="font-black text-slate-800 text-xl tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-sky-400 rounded-lg flex items-center justify-center text-white">
                        <FiActivity className="w-4 h-4" />
                    </div>
                    EHRS<span className="text-primary">.</span>
                </div>
            </motion.nav>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full relative z-10">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-slate-200 pb-10">
                    <div className="w-16 h-16 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                        <FiInfo className="w-8 h-8" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4">Cookie Policy</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Last Updated: April 2024</p>
                </motion.div>

                {/* Content */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                    <h2>1. How We Use Cookies</h2>
                    <p>
                        At EHRS, we believe your medical data is strictly confidential. Because of this, we <strong>do not</strong> use any third-party advertising, marketing, or tracking cookies on our platform.
                    </p>

                    <h2>2. Essential Cookies Only</h2>
                    <p>
                        The only cookies deployed by our system are "Strictly Necessary" cookies. These are used exclusively to securely store your JWT (JSON Web Token) session data. This ensures that you remain securely logged into your Patient or Doctor dashboard without needing to re-authenticate on every single page load.
                    </p>

                    <h2>3. Managing Your Preferences</h2>
                    <p>
                        Because our cookies are strictly necessary for the core security and functionality of the application, they cannot be disabled. If you wish to clear these session tokens, simply click the "Sign Out" button in your dashboard, which will immediately destroy the local tokens.
                    </p>
                </motion.div>

            </main>

            <Footer />
        </div>
    );
}