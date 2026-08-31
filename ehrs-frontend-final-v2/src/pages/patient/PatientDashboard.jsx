import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiUploadCloud, FiMaximize, FiMapPin, FiActivity, FiHeart, FiDroplet, FiPhone, FiArrowRight } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';
import { recordService } from '../../services/recordService';
import { ROUTES } from '../../routes/routeConstants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

export default function PatientDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

    const [patientData, setPatientData] = useState(null);
    const [recordCount, setRecordCount] = useState(0);
    const [scanCount, setScanCount] = useState(0);

    useEffect(() => {
        if (currentUser?.email) {
            patientService.getProfile(currentUser.email).then(data => setPatientData(data)).catch(err => console.error("Failed to load profile", err));
            recordService.getPatientRecords(currentUser.email).then(records => setRecordCount(records.length)).catch(err => console.error("Failed to count records", err));
            patientService.getAccessLogs(currentUser.email).then(logs => setScanCount(logs.length)).catch(err => console.error("Failed to count access logs", err));
        }
    }, [currentUser]);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="flex flex-col gap-8 pb-12 mx-auto max-w-7xl">

            {/* HERO SECTION */}
            <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 rounded-[32px] p-8 md:p-12 shadow-2xl text-white group"
            >
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-20 w-72 h-72 bg-sky-400 opacity-10 rounded-full blur-3xl group-hover:-translate-y-10 transition-transform duration-700"></div>

                <div className="flex flex-col gap-2 relative z-10">
                    <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-blue-200 font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                        <FiActivity className="w-4 h-4 animate-pulse text-sky-400" /> {getGreeting()}
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                        {patientData?.fullName || 'Patient'}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-blue-100 mt-2 max-w-xl text-sm md:text-base font-medium">
                        Here is a real-time overview of your medical identity and recent cryptographic record activities.
                    </motion.p>
                </div>
            </motion.div>

            {/* QUICK ACTIONS */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                <QuickActionButton icon={<FiMaximize />} label="My QR Card" color="from-blue-500 to-blue-600" shadowColor="shadow-blue-500/40" onClick={() => navigate(ROUTES.PATIENT.QR)} />
                <QuickActionButton icon={<FiUploadCloud />} label="Upload Record" color="from-emerald-400 to-emerald-500" shadowColor="shadow-emerald-500/40" onClick={() => navigate(ROUTES.PATIENT.UPLOAD)} />
                <QuickActionButton icon={<FiFileText />} label="View Records" color="from-purple-500 to-purple-600" shadowColor="shadow-purple-500/40" onClick={() => navigate(ROUTES.PATIENT.RECORDS)} />
                <QuickActionButton icon={<FiMapPin />} label="Find Hospitals" color="from-orange-400 to-orange-500" shadowColor="shadow-orange-500/40" onClick={() => navigate(ROUTES.PATIENT.NEARBY_HOSPITALS)} />
            </motion.div>

            {/* METRICS & CONTACTS */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard title="Blood Type" value={patientData?.bloodType || '-'} subtitle="Verified Match" icon={<FiDroplet />} color="text-red-500" bgColor="bg-red-50" hoverColor="group-hover:bg-red-500 group-hover:text-white" />
                    <MetricCard title="Total Records" value={recordCount} subtitle="Securely Stored" icon={<FiFileText />} color="text-blue-500" bgColor="bg-blue-50" hoverColor="group-hover:bg-blue-600 group-hover:text-white" onClick={() => navigate(ROUTES.PATIENT.RECORDS)} />
                    <MetricCard title="Recent Scans" value={scanCount} subtitle="Total accesses" icon={<FiMaximize />} color="text-emerald-500" bgColor="bg-emerald-50" hoverColor="group-hover:bg-emerald-500 group-hover:text-white" onClick={() => navigate(ROUTES.PATIENT.ACCESS_HISTORY)} />
                    <MetricCard title="Emergency Modal" value="Preview" subtitle="Check ID Data" icon={<FiActivity />} color="text-purple-500" bgColor="bg-purple-50" hoverColor="group-hover:bg-purple-500 group-hover:text-white" onClick={() => setIsEmergencyModalOpen(true)} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div variants={itemVariants} className="lg:col-span-12 flex flex-col">
                        <Card className="h-full shadow-sm border-slate-200 overflow-hidden">
                            <Card.Header className="bg-slate-50 border-b border-slate-100 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center"><FiPhone className="text-orange-500 w-5 h-5" /></div>
                                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Emergency Contacts</h2>
                                    </div>
                                    <button onClick={() => navigate(ROUTES.PATIENT.PROFILE)} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">Edit <FiArrowRight /></button>
                                </div>
                            </Card.Header>
                            <Card.Body padding="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <AnimatePresence>
                                        {patientData?.emergencyContacts && patientData.emergencyContacts.length > 0 ? (
                                            patientData.emergencyContacts.map((contact, idx) => (
                                                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1, type: "spring" }} whileHover={{ y: -4, scale: 1.02 }} className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm hover:shadow-md hover:border-orange-200 transition-all group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 flex items-center justify-center font-black text-lg border border-orange-200 group-hover:bg-orange-500 group-hover:text-white transition-colors">{contact.name.charAt(0)}</div>
                                                        <div className="flex flex-col">
                                                            <span className="text-base font-black text-slate-800 group-hover:text-orange-600 transition-colors">{contact.name}</span>
                                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{contact.relation}</span>
                                                        </div>
                                                    </div>
                                                    <a href={`tel:${contact.phone}`} className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center transition-all hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/40 hover:scale-110">
                                                        <FiPhone className="w-4 h-4" />
                                                    </a>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 col-span-full flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4"><FiPhone className="w-8 h-8" /></div>
                                                <p className="text-sm font-bold text-slate-500">No emergency contacts found.</p>
                                                <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.PATIENT.PROFILE)} className="mt-4">Add Contact in Profile</Button>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>

            <Modal isOpen={isEmergencyModalOpen} onClose={() => setIsEmergencyModalOpen(false)} title="Emergency Profile Overview" size="md">
                <div className="flex flex-col gap-6">
                    <p className="text-sm text-slate-600 font-medium">This is the critical information first responders will instantly see when scanning your encrypted QR code.</p>

                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-5"><FiActivity className="w-32 h-32 text-red-900" /></div>

                        <div className="flex justify-between items-center border-b border-red-100/50 pb-3 relative z-10">
                            <span className="font-bold text-slate-700 flex items-center gap-2"><FiDroplet className="text-red-500" /> Blood Type</span>
                            <span className="text-2xl font-black text-red-600 bg-white px-3 py-1 rounded-lg shadow-sm">{patientData?.bloodType || 'Unknown'}</span>
                        </div>

                        <div className="flex flex-col gap-1.5 border-b border-red-100/50 pb-3 relative z-10">
                            <span className="font-bold text-slate-700">Severe Allergies</span>
                            <span className="text-sm text-slate-800 font-bold bg-white/60 p-2 rounded-lg">{patientData?.allergies || 'None reported'}</span>
                        </div>

                        <div className="flex flex-col gap-1.5 relative z-10">
                            <span className="font-bold text-slate-700">Primary Emergency Contact</span>
                            <span className="text-sm text-slate-800 font-bold bg-white/60 p-2 rounded-lg">
                 {patientData?.emergencyContacts?.[0] ? `${patientData.emergencyContacts[0].name} (${patientData.emergencyContacts[0].relation}) - ${patientData.emergencyContacts[0].phone}` : 'None provided'}
               </span>
                        </div>
                    </div>

                    <div className="flex justify-end mt-2">
                        <Button variant="primary" onClick={() => setIsEmergencyModalOpen(false)} className="w-full justify-center">Close Overview</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

// INTERACTIVE QUICK ACTION BUTTON
function QuickActionButton({ icon, label, color, shadowColor, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-3 p-5 min-w-[130px] bg-white border border-slate-200 rounded-[24px] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
        >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${color} text-white flex items-center justify-center shadow-lg ${shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(icon, { className: 'w-6 h-6' })}
            </div>
            <span className="text-xs font-black text-slate-700 group-hover:text-blue-600 transition-colors">{label}</span>
        </motion.button>
    );
}

// INTERACTIVE METRIC CARD
function MetricCard({ title, value, subtitle, icon, color, bgColor, hoverColor, onClick }) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -6 }}
            className={`group bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden ${onClick ? 'cursor-pointer hover:border-slate-300' : ''}`}
        >
            {/* Decorative background glow on hover */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-100 blur-2xl z-0"></div>

            <div className="flex justify-between items-start relative z-10">
                <span className="text-sm font-black text-slate-500 group-hover:text-slate-700 transition-colors">{title}</span>
                <div className={`w-12 h-12 rounded-2xl ${bgColor} ${color} flex items-center justify-center shrink-0 transition-all duration-500 ${hoverColor} group-hover:rotate-12 group-hover:scale-110`}>
                    {React.cloneElement(icon, { className: 'w-5 h-5' })}
                </div>
            </div>
            <div className="flex flex-col relative z-10">
                <span className="text-4xl font-black text-slate-800 tracking-tight">{value}</span>
                <span className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1"><div className={`w-1.5 h-1.5 rounded-full ${bgColor.replace('bg-', 'bg-').replace('50', '400')}`}></div> {subtitle}</span>
            </div>
        </motion.div>
    );
}