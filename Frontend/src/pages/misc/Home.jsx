import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FiShield, FiActivity, FiUsers, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';

export default function Home() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Staggered variants for feature cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden relative">

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none mix-blend-multiply opacity-30" />

        {/* Interactive Navbar */}
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <motion.div
                className="flex items-center gap-3 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-sky-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <FiActivity className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-slate-800 tracking-tight">EHRS<span className="text-primary">.</span></span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-600">
              <motion.button whileHover={{ scale: 1.1, color: '#0ea5e9' }} onClick={() => navigate(ROUTES.PUBLIC.ABOUT)} className="transition-colors">About</motion.button>
              <motion.button whileHover={{ scale: 1.1, color: '#0ea5e9' }} onClick={() => navigate(ROUTES.PUBLIC.CONTACT)} className="transition-colors">Contact</motion.button>
              <div className="w-px h-6 bg-slate-200"></div>
              <motion.button whileHover={{ scale: 1.1, color: '#0ea5e9' }} onClick={() => navigate(ROUTES.AUTH.LOGIN)} className="transition-colors">Sign In</motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" onClick={() => navigate(ROUTES.AUTH.REGISTER)}>Create Account</Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section with Parallax */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32 relative">

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Particle delay={0} duration={15} color="bg-primary/20" size={40} xValues={[-100, 200, -50]} yValues={[-50, 100, 300]} />
            <Particle delay={2} duration={20} color="bg-sky-400/20" size={60} xValues={[300, -100, 100]} yValues={[100, -200, 150]} />
            <Particle delay={1} duration={18} color="bg-emerald-400/20" size={25} xValues={[0, -300, 200]} yValues={[200, 50, -100]} />
          </div>

          {/* Animated Background Elements */}
          <motion.div
              style={{ y: yBg }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-200/40 rounded-full blur-3xl -z-10 animate-pulse-slow"
          />

          <motion.div style={{ opacity: opacityText }} className="flex flex-col items-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm border border-emerald-200 mb-8 cursor-default shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              EHRS Network is Online & Secure
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
                className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight max-w-4xl mb-6 leading-tight"
            >
              Your Health Identity, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Instantly Accessible.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
                className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mb-12"
            >
              The Emergency Health Record System unifies your medical data under a secure cryptographic QR code, ensuring first responders have life-saving context the moment they arrive.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button size="lg" variant="primary" onClick={() => navigate(ROUTES.AUTH.REGISTER)} className="w-full text-lg px-8 py-4 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
                  Generate Medical ID
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" onClick={() => navigate(ROUTES.PUBLIC.ABOUT)} className="w-full text-lg px-8 py-4 bg-white/50 backdrop-blur-md border-slate-200 hover:bg-white hover:border-slate-300">
                  Learn How It Works
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>

        {/* Feature Grid with Scroll Reveal */}
        <section className="bg-white py-24 border-t border-slate-100 relative z-20 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
                variants={itemVariants}
                icon={<FiShield />}
                title="Cryptographic Security"
                desc="Your records are encrypted and immutable. Access is strictly audited and granted only to verified medical professionals."
                color="text-emerald-500"
                bg="bg-emerald-50"
                glow="group-hover:shadow-emerald-500/20"
            />
            <FeatureCard
                variants={itemVariants}
                icon={<FiActivity />}
                title="Emergency First"
                desc="Optimized for paramedics. Scanning your QR instantly displays critical allergies and blood type within 3 seconds."
                color="text-primary"
                bg="bg-sky-50"
                glow="group-hover:shadow-primary/20"
            />
            <FeatureCard
                variants={itemVariants}
                icon={<FiUsers />}
                title="Unified Network"
                desc="Cross-hospital compatibility. Doctors can instantly read and append prescriptions to your decentralized profile."
                color="text-orange-500"
                bg="bg-orange-50"
                glow="group-hover:shadow-orange-500/20"
            />
          </motion.div>
        </section>

      </div>
  );
}

// Particle Component
const Particle = ({ delay, duration, color, size, xValues, yValues }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-multiply opacity-50 ${color}`}
        style={{ width: size, height: size }}
        animate={{
          x: xValues,
          y: yValues,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay
        }}
    />
);

// 3D Tilt Feature Card
function FeatureCard({ icon, title, desc, variants, color, bg, glow }) {
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
          variants={variants}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 50, y: -10 }}
          className={`group flex flex-col items-start p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft transition-all duration-300 hover:shadow-2xl ${glow} cursor-default relative overflow-hidden`}
      >
        <div style={{ transform: "translateZ(30px)" }} className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 translate-x-10 -translate-y-10 ${bg}`} />

        <div style={{ transform: "translateZ(40px)" }} className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {React.cloneElement(icon, { className: 'w-7 h-7' })}
        </div>
        <h3 style={{ transform: "translateZ(20px)" }} className="text-xl font-black text-slate-800 mb-3">{title}</h3>
        <p style={{ transform: "translateZ(10px)" }} className="text-slate-500 leading-relaxed font-medium mb-6 flex-1">{desc}</p>

        <div style={{ transform: "translateZ(30px)" }} className={`flex items-center gap-1 text-sm font-bold ${color} opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
          Explore feature <FiChevronRight />
        </div>
      </motion.div>
  );
}
