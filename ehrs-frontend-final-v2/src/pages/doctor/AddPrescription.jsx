import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiEdit3 } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { doctorService } from '../../services/doctorService';

export default function AddPrescription() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    // Get patientId passed from the PatientDetails/QR Scanner
    const patientId = location.state?.patientId || '';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            patientId: patientId,
            medicationName: '',
            dosage: '',
            frequency: '',
            duration: '',
            notes: ''
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // 🌟 REAL BACKEND CALL!
            const payload = {
                ...data,
                doctorEmail: currentUser.email // Attach doctor's email securely
            };
            await doctorService.issuePrescription(payload);
            setIsSuccess(true);
        } catch (error) {
            console.error("Failed to issue prescription", error);
            alert("Failed to issue prescription.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                    <FiCheckCircle className="w-12 h-12" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">Prescription Issued!</h2>
                <p className="text-slate-500 font-medium mb-8 max-w-md">
                    The prescription has been securely saved to the database. The patient can now view it on their dashboard.
                </p>
                <Button variant="primary" onClick={() => navigate(ROUTES.DOCTOR.DASHBOARD)}>
                    Return to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                    <FiArrowLeft className="w-5 h-5" />
                </button>
                <PageHeader title="Author Prescription" subtitle="Issue a new secure prescription." />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <Card>
                    <Card.Body padding="p-6 sm:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Issuing To</span>
                                    <span className="text-lg font-black text-slate-800">Patient ID: {patientId || "Unknown"}</span>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                    <FiEdit3 className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="sm:col-span-2">
                                    <Input label="Medication Name" placeholder="e.g., Amoxicillin" disabled={isSubmitting} error={errors.medicationName?.message} {...register('medicationName', { required: 'Required' })} />
                                </div>
                                <Input label="Dosage" placeholder="e.g., 500mg" disabled={isSubmitting} error={errors.dosage?.message} {...register('dosage', { required: 'Required' })} />
                                <Input label="Frequency" placeholder="e.g., Every 8 hours" disabled={isSubmitting} error={errors.frequency?.message} {...register('frequency', { required: 'Required' })} />
                                <Input label="Duration" placeholder="e.g., 7 days" disabled={isSubmitting} error={errors.duration?.message} {...register('duration', { required: 'Required' })} />

                                <div className="flex flex-col gap-1.5 sm:col-span-2">
                                    <label className="text-slate-700 text-xs font-black uppercase">Clinical Notes</label>
                                    <textarea rows="3" disabled={isSubmitting} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none" {...register('notes')}></textarea>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <div className="flex justify-end gap-4 mt-2">
                    <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                        Sign & Issue Prescription
                    </Button>
                </div>
            </form>
        </div>
    );
}