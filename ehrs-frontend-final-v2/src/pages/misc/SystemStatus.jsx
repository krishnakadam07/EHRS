import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiServer, FiDatabase, FiCpu, FiGlobe, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function SystemStatus() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/30">

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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 bg-emerald-100 text-emerald-600 px-6 py-3 rounded-full font-black text-sm tracking-widest uppercase mb-6 shadow-sm border border-emerald-200">
              <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
                        All Systems Operational
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter mb-4">System Status</h1>
                    <p className="text-slate-500 font-medium">Real-time monitoring of the EHRS microservices.</p>
                </motion.div>

                {/* Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <StatusCard icon={<FiGlobe />} title="API Gateway" uptime="99.99%" latency="24ms" delay={0.1} />
                    <StatusCard icon={<FiServer />} title="Spring Boot Core" uptime="99.98%" latency="45ms" delay={0.2} />
                    <StatusCard icon={<FiDatabase />} title="MySQL Cluster" uptime="100%" latency="12ms" delay={0.3} />
                    <StatusCard icon={<FiCpu />} title="Gemini AI Engine" uptime="98.50%" latency="1.2s" delay={0.4} />
                </div>

            </main>
            <Footer />
        </div>
    );
}

function StatusCard({ icon, title, uptime, latency, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, type: "spring" }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all"
        >
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:scale-110 transition-transform">
                    {React.cloneElement(icon, { className: 'w-7 h-7 group-hover:text-primary transition-colors' })}
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800 mb-1">{title}</h3>
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                        <span>Uptime: <span className="text-emerald-500">{uptime}</span></span>
                        <span>Ping: {latency}</span>
                    </div>
                </div>
            </div>
            <FiCheckCircle className="w-8 h-8 text-emerald-400" />
        </motion.div>
    );
}