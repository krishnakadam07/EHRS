import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiActivity, FiGithub, FiLinkedin, FiMail, FiCode, FiCpu, FiLayout, FiDatabase } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Footer from '../../components/layout/Footer';

export default function DeveloperDetails() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 🌟 EDIT YOUR TEAM DETAILS HERE 🌟
    const teamMembers = [
        {
            id: 1,
            name: "John Doe",
            role: "Lead Full-Stack Engineer",
            bio: "Architected the Spring Boot microservices, integrated the Gemini AI Triage model, and built the Framer Motion React frontend.",
            icon: <FiCode />,
            color: "from-sky-400 to-blue-600",
            github: "#",
            linkedin: "#",
            email: "mailto:john@example.com"
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Backend & AI Specialist",
            bio: "Engineered the RESTful Java APIs, configured the Spring Security JWT filters, and optimized the prompt engineering for Gemini inference.",
            icon: <FiCpu />,
            color: "from-emerald-400 to-teal-600",
            github: "#",
            linkedin: "#",
            email: "mailto:jane@example.com"
        },
        {
            id: 3,
            name: "Alex Johnson",
            role: "UI/UX & Frontend Developer",
            bio: "Designed the glassmorphic user interface, implemented the Tailwind CSS grid systems, and mapped the React Router architecture.",
            icon: <FiLayout />,
            color: "from-purple-400 to-pink-600",
            github: "#",
            linkedin: "#",
            email: "mailto:alex@example.com"
        },
        {
            id: 4,
            name: "Sarah Williams",
            role: "Database & Security Architect",
            bio: "Designed the MySQL relational schemas, implemented SHA-256 cryptographic hashing, and established HIPAA-compliant data pipelines.",
            icon: <FiDatabase />,
            color: "from-orange-400 to-red-600",
            github: "#",
            linkedin: "#",
            email: "mailto:sarah@example.com"
        }
    ];

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
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter mb-6">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-500">Developers</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                        The Emergency Health Record System (EHRS) was engineered by a dedicated team of four developers focusing on decentralized health data, cryptographic security, and AI triage.
                    </p>
                </motion.div>

                {/* 🌟 2x2 TEAM GRID 🌟 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
                            className="relative group"
                        >
                            {/* Hover Glow Effect behind card */}
                            <div className={`absolute inset-0 bg-gradient-to-tr ${member.color} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10`} />

                            {/* Card Content */}
                            <div className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 h-full flex flex-col">

                                <div className="flex items-start justify-between mb-8">
                                    {/* Avatar / Icon */}
                                    <div className={`w-20 h-20 bg-gradient-to-tr ${member.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                        {React.cloneElement(member.icon, { className: 'w-10 h-10' })}
                                    </div>

                                    {/* Initials Watermark in top right */}
                                    <div className="text-4xl font-black text-slate-100 uppercase tracking-tighter select-none pointer-events-none">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-black text-slate-800 mb-2">{member.name}</h3>
                                <p className="text-sm font-black uppercase tracking-widest text-primary mb-6">{member.role}</p>

                                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                                    {member.bio}
                                </p>

                                {/* Social Links */}
                                <div className="flex gap-4 mt-auto pt-6 border-t border-slate-100">
                                    <SocialButton icon={<FiGithub />} href={member.github} />
                                    <SocialButton icon={<FiLinkedin />} href={member.linkedin} />
                                    <SocialButton icon={<FiMail />} href={member.email} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
}

// Subcomponent for Social Buttons inside the Card
function SocialButton({ icon, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-white hover:border-slate-800 hover:-translate-y-1 transition-all duration-300 shadow-sm"
        >
            {React.cloneElement(icon, { className: 'w-5 h-5' })}
        </a>
    );
}