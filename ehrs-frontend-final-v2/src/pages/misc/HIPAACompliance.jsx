import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function HIPAACompliance() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full border-b border-white/50 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-xl z-50 shadow-sm">
                <button onClick={() => navigate(ROUTES.PUBLIC.HOME)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors"><FiArrowLeft /> Back</button>
                <div className="font-black text-slate-800 text-xl tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-sky-400 rounded-lg flex items-center justify-center text-white"><FiActivity className="w-4 h-4" /></div>EHRS<span className="text-primary">.</span>
                </div>
            </motion.nav>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full relative z-10">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-slate-200 pb-10">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6"><FiCheckCircle className="w-8 h-8" /></div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4">HIPAA Compliance</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Last Updated: April 2024</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                    <h2>Our Commitment to Privacy</h2>
                    <p>The Health Insurance Portability and Accountability Act (HIPAA) sets the national standard for sensitive patient data protection. At EHRS, regulatory compliance is engineered into the very core of our architecture.</p>

                    <h2>Technical Safeguards</h2>
                    <p>All Protected Health Information (PHI) is isolated, encrypted, and strictly governed by Role-Based Access Control (RBAC). We enforce AES-256 encryption for data at rest, and all API transmissions utilize TLS 1.3.</p>

                    <h2>Audit Controls</h2>
                    <p>To comply with HIPAA's audit requirements, EHRS maintains an immutable ledger of all data access events. When a medical professional scans a patient's QR code, the time, location, and identity of the scanner are permanently recorded and made visible to the patient.</p>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}