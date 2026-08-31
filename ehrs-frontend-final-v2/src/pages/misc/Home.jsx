import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FiShield, FiActivity, FiUsers, FiArrowRight, FiChevronRight, FiCheckCircle, FiStar, FiHeart, FiLock, FiGlobe, FiClock } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';
import Footer from '../../components/layout/Footer';

export default function Home() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden relative selection:bg-primary/30">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none" />
      
      {/* Interactive Navbar */}
      <motion.nav 
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ type: 'spring', stiffness: 120, damping: 20 }}
         className="w-full bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 z-50 shadow-sm"
      >
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <motion.div 
               className="flex items-center gap-3 cursor-pointer group"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate(ROUTES.PUBLIC.HOME)}
            >
               <div className="w-10 h-10 bg-gradient-to-tr from-primary to-sky-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 blur-sm scale-150 rotate-45 group-hover:translate-x-full transition-transform duration-700"></div>
                  <FiActivity className="w-6 h-6 relative z-10" />
               </div>
               <span className="text-xl font-black text-slate-800 tracking-tight">EHRS<span className="text-primary">.</span></span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-600">
               <NavHoverLink to={ROUTES.PUBLIC.ABOUT}>About Platform</NavHoverLink>
               <NavHoverLink to={ROUTES.PUBLIC.CONTACT}>Contact Us</NavHoverLink>
               <div className="w-px h-6 bg-slate-200"></div>
               <NavHoverLink to={ROUTES.AUTH.LOGIN}>Sign In</NavHoverLink>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" onClick={() => navigate(ROUTES.AUTH.REGISTER)} className="shadow-lg shadow-primary/20">Create Account</Button>
               </motion.div>
            </div>
         </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 lg:pt-32 lg:pb-40 relative">
         
         {/* Rich Glassmorphic Background Meshes */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <motion.div 
               style={{ y: yBg }}
               className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply" 
            />
            <motion.div 
               style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }}
               className="absolute top-[30%] right-[10%] w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-[100px] mix-blend-multiply" 
            />
            <motion.div 
               style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '80%']) }}
               className="absolute -bottom-[20%] left-[40%] w-[700px] h-[700px] bg-sky-200/30 rounded-full blur-[120px] mix-blend-multiply" 
            />
         </div>

         <motion.div style={{ opacity: opacityText }} className="flex flex-col items-center relative z-10 w-full max-w-5xl">
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.5, type: 'spring' }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 font-bold text-sm border border-slate-200/50 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
               </span>
               EHRS Network is Online & Secured via SHA-256
            </motion.div>

            <motion.h1 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
               className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-800 tracking-tighter mb-8 leading-[1.1]"
            >
               Your Health Identity, <br className="hidden md:block"/>
               <span className="relative whitespace-nowrap">
                  <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-emerald-400/20 blur-lg rounded-xl"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Instantly Accessible.</span>
               </span>
            </motion.h1>

            <motion.p 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
               className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium max-w-3xl mb-12 leading-relaxed"
            >
               Unify your medical data under a secure cryptographic QR code. Ensure first responders have life-saving context the exact moment they arrive.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
               className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" onClick={() => navigate(ROUTES.AUTH.REGISTER)} className="w-full text-lg px-8 py-4 shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group">
                     Generate Medical ID
                     <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
               </motion.div>
               
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" onClick={() => {
                     document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                  }} className="w-full text-lg px-8 py-4 bg-white/50 backdrop-blur-md border-slate-200 hover:bg-white hover:border-slate-300">
                     See How It Works
                  </Button>
               </motion.div>
            </motion.div>
         </motion.div>
      </main>

      {/* Trust Banner (Marquee) */}
      <section className="border-y border-slate-200/50 bg-white/50 backdrop-blur-sm py-10 overflow-hidden flex flex-col items-center relative z-10">
         <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Trusted by leading healthcare providers</p>
         <div className="flex w-full relative">
            {/* Gradient Fades for Marquee */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
            
            <motion.div 
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 20, ease: "linear", repeat: Infinity }}
               className="flex whitespace-nowrap gap-16 md:gap-32 px-8 items-center"
            >
               {/* Duplicated for seamless loop */}
               {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-400 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                     {logo.icon}
                     <span className="font-black text-xl tracking-tighter">{logo.name}</span>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 md:py-32 relative z-10">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-primary font-black tracking-widest uppercase text-sm mb-4 block"
               >
                  The Process
               </motion.span>
               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight"
               >
                  Ready for Emergencies in 3 Steps
               </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
               {/* Desktop connecting line */}
               <div className="hidden md:block absolute top-24 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary/10 via-emerald-400/30 to-primary/10 -z-10" />
               
               <StepCard 
                  step="01"
                  icon={<FiUsers />}
                  title="Register Profile"
                  desc="Input your critical data: blood type, severe allergies, current medications, and emergency contacts."
                  delay={0}
               />
               <StepCard 
                  step="02"
                  icon={<FiLock />}
                  title="Generate Token"
                  desc="Our system encrypts your data and generates a unique, scannable QR code for your lock screen or physical wallet."
                  delay={0.2}
               />
               <StepCard 
                  step="03"
                  icon={<FiActivity />}
                  title="Instant Access"
                  desc="Paramedics scan the code on arrival, gaining immediate, read-only access to save crucial seconds."
                  delay={0.4}
               />
            </div>
         </div>
      </section>

      {/* Real-time Metrics */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <Metric title="Active Patients" value="5.2M+" />
            <Metric title="Verified Responders" value="12,400+" />
            <Metric title="Data Access Time" value="< 2.4s" />
            <Metric title="Uptime" value="99.99%" />
         </div>
      </section>

      {/* Feature Grid with Scroll Reveal */}
      <section className="bg-white py-24 md:py-32 relative z-20 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Enterprise Grade Infrastructure</h2>
               <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Built to comply with strict healthcare data regulations while maintaining lightning-fast performance.</p>
            </div>
            
            <motion.div 
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-100px" }}
               variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
               }}
               className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
               <FeatureCard 
                  icon={<FiShield />} 
                  title="Cryptographic Security" 
                  desc="Records are encrypted and immutable. Access is audited and granted only to verified medical professionals."
                  color="text-emerald-500"
                  bg="bg-emerald-50"
                  glow="hover:shadow-emerald-500/20"
               />
               <FeatureCard 
                  icon={<FiGlobe />} 
                  title="Cross-Hospital Sync" 
                  desc="Seamless interoperability. Doctors across different networks can instantly read and append data."
                  color="text-primary"
                  bg="bg-sky-50"
                  glow="hover:shadow-primary/20"
               />
               <FeatureCard 
                  icon={<FiClock />} 
                  title="Always Available" 
                  desc="Redundant global servers ensure your medical ID is scannable 24/7, even during regional outages."
                  color="text-orange-500"
                  bg="bg-orange-50"
                  glow="hover:shadow-orange-500/20"
               />
            </motion.div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight text-center mb-16">Stories from the Frontline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <TestimonialCard 
                  quote="The QR scanner saved us at least 5 minutes of probing during a severe allergic reaction. That time is the difference between life and death."
                  name="Paramedic James T."
                  role="Metro City EMT"
               />
               <TestimonialCard 
                  quote="I have a complex medical history. Knowing all my info is instantly available on my phone's lock screen gives me immense peace of mind."
                  name="Sarah Jenkins"
                  role="EHRS Patient"
               />
               <TestimonialCard 
                  quote="Integrating EHRS into our trauma center workflow was seamless. We get accurate patient history before they even reach the operating room."
                  name="Dr. Alan Croft"
                  role="Chief of Surgery"
               />
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white relative z-20">
         <div className="max-w-5xl mx-auto px-6">
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
            >
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-20" />
               <div className="absolute top-0 right-0 p-12 opacity-10">
                  <FiShield className="w-64 h-64 text-white" />
               </div>
               
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Don't wait for an emergency.</h2>
                  <p className="text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
                     Take control of your medical identity today. Registration is free for patients and takes less than 3 minutes.
                  </p>
                  <Button variant="primary" size="lg" onClick={() => navigate(ROUTES.AUTH.REGISTER)} className="text-lg px-10 py-5 shadow-xl shadow-primary/40 hover:shadow-primary/60 transition-shadow">
                     Create Free Account
                  </Button>
               </div>
            </motion.div>
         </div>
      </section>

      <Footer />
    </div>
  );
}

