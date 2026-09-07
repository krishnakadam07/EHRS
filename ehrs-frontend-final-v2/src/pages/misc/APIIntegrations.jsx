import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiCode, FiKey, FiTerminal } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function APIIntegrations() {
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter mb-6">
                        Hospital <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">API</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                        Integrate EHRS directly into your hospital's existing IT infrastructure. Securely fetch emergency patient data in milliseconds.
                    </p>
                </motion.div>

                {/* Auth Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><FiKey className="w-6 h-6" /></div>
                        <h2 className="text-2xl font-black text-slate-800">Authentication</h2>
                    </div>
                    <p className="text-slate-600 font-medium mb-6">All requests must be authenticated using a Bearer token issued to your registered Hospital ID.</p>

                    <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-sky-300 shadow-inner overflow-x-auto">
                        <span className="text-pink-400">Authorization:</span> Bearer eyJhbGciOiJIUzI1NiIsInR5c...
                    </div>
                </motion.div>

                {/* Endpoint Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center"><FiTerminal className="w-6 h-6" /></div>
                        <h2 className="text-2xl font-black text-slate-800">Fetch Patient Emergency Profile</h2>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-emerald-500 text-white font-black px-4 py-1.5 rounded-lg text-sm">GET</span>
                        <code className="text-slate-600 font-bold bg-slate-100 px-4 py-1.5 rounded-lg border border-slate-200">/api/v1/hospital/patient/{"{qr_token}"}</code>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 shadow-inner overflow-x-auto">
              <pre className="font-mono text-sm text-slate-300">
{`{
  "status": "success",
  "data": {
    "patientId": "USR-9942",
    "bloodGroup": "O Negative",
    "allergies": ["Penicillin", "Peanuts"],
    "chronicConditions": ["Asthma"],
    "emergencyContact": {
       "name": "Jane Doe",
       "phone": "+1-555-0198"
    }
  }
}`}
              </pre>
                    </div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}