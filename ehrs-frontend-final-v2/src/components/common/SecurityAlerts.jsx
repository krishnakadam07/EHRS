import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

export default function SecurityAlerts() {
    const { currentUser } = useAuth();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // Only connect if we have a logged-in patient
        if (!currentUser?.email || currentUser?.role !== 'patient') return;

        // Connect to Spring Boot WebSocket
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8081/ws-alerts'),
            onConnect: () => {
                console.log("🔒 Connected to Live Security Grid");

                // Subscribe to their specific private channel
                stompClient.subscribe(`/topic/alerts/${currentUser.email}`, (message) => {
                    const payload = JSON.parse(message.body);
                    setAlert(payload); // Trigger the massive red UI popup
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [currentUser]);

    return (
        <AnimatePresence>
            {alert && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-sm"
                >
                    <div className="bg-red-600 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_100px_rgba(220,38,38,0.6)] border-4 border-red-500 relative">
                        <button
                            onClick={() => setAlert(null)}
                            className="absolute top-4 right-4 text-red-200 hover:text-white"
                        >
                            <FiX className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <FiAlertTriangle className="w-24 h-24 text-white mb-6 animate-pulse" />
                            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-2">
                                {alert.title}
                            </h2>
                            <p className="text-xl text-red-100 font-medium">
                                {alert.message}
                            </p>
                            <p className="text-sm text-red-300 mt-8 font-mono">
                                Log Time: {new Date(alert.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}