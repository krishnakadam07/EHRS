import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiServer, FiDatabase, FiCpu, FiMonitor, FiShield, FiArrowRight, FiCloud, FiLock } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function Architecture() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/30">

            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none" />

            {/* Navbar */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full border-b border-white/50 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-xl z-50 shadow-sm"
            >
                <button
                    onClick={() => navigate(ROUTES.PUBLIC.HOME)}
                    className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors"
                >
                    <FiArrowLeft /> Back to Home
                </button>
                <div className="font-black text-slate-800 text-xl tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-sky-400 rounded-lg flex items-center justify-center text-white">
                        <FiActivity className="w-4 h-4" />
                    </div>
                    EHRS<span className="text-primary">.</span>
                </div>
            </motion.nav>

            <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter mb-6">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Architecture</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        A high-performance, decoupled microservice architecture designed for maximum security, instant scalability, and AI-driven telemetry.
                    </p>
                </motion.div>

                {/* 🌟 INTERACTIVE ARCHITECTURE DIAGRAM 🌟 */}
                <div className="relative w-full bg-slate-900 rounded-[3rem] p-10 md:p-16 mb-24 overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/50">

                    {/* Diagram Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2">

                        {/* Frontend */}
                        <DiagramBlock
                            icon={<FiMonitor />}
                            title="React Client"
                            subtitle="SPA / Vite"
                            color="from-sky-400 to-blue-600"
                            delay={0.2}
                        />

                        <DiagramArrow delay={0.4} />

                        {/* Security / Gateway */}
                        <DiagramBlock
                            icon={<FiShield />}
                            title="API Gateway"
                            subtitle="Spring Security / JWT"
                            color="from-slate-400 to-slate-600"
                            delay={0.6}
                        />

                        <DiagramArrow delay={0.8} />

                        {/* Core Backend Engine */}
                        <DiagramBlock
                            icon={<FiServer />}
                            title="Spring Boot Core"
                            subtitle="Java REST APIs"
                            color="from-emerald-400 to-teal-600"
                            delay={1.0}
                            glow="bg-emerald-500/20"
                        />

                        {/* Split Paths to DB and AI */}
                        <div className="hidden lg:flex flex-col items-center justify-center h-full">
                            <svg className="w-16 h-32 text-slate-700" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1 }} d="M 0,100 L 50,100 L 50,20 L 100,20" />
                                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1 }} d="M 0,100 L 50,100 L 50,180 L 100,180" />
                            </svg>
                        </div>

                        {/* Storage & AI Layer */}
                        <div className="flex flex-col gap-6 w-full lg:w-auto mt-6 lg:mt-0">
                            <DiagramBlock
                                icon={<FiDatabase />}
                                title="MySQL Cluster"
                                subtitle="Encrypted Storage"
                                color="from-orange-400 to-red-600"
                                delay={1.4}
                            />
                            <DiagramBlock
                                icon={<FiCpu />}
                                title="Gemini Neural Net"
                                subtitle="AI Triage Inference"
                                color="from-purple-400 to-pink-600"
                                delay={1.6}
                                glow="bg-purple-500/20"
                            />
                        </div>

                    </div>
                </div>

                {/* Detailed Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

                    <TechDetailCard
                        icon={<FiMonitor className="text-sky-500" />}
                        title="Frontend Layer"
                        items={[
                            "React.js built via Vite for instant HMR",
                            "Tailwind CSS for utility-first styling",
                            "Framer Motion for hardware-accelerated animations",
                            "React Router DOM for seamless SPA navigation"
                        ]}
                        delay={0.2}
                    />

                    <TechDetailCard
                        icon={<FiServer className="text-emerald-500" />}
                        title="Backend Microservices"
                        items={[
                            "Java 17 with Spring Boot 3.x",
                            "Spring Data JPA for ORM database mapping",
                            "RESTful architecture with JSON payloads",
                            "Lombok to eliminate boilerplate code"
                        ]}
                        delay={0.3}
                    />

                    <TechDetailCard
                        icon={<FiLock className="text-slate-500" />}
                        title="Security Protocol"
                        items={[
                            "Stateless JWT (JSON Web Tokens) Authentication",
                            "Spring Security Filter Chains & RBAC",
                            "SHA-256 cryptographic hashing for passwords",
                            "Bcrypt salting to prevent rainbow table attacks"
                        ]}
                        delay={0.4}
                    />

                    <TechDetailCard
                        icon={<FiCloud className="text-purple-500" />}
                        title="AI & External APIs"
                        items={[
                            "Google Gemini 1.5 Pro Neural Network Integration",
                            "Real-time Biometric Triage Prompt Engineering",
                            "HTML5-QRCode for token scanning and decoding",
                            "Asynchronous API calls via Axios"
                        ]}
                        delay={0.5}
                    />

                </div>

            </main>
            <Footer />
        </div>
    );
}

// Subcomponents for the Diagram

function DiagramBlock({ icon, title, subtitle, color, delay, glow }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring", bounce: 0.5 }}
            className="relative group w-full lg:w-48"
        >
            {/* Glow Effect */}
            {glow && <div className={`absolute inset-0 ${glow} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />}

            <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center shadow-xl group-hover:border-slate-500 transition-colors">
                <div className={`w-14 h-14 bg-gradient-to-tr ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-black/50`}>
                    {React.cloneElement(icon, { className: 'w-7 h-7' })}
                </div>
                <h4 className="font-black text-white tracking-tight mb-1">{title}</h4>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{subtitle}</span>
            </div>
        </motion.div>
    );
}

function DiagramArrow({ delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="hidden lg:flex text-slate-600"
        >
            <FiArrowRight className="w-8 h-8" />
        </motion.div>
    );
}

function TechDetailCard({ icon, title, items, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring" }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                    {React.cloneElement(icon, { className: 'w-6 h-6' })}
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
            </div>
            <ul className="flex flex-col gap-3">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium leading-relaxed">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}