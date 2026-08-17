import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiEdit3 } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function AddPrescription() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      patientId: 'PT-10492-AX', // Pre-filled mock
      medicationName: '',
      dosage: '',
      frequency: '',
      duration: '',
      notes: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call & cryptography signing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"
        >
          <FiCheckCircle className="w-12 h-12" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-3xl font-black text-slate-800 mb-2"
        >
          Prescription Issued
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-slate-500 font-medium mb-8 max-w-md"
        >
          The prescription has been cryptographically signed and securely added to the patient's records.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          <Button variant="primary" onClick={() => navigate(ROUTES.DOCTOR.PATIENT_DETAILS)}>
            Return to Patient Profile
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors focus:outline-none"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <PageHeader 
          title="Author Prescription" 
          subtitle="Issue a new secure prescription to the patient's EHRS vault."
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Card>
           <Card.Body padding="p-6 sm:p-8">
              <div className="flex flex-col gap-6">
                 
                 {/* Top section: Context */}
                 <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <div className="flex flex-col gap-1">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Issuing To</span>
                       <span className="text-lg font-black text-slate-800">Jane Doe (PT-10492-AX)</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                       <FiEdit3 className="w-6 h-6" />
                    </div>
                 </div>

                 {/* Form Fields */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                       <Input
                         label="Medication Name"
                         placeholder="e.g., Amoxicillin"
                         disabled={isSubmitting}
                         error={errors.medicationName?.message}
                         {...register('medicationName', { required: 'Medication name is required' })}
                       />
                    </div>
                    
                    <Input
                      label="Dosage"
                      placeholder="e.g., 500mg"
                      disabled={isSubmitting}
                      error={errors.dosage?.message}
                      {...register('dosage', { required: 'Dosage is required' })}
                    />
                    
                    <Input
                      label="Frequency"
                      placeholder="e.g., Every 8 hours"
                      disabled={isSubmitting}
                      error={errors.frequency?.message}
                      {...register('frequency', { required: 'Frequency is required' })}
                    />

                    <Input
                      label="Duration"
                      placeholder="e.g., 7 days"
                      disabled={isSubmitting}
                      error={errors.duration?.message}
                      {...register('duration', { required: 'Duration is required' })}
                    />
                    
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                       <label className="text-slate-700 text-xs font-black uppercase tracking-wider">Clinical Notes / Instructions</label>
                       <textarea
                         rows="3"
                         disabled={isSubmitting}
                         placeholder="Take with food. Do not skip doses."
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white resize-none"
                         {...register('notes')}
                       ></textarea>
                    </div>
                 </div>

                 <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 mt-4">
                    <FiAlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-800 font-medium leading-relaxed">
                       You are cryptographically signing this prescription. This action will be permanently recorded in the access logs and cannot be deleted.
                    </p>
                 </div>

              </div>
           </Card.Body>
        </Card>

        <div className="flex justify-end gap-4 mt-2">
           <Button variant="outline" size="lg" onClick={() => navigate(-1)} disabled={isSubmitting}>
              Cancel
           </Button>
           <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
              Sign & Issue Prescription
           </Button>
        </div>
      </form>
    </div>
  );
}
