import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3, FiDroplet, FiFileText, FiShield, FiLock, FiXCircle, FiEye, FiEyeOff, FiActivity, FiUserCheck, FiClock, FiDatabase } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
=======
import { FiEdit3, FiDroplet, FiFileText, FiShield, FiLock, FiXCircle, FiMaximize } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import { doctorService } from '../../services/doctorService';
import useAuth from '../../hooks/useAuth';

export default function PatientDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    const [activeTab, setActiveTab] = useState('Prescriptions');
    const [patientData, setPatientData] = useState(null);
    const [s3Records, setS3Records] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    const [showPrivateData, setShowPrivateData] = useState(false);
=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67

    const scannedPatientId = location.state?.patientId;

    useEffect(() => {
        if (scannedPatientId && currentUser?.email) {
            const numericId = scannedPatientId.replace(/\D/g, '');
<<<<<<< HEAD
=======

            // Fetch everything at once!
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
            Promise.all([
                doctorService.getPatientDetails(numericId, currentUser.email),
                doctorService.getPatientRecords(numericId),
                doctorService.getPatientPrescriptions(numericId)
            ]).then(([patientInfo, recordsList, rxList]) => {
                setPatientData(patientInfo);
                setS3Records(recordsList);
                setPrescriptions(rxList);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [scannedPatientId, currentUser]);

    if (!scannedPatientId) {
        return (
<<<<<<< HEAD
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-32 h-32 bg-red-50 text-red-500 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner border border-red-100">
                    <FiLock className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Security Violation</h2>
                <p className="text-slate-500 font-medium mb-8 max-w-md">You cannot access a patient profile directly. You must cryptographically scan their emergency QR token first.</p>
                <Button variant="primary" size="lg" onClick={() => navigate(ROUTES.DOCTOR.SCAN_QR)} className="shadow-xl shadow-primary/20 px-8 py-4">Return to Scanner</Button>
            </motion.div>
        );
    }

    if (loading) return (
        <div className="flex flex-col gap-6 pb-12 max-w-5xl mx-auto animate-pulse px-6 pt-8">
            <div className="flex justify-between items-center mb-4">
                <div className="h-12 w-48 bg-slate-200 rounded-xl"></div>
                <div className="h-12 w-32 bg-slate-200 rounded-xl"></div>
            </div>
            <div className="h-64 bg-slate-200 rounded-[2.5rem] w-full shadow-sm"></div>
            <div className="h-96 bg-slate-200 rounded-[2.5rem] w-full shadow-sm"></div>
        </div>
    );

    if (!patientData) return (
        <div className="flex justify-center mt-20"><div className="bg-red-50 text-red-500 px-6 py-4 rounded-2xl font-bold border border-red-200">System Error: Failed to decrypt patient payload.</div></div>
    );

    const recordColumns = [
        { accessor: 'title', header: 'Document Name', cell: (row) => <span className="font-bold text-slate-700">{row.title}</span> },
        { accessor: 'type', header: 'Category', cell: (row) => <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">{row.type}</span> },
        { accessor: 'uploadDate', header: 'Date', cell: (row) => <span className="text-slate-500 font-medium">{new Date(row.uploadDate).toLocaleDateString()}</span> },
        { accessor: 'fileUrl', header: 'Access', cell: (row) => (
                <a href={row.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 px-4 py-2 rounded-xl font-bold transition-colors">
                    View <FiEye className="w-4 h-4"/>
                </a>
=======
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6"><FiLock className="w-10 h-10" /></div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">Access Denied</h2>
                <Button variant="primary" onClick={() => navigate(ROUTES.DOCTOR.SCAN_QR)} className="mt-4">Go to QR Scanner</Button>
            </div>
        );
    }

    if (loading) return <div className="text-center mt-20 animate-pulse font-bold text-slate-500">Loading Secure Profile...</div>;
    if (!patientData) return <div className="text-center mt-20 font-bold text-red-500">Error fetching patient data.</div>;

    const recordColumns = [
        { accessor: 'title', header: 'Document Name' },
        { accessor: 'type', header: 'Category' },
        { accessor: 'uploadDate', header: 'Date Uploaded', cell: (row) => new Date(row.uploadDate).toLocaleDateString() },
        { accessor: 'fileUrl', header: 'Action', cell: (row) => (
                <a href={row.fileUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">View File</a>
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
            )},
    ];

    const rxColumns = [
<<<<<<< HEAD
        { accessor: 'medicationName', header: 'Medication', cell: (row) => <span className="font-black text-slate-800 text-base">{row.medicationName}</span> },
        { accessor: 'dosage', header: 'Dosage / Freq', cell: (row) => <span className="text-slate-600 font-medium">{row.dosage} &bull; {row.frequency}</span> },
        { accessor: 'dateIssued', header: 'Date Issued', cell: (row) => <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">{row.dateIssued}</span> },
        { accessor: 'doctorEmail', header: 'Issuer', cell: (row) => <span className="text-slate-400 font-medium text-sm">{row.doctorEmail}</span> },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 pb-16 max-w-6xl mx-auto px-6 pt-8 font-sans">

            {/* 🌟 PREMIUM HEADER (Stable/Static) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-soft relative z-10">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                            <FiShield className="w-7 h-7" />
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                        </span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Active Emergency Session</h1>
                        <p className="text-sm font-bold text-emerald-600 tracking-wide uppercase mt-1">Cryptographic Access Granted</p>
                    </div>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <Button variant="primary" icon={<FiEdit3 />} onClick={() => navigate(ROUTES.DOCTOR.ADD_PRESCRIPTION, { state: { patientId: scannedPatientId } })} className="flex-1 md:flex-none shadow-xl shadow-primary/20">Prescribe</Button>
                    <Button variant="danger" icon={<FiXCircle />} onClick={() => navigate(ROUTES.DOCTOR.DASHBOARD, { replace: true, state: {} })} className="flex-1 md:flex-none bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 border-none shadow-sm">Close</Button>
                </div>
            </div>

            {/* 🌟 HOLOGRAPHIC PROFILE CARD */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-700/50"
            >
                {/* Holographic Glowing Orbs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">

                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-5xl font-black text-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                                {patientData.fullName?.charAt(0) || 'P'}
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-3 rounded-2xl border-4 border-slate-900 shadow-lg">
                                <FiUserCheck className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase mb-4 w-fit"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Identity Verified
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{patientData.fullName}</h2>

                            <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium text-sm md:text-base">
                                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10"><FiActivity className="text-primary"/> {scannedPatientId}</span>
                                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">{patientData.gender || 'Unknown Gender'}</span>
                                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10"><FiClock className="text-slate-500"/> DOB: {patientData.dateOfBirth || 'XX/XX/XXXX'}</span>
                            </div>

                            {/* 🌟 INTERACTIVE DATA MASKING */}
                            <div className="mt-8 flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 pr-5 rounded-2xl border border-white/10 w-fit group">
                                <button
                                    onClick={() => setShowPrivateData(!showPrivateData)}
                                    className={`p-3 rounded-xl transition-all duration-300 ${showPrivateData ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                                >
                                    {showPrivateData ? <FiEyeOff className="w-5 h-5"/> : <FiEye className="w-5 h-5"/>}
                                </button>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Emergency Contact</span>
                                    <span className="text-base font-black text-slate-200 tracking-wide font-mono mt-0.5">
                                        {showPrivateData ? patientData.phoneNumber : "••• ••• ••" + (patientData.phoneNumber?.slice(-2) || "89")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {patientData.bloodType && (
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-red-500/20 to-red-500/5 rounded-[2.5rem] border border-red-500/30 shadow-inner backdrop-blur-sm min-w-[160px]"
                        >
                            <FiDroplet className="text-red-400 w-12 h-12 mb-4 drop-shadow-[0_0_15px_rgba(248,113,113,0.6)]" />
                            <span className="text-xs font-black text-red-400/80 uppercase tracking-widest mb-1">Blood Type</span>
                            <span className="font-black text-5xl text-white drop-shadow-md">{patientData.bloodType}</span>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* 🌟 INTERACTIVE DATA VAULT */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden"
            >
                {/* Custom Tab Header */}
                <div className="border-b border-slate-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                            <FiDatabase className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Medical Vault</h3>
                            <p className="text-sm font-bold text-slate-500 mt-1">Review historical records and prescriptions.</p>
                        </div>
                    </div>

                    {/* iOS Style Segmented Control */}
                    <div className="flex bg-slate-200/60 p-1.5 rounded-2xl relative w-full md:w-auto">
                        {['Prescriptions', 'S3 Files'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative w-full md:w-40 py-2.5 text-sm font-black rounded-xl z-10 transition-colors duration-300 ${activeTab === tab ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {activeTab === tab && (
                                    <motion.div layoutId="active-tab" className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50 -z-10" />
                                )}
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'Prescriptions' ? (
                                prescriptions.length === 0 ? (
                                    <EmptyState icon={<FiFileText />} title="No Prescriptions" desc="This patient has no medication history on the blockchain." />
                                ) : <div className="p-4"><DataTable columns={rxColumns} data={prescriptions} keyExtractor={(item) => item.id} /></div>
                            ) : (
                                s3Records.length === 0 ? (
                                    <EmptyState icon={<FiDatabase />} title="Vault Empty" desc="No external PDF or imaging documents have been uploaded." />
                                ) : <div className="p-4"><DataTable columns={recordColumns} data={s3Records} keyExtractor={(item) => item.id} /></div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Beautiful Empty State Helper Component
function EmptyState({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
            <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center mb-6 text-slate-300">
                {React.cloneElement(icon, { className: 'w-10 h-10' })}
            </div>
            <h3 className="text-2xl font-black text-slate-700 mb-2">{title}</h3>
            <p className="text-base text-slate-500 font-medium max-w-sm">{desc}</p>
=======
        { accessor: 'medicationName', header: 'Medication' },
        { accessor: 'dosage', header: 'Dosage / Freq', cell: (row) => `${row.dosage} - ${row.frequency}` },
        { accessor: 'dateIssued', header: 'Date Issued' },
        { accessor: 'doctorEmail', header: 'Issued By' },
    ];

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><FiShield className="w-5 h-5" /></div>
                    <div><h1 className="text-2xl font-black">Active Session</h1><p className="text-sm font-bold text-emerald-600">Secure Access Granted</p></div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={<FiEdit3 />} onClick={() => navigate(ROUTES.DOCTOR.ADD_PRESCRIPTION, { state: { patientId: scannedPatientId } })}>Add Prescription</Button>
                    <Button variant="danger" icon={<FiXCircle />} onClick={() => navigate(ROUTES.DOCTOR.DASHBOARD, { replace: true, state: {} })}>End Session</Button>
                </div>
            </div>

            <Card className="bg-slate-900 text-white">
                <Card.Body padding="p-8">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-black">{patientData.fullName?.charAt(0) || 'P'}</div>
                        <div>
                            <h2 className="text-3xl font-black">{patientData.fullName}</h2>
                            <p className="text-slate-400 font-bold mt-1">ID: {scannedPatientId} &bull; {patientData.gender}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header>
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-bold flex items-center gap-2"><FiFileText className="text-primary" /> Patient Records</h3>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button onClick={() => setActiveTab('Prescriptions')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'Prescriptions' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Prescriptions</button>
                            <button onClick={() => setActiveTab('S3 Files')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'S3 Files' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>S3 Documents</button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body noPadding>
                    {activeTab === 'Prescriptions' ? (
                        <DataTable columns={rxColumns} data={prescriptions} keyExtractor={(item) => item.id} />
                    ) : (
                        <DataTable columns={recordColumns} data={s3Records} keyExtractor={(item) => item.id} />
                    )}
                </Card.Body>
            </Card>
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
        </div>
    );
}