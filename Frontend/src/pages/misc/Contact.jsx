import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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

        <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full relative">

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
              className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm">
              <FiMail className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about integration, security audits, or account recovery? Our support team is available 24/7.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact Info column */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="lg:col-span-1 flex flex-col gap-6"
            >
              <ContactMethod icon={<FiMail />} title="Email Support" value="support@ehrs.network" delay={0.3} />
              <ContactMethod icon={<FiPhone />} title="Emergency Line" value="+1 (800) 555-EHRS" delay={0.4} />
              <ContactMethod icon={<FiMapPin />} title="Headquarters" value="123 Security Blvd, Tech District" delay={0.5} />
            </motion.div>

            {/* Interactive Form */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden"
            >
              {/* Form background decorative blob */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-3xl font-black text-slate-800 mb-8">Send a Message</h3>

              <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InteractiveInput label="First Name" placeholder="Jane" />
                  <InteractiveInput label="Last Name" placeholder="Doe" />
                </div>
                <InteractiveInput label="Email Address" type="email" placeholder="jane.doe@example.com" />

                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 text-xs font-black uppercase tracking-widest pl-1">Message</label>
                  <motion.textarea
                      whileFocus={{ scale: 1.01, borderColor: '#0ea5e9', boxShadow: '0 0 0 4px rgba(14,165,233,0.1)' }}
                      rows="5"
                      placeholder="How can we help you?"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 outline-none transition-all resize-none font-medium placeholder:text-slate-400"
                  ></motion.textarea>
                </div>

                <div className="mt-4 flex justify-end">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-6 py-3.5 rounded-xl border border-emerald-200"
                        >
                          <FiCheckCircle className="w-5 h-5" /> Message Sent Successfully!
                        </motion.div>
                    ) : (
                        <motion.div key="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button type="submit" variant="primary" size="lg" className="px-8 shadow-lg shadow-primary/30 flex items-center gap-2 group">
                            Send Message <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </Button>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>

          </div>
        </main>
      </div>
  );
}

function InteractiveInput({ label, type = 'text', placeholder }) {
  return (
      <div className="flex flex-col gap-2">
        <label className="text-slate-700 text-xs font-black uppercase tracking-widest pl-1">{label}</label>
        <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#0ea5e9', boxShadow: '0 0 0 4px rgba(14,165,233,0.1)' }}
            type={type}
            placeholder={placeholder}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 outline-none transition-all font-medium placeholder:text-slate-400"
        />
      </div>
  );
}

function ContactMethod({ icon, title, value, delay }) {
  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, type: "spring" }}
          whileHover={{ x: 10, backgroundColor: '#f8fafc' }}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-5 cursor-default transition-colors group"
      >
        <div className="w-14 h-14 bg-sky-50 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-black text-slate-800 text-lg">{title}</h4>
          <span className="text-slate-500 font-medium">{value}</span>
        </div>
      </motion.div>
  );
}
