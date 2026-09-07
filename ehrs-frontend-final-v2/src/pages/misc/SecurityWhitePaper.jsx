import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiShield, FiLock, FiKey, FiEyeOff } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function SecurityWhitePaper() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col font-sans selection:bg-emerald-500/30">

            {/* Dark Mode Background for Security Vibe */}
            <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Navbar */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full border-b border-slate-800 py-4 px-6 flex justify-between items-center sticky top-0 bg-slate-900/80 backdrop-blur-xl z-50 shadow-sm"
            >
                <button onClick={() => navigate(ROUTES.PUBLIC.HOME)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors">
                    <FiArrowLeft /> Back to Home
                </button>
                <div className="font-black text-white text-xl tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-slate-900">
                        <FiActivity className="w-4 h-4" />
                    </div>
                    EHRS<span className="text-emerald-400">.</span>
                </div>
            </motion.nav>

            <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full relative z-10">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-emerald-500/10 text-emerald-400 mb-8 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                        <FiShield className="w-12 h-12" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Whitepaper</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        An in-depth look into the cryptographic protocols, access controls, and data isolation strategies protecting the EHRS network.
                    </p>
                </motion.div>

                {/* Security Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <SecurityCard
                        icon={<FiLock />}
                        title="Data Encryption"
                        desc="All sensitive Personal Health Information (PHI) is encrypted at rest using AES-256 standard and in transit via TLS 1.3 cryptographic protocols."
                        delay={0.1}
                    />
                    <SecurityCard
                        icon={<FiKey />}
                        title="Stateless Authentication"
                        desc="EHRS utilizes JSON Web Tokens (JWT) signed with highly secure asymmetric RSA keys to guarantee token authenticity and prevent session hijacking."
                        delay={0.2}
                    />
                    <SecurityCard
                        icon={<FiEyeOff />}
                        title="Zero-Knowledge Access"
                        desc="Patient profiles remain totally locked until a verified medical professional scans the cryptographic QR token, ensuring zero unauthorized browsing."
                        delay={0.3}
                    />
                    <SecurityCard
                        icon={<FiActivity />}
                        title="Immutable Audit Logs"
                        desc="Every data retrieval action generates a permanent, timestamped access log visible to the patient, ensuring total transparency of medical staff."
                        delay={0.4}
                    />
                </div>

            </main>
            <Footer />
        </div>
    );
}

function SecurityCard({ icon, title, desc, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, type: "spring" }}
            className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group"
        >
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-400 border border-slate-700 mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(icon, { className: 'w-7 h-7' })}
            </div>
            <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
            <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
        </motion.div>
    );
}