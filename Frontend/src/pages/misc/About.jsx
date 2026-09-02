import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiShield, FiLink, FiArrowRight } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';

export default function About() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const rotateIcon = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden relative">

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none mix-blend-multiply opacity-30" />

        {/* Interactive Navbar */}
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm"
        >
          <motion.button
              whileHover={{ x: -5, color: '#0ea5e9' }}
              onClick={() => navigate(ROUTES.PUBLIC.HOME)}
              className="flex items-center gap-2 text-slate-500 font-bold transition-colors"
          >
            <FiArrowLeft /> Back to Home
          </motion.button>
          <motion.div whileHover={{ scale: 1.05 }} className="font-black text-slate-800 text-xl tracking-tight cursor-default">
            EHRS<span className="text-primary">.</span>
          </motion.div>
        </motion.nav>

        <main className="flex-1 max-w-5xl mx-auto px-6 py-16 flex flex-col gap-12 w-full relative">

          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="text-center relative z-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 text-white shadow-xl shadow-primary/20 mb-6">
              <FiHeart className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight mb-6">About the Platform</h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
              The Emergency Health Record System (EHRS) was built to solve a critical flaw in modern healthcare: the fragmentation of patient data during emergencies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <InfoCard
                delay={0.2}
                icon={<FiActivity />}
                title="The Mission"
                color="text-primary"
                bg="bg-sky-50"
                glow="hover:shadow-primary/20 hover:border-primary/30"
                desc="To ensure that no patient suffers from a preventable medical error due to a lack of context. By centralizing core health data into a single, scannable QR token, we empower first responders to act with absolute certainty."
            />

            <InfoCard
                delay={0.3}
                icon={<FiShield />}
                title="Zero Compromise Security"
                color="text-emerald-500"
                bg="bg-emerald-50"
                glow="hover:shadow-emerald-500/20 hover:border-emerald-500/30"
                desc="Medical data is highly sensitive. EHRS utilizes a cryptographic ledger to log every single interaction. Doctors must be physically verified by administrators before they can access the network."
            />
          </div>

          {/* Call to Action Banner */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center text-white mt-12 shadow-2xl relative overflow-hidden group cursor-default transition-transform duration-500"
          >
            <motion.div
                style={{ rotate: rotateIcon }}
                className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            >
              <FiLink className="w-64 h-64" />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">Join the Network</h2>
            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
              Whether you are a patient looking to secure your medical identity, or a verified physician looking to integrate with the EHRS platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl shadow-primary/30 flex items-center justify-center gap-2" onClick={() => navigate(ROUTES.AUTH.REGISTER)}>
                  Patient Registration <FiArrowRight />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 text-lg px-8 py-4">
                  Doctor Application
                </Button>
              </motion.div>
            </div>
          </motion.div>

        </main>
      </div>
  );
}

// Need to import FiActivity for the InfoCard since I swapped FiHeart for it
import { FiActivity } from 'react-icons/fi';

function InfoCard({ icon, title, desc, delay, color, bg, glow }) {
  return (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, type: "spring", stiffness: 100 }}
          whileHover={{ y: -5 }}
          className={`bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm transition-all duration-300 ${glow} relative overflow-hidden group`}
      >
        <div className={`absolute -right-10 -top-10 w-40 h-40 ${bg} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

        <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
          {React.cloneElement(icon, { className: 'w-7 h-7' })}
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed text-lg">
          {desc}
        </p>
      </motion.div>
  );
}
