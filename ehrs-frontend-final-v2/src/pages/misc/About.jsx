import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiShield, FiLink, FiArrowRight, FiActivity, FiUsers, FiClock, FiGlobe } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';
import Footer from '../../components/layout/Footer';

export default function About() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const rotateIcon = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden relative selection:bg-primary/30">
      
      {/* Scroll Progress Bar */}
      <motion.div 
         style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald-400 z-[60]"
      />

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

      {/* Hero Section */}
      <main className="flex-1 flex flex-col relative z-10 w-full">
         
         <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Blob */}
            <motion.div 
               style={{ y: yBg }}
               className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-200/40 rounded-full blur-[120px] mix-blend-multiply -z-10 pointer-events-none" 
            />

            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               transition={{ type: "spring", bounce: 0.4 }}
               className="max-w-4xl"
            >
               <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-emerald-400 text-white shadow-2xl shadow-primary/30 mb-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 blur-md scale-150 rotate-45 group-hover:translate-x-full transition-transform duration-700"></div>
                  <FiHeart className="w-10 h-10 relative z-10" />
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter mb-8 leading-[1.1]">
                  Building the Future of <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Emergency Care</span>
               </h1>
               <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium mx-auto max-w-3xl">
                  The Emergency Health Record System (EHRS) was built to solve a critical flaw in modern healthcare: the dangerous fragmentation of patient data when seconds matter most.
               </p>
            </motion.div>
         </section>

         {/* Core Values (Bento Grid) */}
         <section className="py-24 bg-white border-y border-slate-200/50 shadow-soft relative z-20">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16">
                  <span className="text-emerald-500 font-black tracking-widest uppercase text-sm mb-4 block">Our Principles</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Core Values</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Large Card spanning 2 cols */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group shadow-2xl shadow-slate-900/20"
                  >
                     <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <FiShield className="text-primary w-12 h-12 mb-6 relative z-10" />
                     <h3 className="text-3xl font-black text-white mb-4 relative z-10">Zero Compromise Privacy</h3>
                     <p className="text-lg text-slate-300 font-medium max-w-xl relative z-10">
                        Medical data is highly sensitive. We utilize state-of-the-art cryptographic hashing to ensure your data is tamper-proof. Access is exclusively granted to cryptographically verified medical professionals.
                     </p>
                  </motion.div>

                  {/* Standard Card */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="bg-emerald-50 rounded-[2.5rem] p-10 border border-emerald-100 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                     <FiActivity className="text-emerald-500 w-10 h-10 mb-6 relative z-10" />
                     <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10">Speed Saves Lives</h3>
                     <p className="text-slate-600 font-medium relative z-10">Optimized for paramedics. Scanning a QR instantly decodes critical allergies and blood type within 2.4 seconds globally.</p>
                  </motion.div>

                  {/* Standard Card */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                     className="bg-sky-50 rounded-[2.5rem] p-10 border border-sky-100 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                     <FiGlobe className="text-sky-500 w-10 h-10 mb-6 relative z-10" />
                     <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10">Interoperability</h3>
                     <p className="text-slate-600 font-medium relative z-10">Break down hospital silos. EHRS acts as the universal layer allowing disparate hospital systems to read the same patient token.</p>
                  </motion.div>

                  {/* Large Card spanning 2 cols */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.3 }}
                     className="md:col-span-2 bg-orange-50 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group border border-orange-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                  >
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjQ5LCAxMTUsIDIyLCAwLjA1KSIvPjwvc3ZnPg==')] opacity-60"></div>
                     <FiUsers className="text-orange-500 w-12 h-12 mb-6 relative z-10" />
                     <h3 className="text-3xl font-black text-slate-800 mb-4 relative z-10">Empowering the Patient</h3>
                     <p className="text-lg text-slate-600 font-medium max-w-xl relative z-10">
                        You own your data. You decide who can view it, and you have the power to instantly revoke access from any practitioner via your dashboard. Absolute transparency.
                     </p>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Timeline Section */}
         <section className="py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">The Journey</h2>
               </div>
               
               <div className="flex flex-col gap-12 relative border-l-2 border-slate-200 ml-4 md:ml-8">
                  <TimelineItem 
                     year="2024"
                     title="The Foundation"
                     desc="EHRS was conceptualized after analyzing critical failure points in ambulance dispatch protocols across 3 major metropolitan areas."
                     color="bg-slate-300"
                  />
                  <TimelineItem 
                     year="2025"
                     title="Beta Network Launch"
                     desc="Successfully piloted the QR infrastructure in 10 trauma centers, achieving a 99.9% scan success rate and reducing patient intake time by 12 minutes."
                     color="bg-sky-400"
                  />
                  <TimelineItem 
                     year="2026"
                     title="National Rollout"
                     desc="Expanded across borders, integrating with major healthcare APIs and rolling out the consumer patient portal."
                     color="bg-primary"
                  />
                  <TimelineItem 
                     year="Future"
                     title="Decentralized Autonomous Records"
                     desc="Moving towards a fully decentralized blockchain architecture to completely eliminate single points of failure."
                     color="bg-emerald-500"
                     isLast
                  />
               </div>
            </div>
         </section>

         {/* Call to Action Banner */}
         <section className="pb-24 px-6 relative z-20">
            <div className="max-w-5xl mx-auto">
               <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden group cursor-default transition-transform duration-500"
               >
                  <motion.div 
                     style={{ rotate: rotateIcon }}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 opacity-[0.03] pointer-events-none"
                  >
                     <FiLink className="w-[800px] h-[800px]" />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">Join the Network</h2>
                  <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
                     Whether you are a patient looking to secure your medical identity, or a verified physician looking to integrate with the EHRS platform.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 py-5 shadow-xl shadow-primary/30 flex items-center justify-center gap-2" onClick={() => navigate(ROUTES.AUTH.REGISTER)}>
                           Patient Registration <FiArrowRight />
                        </Button>
                     </motion.div>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-5 flex items-center justify-center">
                           Doctor Application
                        </Button>
                     </motion.div>
                  </div>
               </motion.div>
            </div>
         </section>

      </main>
      <Footer />
    </div>
  );
}

function TimelineItem({ year, title, desc, color, isLast }) {
   return (
      <motion.div 
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         className="relative pl-8 md:pl-12 group"
      >
         {/* Dot */}
         <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${color} shadow-lg ring-4 ring-white group-hover:scale-150 transition-transform duration-300 z-10`} />
         
         <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${color} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            <span className={`inline-block px-3 py-1 rounded-full ${color} text-white text-xs font-black tracking-widest uppercase mb-4 shadow-sm`}>
               {year}
            </span>
            <h3 className="text-2xl font-black text-slate-800 mb-3">{title}</h3>
            <p className="text-lg font-medium text-slate-500 leading-relaxed">{desc}</p>
         </div>
      </motion.div>
   );
}
