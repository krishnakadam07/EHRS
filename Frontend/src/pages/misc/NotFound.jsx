import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/Button';

export default function NotFound() {
    const navigate = useNavigate();
    const controls = useAnimation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Subtle Parallax effect based on mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 20;
            const y = (e.clientY / innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center selection:bg-primary/30 relative overflow-hidden">

            {/* Decorative Interactive Background Elements */}
            <motion.div
                animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
                transition={{ type: "tween", ease: "easeOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
            />
            <motion.div
                animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                transition={{ type: "tween", ease: "easeOut" }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-32 h-32 bg-slate-800 text-slate-400 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl border border-slate-700 relative cursor-crosshair group"
                >
                    <FiAlertCircle className="w-16 h-16 group-hover:text-primary transition-colors duration-300" />

                    {/* Bouncing 404 Tag */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 bg-primary text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg shadow-primary/40 transform rotate-12 group-hover:rotate-6 transition-transform"
                    >
                        404
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg"
                >
                    Signal Lost
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-xl text-slate-400 font-medium max-w-lg mb-12 leading-relaxed"
                >
                    The requested medical record or directory could not be located on the cryptographic network.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<FiHome />}
                        onClick={() => navigate(ROUTES.PUBLIC.HOME)}
                        className="px-8 py-4 text-lg shadow-xl shadow-primary/30"
                    >
                        Return to Safety
                    </Button>
                </motion.div>
            </div>

        </div>
    );
}