// Subcomponents

const TRUSTED_LOGOS = [
   { name: "Mayo Clinic", icon: <FiHeart className="w-8 h-8" /> },
   { name: "Cleveland Medical", icon: <FiActivity className="w-8 h-8" /> },
   { name: "Johns Hopkins", icon: <FiShield className="w-8 h-8" /> },
   { name: "Mount Sinai", icon: <FiGlobe className="w-8 h-8" /> },
   { name: "Mass General", icon: <FiUsers className="w-8 h-8" /> },
];

function NavHoverLink({ to, children }) {
   const navigate = useNavigate();
   return (
      <motion.button 
         whileHover={{ color: '#0ea5e9' }} 
         onClick={() => navigate(to)} 
         className="relative transition-colors group py-2"
      >
         {children}
         <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </motion.button>
   );
}

function StepCard({ step, icon, title, desc, delay }) {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay, type: "spring" }}
         className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm relative group hover:-translate-y-2 transition-transform duration-300"
      >
         <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-primary to-emerald-400 rounded-2xl text-white font-black text-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-[-10deg] group-hover:rotate-0 transition-transform duration-300">
            {step}
         </div>
         <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
            {React.cloneElement(icon, { className: 'w-8 h-8' })}
         </div>
         <h3 className="text-2xl font-black text-slate-800 mb-4">{title}</h3>
         <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
      </motion.div>
   );
}

