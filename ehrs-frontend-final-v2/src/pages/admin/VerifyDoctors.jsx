import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiFileText, FiMapPin, FiShield, FiAlertTriangle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { adminService } from '../../services/adminService';

export default function VerifyDoctors() {
    const [pendingList, setPendingList] = useState([]);
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = () => {
        adminService.getPendingDoctors().then(setPendingList).catch(console.error);
    };

    const handleAction = async () => {
        try {
            if (activeModal.type === 'Approve') {
                await adminService.approveDoctor(activeModal.doctor.id);
            } else {
                await adminService.rejectDoctor(activeModal.doctor.id);
            }
            setActiveModal(null);
            fetchPending(); // Refresh list automatically!
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-5xl mx-auto">
            <PageHeader title="Verify Doctors" subtitle="Review medical credentials and grant cryptographic network access." />

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0"><FiShield className="w-5 h-5" /></div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-sky-900 mb-1">Strict Verification Required</h4>
                    <p className="text-xs text-sky-800 font-medium leading-relaxed max-w-3xl">Approving a doctor grants them the ability to scan patient QR codes and author immutable prescriptions.</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <AnimatePresence>
                    {pendingList.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mb-4"><FiCheck className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">All Caught Up!</h3>
                            <p className="text-slate-500">There are no pending doctor verifications at this time.</p>
                        </motion.div>
                    ) : (
                        pendingList.map(doctor => (
                            <motion.div key={doctor.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex flex-col md:flex-row gap-6 md:items-center flex-1">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 text-2xl font-black text-slate-400 flex items-center justify-center shrink-0">
                                        {doctor.fullName ? doctor.fullName.charAt(4) : 'D'}
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h3 className="text-xl font-black text-slate-800">{doctor.fullName}</h3>
                                        <p className="text-sm font-bold text-primary">{doctor.specialty}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-3">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><FiFileText className="text-slate-400" /> {doctor.licenseNumber}</span>
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><FiMapPin className="text-slate-400" /> {doctor.hospitalAffiliation}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                                    <Button variant="outline" icon={<FiX />} className="flex-1 lg:flex-none text-red-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600" onClick={() => setActiveModal({ type: 'Reject', doctor })}>Reject</Button>
                                    <Button variant="primary" icon={<FiCheck />} className="flex-1 lg:flex-none shadow-lg shadow-primary/20" onClick={() => setActiveModal({ type: 'Approve', doctor })}>Approve</Button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} size="sm">
                {activeModal && (
                    <div className="flex flex-col gap-4 p-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeModal.type === 'Approve' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {activeModal.type === 'Approve' ? <FiShield className="w-6 h-6" /> : <FiAlertTriangle className="w-6 h-6" />}
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">{activeModal.type} {activeModal.doctor.fullName}?</h3>
                        <p className="text-sm font-medium text-slate-500 mb-4">
                            {activeModal.type === 'Approve' ? "This will grant the doctor full access to the network." : "This will permanently reject the application."}
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" fullWidth onClick={() => setActiveModal(null)}>Cancel</Button>
                            <Button variant="primary" fullWidth className={activeModal.type === 'Reject' ? 'bg-red-500 hover:bg-red-600' : ''} onClick={handleAction}>Confirm</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}