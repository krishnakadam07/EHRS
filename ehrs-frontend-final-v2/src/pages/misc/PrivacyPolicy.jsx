import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiShield } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    // Scroll to top when the page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/30">

            {/* Decorative Background Pattern */}
            <div className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none" />

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

                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-slate-200 pb-10">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                        <FiShield className="w-8 h-8" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Last Updated: April 2024</p>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed"
                >
                    <p className="text-xl text-slate-500 mb-8">
                        Your privacy and the security of your medical records are our highest priority. This Privacy Policy outlines exactly how your data is collected, secured, and utilized during medical emergencies.
                    </p>

                    <h2 className="text-2xl font-black text-slate-800 mt-10 mb-4">1. Data We Collect</h2>
                    <p>
                        When you register for EHRS, we collect basic identifiable information (Name, Email, Date of Birth). Once logged in, you may optionally provide highly sensitive <strong>Protected Health Information (PHI)</strong>, including blood types, chronic illnesses, active medications, and severe allergies.
                    </p>

                    <h2 className="text-2xl font-black text-slate-800 mt-10 mb-4">2. How We Use Your Data</h2>
                    <p>
                        The PHI you provide is used strictly for emergency triage purposes. It is cryptographically linked to your unique QR token. When you enter an emergency room and a verified medical professional scans your token, your data is decrypted and presented to them to prevent fatal medical errors (such as drug interactions).
                    </p>

                    <h2 className="text-2xl font-black text-slate-800 mt-10 mb-4">3. Data Sharing and Third Parties</h2>
                    <p>
                        <strong>We do not sell, rent, or monetize your medical data.</strong> Your data is never shared with third-party advertisers or marketing firms. Data is only transmitted to authorized Hospital API endpoints at the exact moment your QR token is physically scanned by a verified doctor.
                    </p>

                    <h2 className="text-2xl font-black text-slate-800 mt-10 mb-4">4. Your Right to Deletion</h2>
                    <p>
                        Under GDPR and HIPAA regulations, you retain full ownership of your data. You may log into your dashboard at any time and click "Delete Account" to permanently erase all your medical records from our databases. Because we do not keep offline backups of deleted PHI, this action is entirely irreversible.
                    </p>

                </motion.div>

            </main>

            <Footer />
        </div>
    );
}