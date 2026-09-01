import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';
import Footer from '../../components/layout/Footer';

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden relative selection:bg-primary/30">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none" />
      
      {/* Interactive Navbar */}
      <motion.nav 
         initial={{ y: -50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className="w-full border-b border-white/50 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-xl z-50 shadow-sm"
      >
        <motion.button 
          whileHover={{ x: -5, color: '#0ea5e9' }}
          onClick={() => navigate(ROUTES.PUBLIC.HOME)} 
          className="flex items-center gap-2 text-slate-500 font-bold transition-colors"
        >
          <FiArrowLeft /> Back to Home
        </motion.button>
        <motion.div whileHover={{ scale: 1.05 }} className="font-black text-slate-800 text-xl tracking-tight cursor-default">
           Emergency Health Record System<span className="text-primary">.</span>
        </motion.div>
      </motion.nav>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 md:py-24 w-full relative z-10">
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ type: "spring", bounce: 0.4 }}
            className="text-center mb-20"
         >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 shadow-inner relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/40 blur-md scale-150 rotate-45 group-hover:translate-x-full transition-transform duration-700"></div>
               <FiMail className="w-10 h-10 relative z-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
               Have questions about integration, security audits, or account recovery? Our support team is available 24/7.
            </p>
         </motion.div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-32">
            
            {/* Contact Info column */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ delay: 0.2, type: "spring" }}
               className="lg:col-span-1 flex flex-col gap-6 relative"
            >
               {/* Background Glow for left column */}
               <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-300/30 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none" />
               
               <ContactMethod icon={<FiMail />} title="Email Support" value="support@ehrs.network" delay={0.3} color="from-sky-50 to-white text-sky-500" />
               <ContactMethod icon={<FiPhone />} title="Emergency Line" value="+1 (800) 555-EHRS" delay={0.4} color="from-orange-50 to-white text-orange-500" />
               <ContactMethod icon={<FiMapPin />} title="Headquarters" value="123 Security Blvd, Tech District" delay={0.5} color="from-emerald-50 to-white text-emerald-500" />
            </motion.div>

            {/* Interactive Form - Glassmorphic */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ delay: 0.3, type: "spring" }}
               className="lg:col-span-2 relative group"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-400/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
               
               <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-14 border border-white shadow-2xl shadow-slate-200/50 relative overflow-hidden h-full">
                  
                  {/* Decorative Elements inside form */}
                  <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                  <h3 className="text-3xl font-black text-slate-800 mb-2 relative z-10">Send a Message</h3>
                  <p className="text-slate-500 font-medium mb-10 relative z-10">We'll get back to you within 2 hours.</p>
                  
                  <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FloatingInput label="First Name" />
                        <FloatingInput label="Last Name" />
                     </div>
                     <FloatingInput label="Email Address" type="email" />
                     
                     <div className="relative group/textarea">
                        <motion.textarea
                           whileFocus={{ scale: 1.01 }}
                           rows="5"
                           id="message"
                           required
                           className="w-full bg-white/50 border-2 border-slate-200 rounded-2xl px-6 pt-8 pb-4 text-slate-800 outline-none transition-all resize-none font-medium peer focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
                        ></motion.textarea>
                        <label 
                           htmlFor="message" 
                           className="absolute left-6 top-6 text-slate-400 font-bold tracking-wide transition-all duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:font-black peer-focus:uppercase peer-valid:top-3 peer-valid:text-xs peer-valid:font-black peer-valid:uppercase peer-valid:text-slate-400 pointer-events-none"
                        >
                           How can we help you?
                        </label>
                     </div>
                     
                     <div className="mt-6 flex justify-end">
                        <AnimatePresence mode="wait">
                           {isSubmitted ? (
                              <motion.div 
                                 key="success"
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.8 }}
                                 className="flex items-center gap-3 text-emerald-600 font-bold bg-emerald-50 px-8 py-4 rounded-2xl border border-emerald-200 shadow-sm"
                              >
                                 <FiCheckCircle className="w-6 h-6" /> Message Sent Successfully!
                              </motion.div>
                           ) : (
                              <motion.div key="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                                 <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto px-10 py-5 shadow-xl shadow-primary/30 flex items-center justify-center gap-3 group/btn text-lg">
                                    Send Message <FiSend className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                 </Button>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </form>
               </div>
            </motion.div>
         </div>

         {/* Interactive FAQ Section */}
         <section className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-100 text-sky-500 mb-6">
                  <FiHelpCircle className="w-8 h-8" />
               </div>
               <h2 className="text-4xl font-black text-slate-800 tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="flex flex-col gap-4">
               <FAQItem 
                  question="How is my medical data secured?" 
                  answer="We use SHA-256 cryptographic hashing to encrypt your data both in transit and at rest. Your profile can only be accessed by verified medical personnel or via your unique QR token."
               />
               <FAQItem 
                  question="Can I revoke access if I lose my QR card?" 
                  answer="Yes. You can instantly revoke all active QR tokens directly from your Patient Dashboard. This will immediately render any lost cards useless to scanners."
               />
               <FAQItem 
                  question="How long does it take for a hospital to integrate?" 
                  answer="Integration via our REST APIs typically takes less than 48 hours. Our development team provides full white-glove onboarding for hospital IT departments."
               />
               <FAQItem 
                  question="Is this service free for patients?" 
                  answer="Yes, creating a basic EHRS profile and generating a digital medical ID is completely free for patients. Hospitals pay for API access."
               />
            </div>
         </section>

      </main>
      <Footer />
    </div>
  );
}

// Subcomponents

function FloatingInput({ label, type = 'text' }) {
   return (
      <div className="relative group/input">
         <motion.input
            whileFocus={{ scale: 1.01 }}
            type={type}
            required
            className="w-full bg-white/50 border-2 border-slate-200 rounded-2xl px-6 pt-8 pb-4 text-slate-800 outline-none transition-all font-medium peer focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
         />
         <label className="absolute left-6 top-6 text-slate-400 font-bold tracking-wide transition-all duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:font-black peer-focus:uppercase peer-valid:top-3 peer-valid:text-xs peer-valid:font-black peer-valid:uppercase peer-valid:text-slate-400 pointer-events-none">
            {label}
         </label>
      </div>
   );
}

function ContactMethod({ icon, title, value, delay, color }) {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay, type: "spring" }}
         whileHover={{ scale: 1.02 }}
         className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-start gap-6 transition-all duration-300 group hover:shadow-xl hover:border-slate-300"
      >
         <div className={`w-16 h-16 bg-gradient-to-tr ${color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
            {React.cloneElement(icon, { className: 'w-8 h-8' })}
         </div>
         <div className="flex flex-col gap-2">
            <h4 className="font-black text-slate-800 text-xl">{title}</h4>
            <span className="text-slate-500 font-medium text-lg">{value}</span>
         </div>
      </motion.div>
   );
}

function FAQItem({ question, answer }) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <motion.div 
         className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
         initial={false}
         animate={{ backgroundColor: isOpen ? '#f8fafc' : '#ffffff' }}
      >
         <button 
            className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            onClick={() => setIsOpen(!isOpen)}
         >
            <span className="text-lg md:text-xl font-black text-slate-800 tracking-tight">{question}</span>
            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
               <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                  {isOpen ? <FiMinus className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
               </motion.div>
            </div>
         </button>
         <AnimatePresence initial={false}>
            {isOpen && (
               <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                     open: { opacity: 1, height: "auto" },
                     collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
               >
                  <div className="px-6 md:px-8 pb-8 pt-0 text-slate-500 font-medium leading-relaxed text-lg">
                     {answer}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}
