import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiUser, FiPlusCircle, FiBookOpen } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function Documentation() {
    const navigate = useNavigate();

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/30">

            {/* 🌟 Decorative Background Pattern */}
            <div className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none" />

            {/* Navbar */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full border-b border-white/50 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-xl z-50 shadow-sm"
            >
                <button onClick={() => navigate(ROUTES.PUBLIC.HOME)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors">
                    <FiArrowLeft /> Back to Home
                </button>
                <div className="font-black text-slate-800 text-xl tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-sky-400 rounded-lg flex items-center justify-center text-white">
                        <FiActivity className="w-4 h-4" />
                    </div>
                    EHRS<span className="text-primary">.</span>
                </div>
            </motion.nav>

            <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full relative z-10">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 flex items-center gap-6">
                    <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner">
                        <FiBookOpen className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-2">Documentation</h1>
                        <p className="text-xl text-slate-500 font-medium">Step-by-step guides for all platform users.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Patient Guide */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                            <FiUser className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-black text-slate-800">For Patients</h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            <GuideStep
                                number="1"
                                title="Account Creation"
                                desc="Sign up using your email. Verify your identity to generate your unique decentralized ID."
                            />
                            <GuideStep
                                number="2"
                                title="Upload Emergency Context"
                                desc="Navigate to the dashboard and input your vital information: blood type, chronic illnesses, and allergies."
                            />
                            <GuideStep
                                number="3"
                                title="Generate QR Token"
                                desc="Click 'Generate ID'. You can save this QR code to your phone's lock screen or print it for your wallet."
                            />
                        </div>
                    </motion.div>

                    {/* Doctor Guide */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                            <FiPlusCircle className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-3xl font-black text-slate-800">For Doctors</h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            <GuideStep
                                number="1"
                                title="Verification & Licensing"
                                desc="Register with your official Hospital ID. An admin must verify your credentials before your account unlocks."
                            />
                            <GuideStep
                                number="2"
                                title="Scanning QR Tokens"
                                desc="Use the 'Scan QR' tab in your portal. Allow camera permissions to instantly decrypt a patient's emergency context."
                            />
                            <GuideStep
                                number="3"
                                title="AI Triage Assistance"
                                desc="Input the patient's real-time vitals alongside their decrypted history into the AI Triage module for immediate medical analysis."
                            />
                        </div>
                    </motion.div>

                </div>

            </main>
            <Footer />
        </div>
    );
}

// Subcomponent separated clearly at the bottom
function GuideStep({ number, title, desc }) {
    return (
        <div className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-white text-slate-500 font-black flex items-center justify-center shrink-0 border-2 border-slate-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                {number}
            </div>
            <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}