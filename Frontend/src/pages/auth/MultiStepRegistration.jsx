import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiCheckCircle, FiChevronLeft, FiChevronRight, FiHeart, FiAlertCircle } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const STEPS = [
  { id: 'personal', title: 'Personal Details' },
  { id: 'medical', title: 'Medical Details' },
  { id: 'emergency', title: 'Emergency Contact' },
  { id: 'review', title: 'Review & Submit' }
];

export default function MultiStepRegistration({ onSubmit, loading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      allergies: '',
      chronicConditions: '',
      emergencyContactName: '',
      emergencyContactRelation: '',
      emergencyContactPhone: ''
    },
    mode: 'onChange'
  });

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (currentStep === 0) {
      fieldsToValidate = ['name', 'email', 'password', 'phone', 'dob', 'gender'];
    } else if (currentStep === 1) {
      fieldsToValidate = ['bloodGroup', 'allergies', 'chronicConditions'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['emergencyContactName', 'emergencyContactRelation', 'emergencyContactPhone'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFinalSubmit = async (data) => {
    const formattedData = {
      ...data,
      allergies: data.allergies ? data.allergies.split(',').map(s => s.trim()) : [],
      chronicConditions: data.chronicConditions ? data.chronicConditions.split(',').map(s => s.trim()) : [],
      emergencyContacts: [
        {
          name: data.emergencyContactName,
          relation: data.emergencyContactRelation,
          phone: data.emergencyContactPhone
        }
      ]
    };
    
    await onSubmit(formattedData);
    setIsSuccess(true);
  };

  // Render Success Screen
  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 text-center space-y-4"
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
          <FiCheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Registration Complete!</h2>
        <p className="text-slate-500">Your patient profile has been securely created. You can now log in to access your records.</p>
        <Button variant="primary" onClick={() => window.location.href = '/login'} className="mt-4">
          Go to Login
        </Button>
      </motion.div>
    );
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors
                ${index <= currentStep ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}
              `}>
                {index < currentStep ? <FiCheckCircle /> : index + 1}
              </div>
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center hidden sm:block
                ${index <= currentStep ? 'text-primary' : 'text-slate-400'}
              `}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form className="flex flex-col min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-grow flex flex-col gap-4"
          >
            {/* STEP 0: Personal */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  icon={<FiUser />}
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })}
                />
                <Input
                  label="Email"
                  type="email"
                  icon={<FiMail />}
                  placeholder="name@example.com"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                  })}
                />
                <Input
                  label="Password"
                  type="password"
                  icon={<FiLock />}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  icon={<FiPhone />}
                  placeholder="+1 555-0100"
                  error={errors.phone?.message}
                  {...register('phone', { required: 'Phone is required' })}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 text-sm font-bold">Date of Birth</label>
                  <input
                    type="date"
                    className={`w-full bg-white border rounded-lg px-4 py-2.5 outline-none transition-colors ${errors.dob ? 'border-danger' : 'border-slate-300'}`}
                    {...register('dob', { required: 'DOB is required' })}
                  />
                  {errors.dob && <span className="text-danger text-xs font-semibold">{errors.dob.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 text-sm font-bold">Gender</label>
                  <select
                    className={`w-full bg-white border rounded-lg px-4 py-2.5 outline-none transition-colors ${errors.gender ? 'border-danger' : 'border-slate-300'}`}
                    {...register('gender', { required: 'Gender is required' })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span className="text-danger text-xs font-semibold">{errors.gender.message}</span>}
                </div>
              </div>
            )}

            {/* STEP 1: Medical Details */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 text-sm font-bold">Blood Group</label>
                  <select
                    className={`w-full bg-white border rounded-lg px-4 py-2.5 outline-none transition-colors ${errors.bloodGroup ? 'border-danger' : 'border-slate-300'}`}
                    {...register('bloodGroup', { required: 'Blood Group is required' })}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                  {errors.bloodGroup && <span className="text-danger text-xs font-semibold">{errors.bloodGroup.message}</span>}
                </div>
                <Input
                  label="Allergies (comma separated)"
                  placeholder="e.g. Peanuts, Penicillin"
                  icon={<FiAlertCircle />}
                  helperText="Leave blank if none."
                  {...register('allergies')}
                />
                <Input
                  label="Chronic Conditions (comma separated)"
                  placeholder="e.g. Hypertension, Diabetes"
                  icon={<FiHeart />}
                  helperText="Leave blank if none."
                  {...register('chronicConditions')}
                />
              </div>
            )}

            {/* STEP 2: Emergency Contact */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-4">
                <div className="bg-orange-50 text-orange-800 p-4 rounded-lg text-sm mb-2 border border-orange-200">
                  <p className="font-bold mb-1">Why do we need this?</p>
                  <p>In case of emergency, first responders scanning your QR code will be able to immediately contact this person.</p>
                </div>
                <Input
                  label="Contact Name"
                  icon={<FiUser />}
                  placeholder="Jane Doe"
                  error={errors.emergencyContactName?.message}
                  {...register('emergencyContactName', { required: 'Emergency contact name is required' })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Relation"
                    placeholder="e.g. Spouse, Parent"
                    error={errors.emergencyContactRelation?.message}
                    {...register('emergencyContactRelation', { required: 'Relation is required' })}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    icon={<FiPhone />}
                    placeholder="+1 555-0999"
                    error={errors.emergencyContactPhone?.message}
                    {...register('emergencyContactPhone', { required: 'Phone is required' })}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 border-b pb-2 mb-2">Personal Details</h4>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Name:</span> {getValues('name')}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Email:</span> {getValues('email')}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">DOB:</span> {getValues('dob')} ({getValues('gender')})</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 border-b pb-2 mb-2">Medical Details</h4>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Blood Type:</span> <span className="font-bold text-red-600">{getValues('bloodGroup')}</span></p>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Allergies:</span> {getValues('allergies') || 'None reported'}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Conditions:</span> {getValues('chronicConditions') || 'None reported'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 border-b pb-2 mb-2">Emergency Contact</h4>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Name:</span> {getValues('emergencyContactName')} ({getValues('emergencyContactRelation')})</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold w-24 inline-block">Phone:</span> {getValues('emergencyContactPhone')}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={handleBack} icon={<FiChevronLeft />} disabled={loading}>
              Back
            </Button>
          ) : (
            <div></div> // Spacer
          )}

          {currentStep < STEPS.length - 1 ? (
            <Button variant="primary" onClick={handleNext} className="flex-row-reverse" icon={<FiChevronRight />}>
              Continue
            </Button>
          ) : (
            <Button variant="primary" isLoading={loading} onClick={handleSubmit(handleFinalSubmit)} className="flex-row-reverse" icon={<FiCheckCircle />}>
              Submit Registration
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
