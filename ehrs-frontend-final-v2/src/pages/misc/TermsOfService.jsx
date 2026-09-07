import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiFileText } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function TermsOfService() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Navbar */}
            <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full border-b border-white/50 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-xl z-50 shadow-sm">
                <button onClick={() => navigate(ROUTES.PUBLIC.HOME)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors"><FiArrowLeft /> Back</button>
                <div className="font-black text-slate-800 text-xl tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-sky-400 rounded-lg flex items-center justify-center text-white"><FiActivity className="w-4 h-4" /></div>EHRS<span className="text-primary">.</span>
                </div>
            </motion.nav>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full relative z-10">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-slate-200 pb-10">
                    <div className="w-16 h-16 bg-sky-100 text-sky-500 rounded-2xl flex items-center justify-center mb-6"><FiFileText className="w-8 h-8" /></div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4">Terms of Service</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Last Updated: April 2024</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using the Emergency Health Record System (EHRS), you agree to be bound by these terms. This platform provides emergency data delivery to verified medical professionals; it is not a replacement for professional medical diagnosis or 911 services.</p>

                    <h2>2. User Responsibilities</h2>
                    <p>Patients are solely responsible for ensuring the accuracy of the medical data uploaded to their profile. False information regarding blood types, chronic illnesses, or allergies could result in fatal medical errors. EHRS assumes no liability for medical decisions made based on user-provided data.</p>

                    <h2>3. Medical Professional Obligations</h2>
                    <p>Doctors and First Responders utilizing this platform agree to access patient data strictly during medical emergencies. Unauthorized scanning of QR tokens for non-medical purposes will result in immediate termination of your license and potential legal action under HIPAA regulations.</p>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}