function Metric({ title, value }) {
   return (
      <div className="py-8 lg:py-0 flex flex-col items-center justify-center">
         <motion.h4 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter mb-2"
         >
            {value}
         </motion.h4>
         <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{title}</span>
      </div>
   );
}

function TestimonialCard({ quote, name, role }) {
   return (
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         whileHover={{ y: -5 }}
         className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-soft flex flex-col justify-between"
      >
         <div className="flex gap-1 text-orange-400 mb-6">
            <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
         </div>
         <p className="text-lg font-medium text-slate-700 italic mb-8">"{quote}"</p>
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">
               {name.charAt(0)}
            </div>
            <div className="flex flex-col">
               <span className="font-black text-slate-800">{name}</span>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{role}</span>
            </div>
         </div>
      </motion.div>
   );
}

// 3D Tilt Feature Card
function FeatureCard({ icon, title, desc, color, bg, glow }) {
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
   const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

   const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
   };

   const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
   };

   return (
      <motion.div 
         variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: 'spring' } } }}
         style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         whileHover={{ z: 50, y: -10 }}
         className={`group flex flex-col items-start p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-2xl ${glow} cursor-default relative overflow-hidden`}
      >
         <div style={{ transform: "translateZ(30px)" }} className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 translate-x-10 -translate-y-10 ${bg}`} />
         
         <div style={{ transform: "translateZ(40px)" }} className={`w-16 h-16 rounded-2xl ${bg} ${color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
            {React.cloneElement(icon, { className: 'w-8 h-8' })}
         </div>
         <h3 style={{ transform: "translateZ(20px)" }} className="text-2xl font-black text-slate-800 mb-4">{title}</h3>
         <p style={{ transform: "translateZ(10px)" }} className="text-slate-500 leading-relaxed font-medium mb-8 flex-1">{desc}</p>
         
         <div style={{ transform: "translateZ(30px)" }} className={`flex items-center gap-2 text-sm font-black ${color} opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
            Learn more <FiChevronRight />
         </div>
      </motion.div>
   );
}
