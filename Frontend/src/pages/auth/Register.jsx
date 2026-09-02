import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiPhone, FiActivity, FiBriefcase, FiAward, FiHome } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import MultiStepRegistration from './MultiStepRegistration';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register: registerApi, loading, error, clearStates } = useAuth();
  const [selectedRole, setSelectedRole] = useState('patient');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      specialty: '',
      hospital: '',
      licenseNumber: ''
    }
  });

  useEffect(() => {
    clearStates();
  }, [clearStates]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onRoleChange = (role) => {
    setSelectedRole(role);
    clearStates();
    reset();
  };

  const handlePatientSubmit = async (data) => {
    const success = await registerApi({ ...data, role: 'patient' });
    if (success) {
      // toast.success is handled inside the form or wrapper
    }
  };

  const handleDoctorSubmit = async (data) => {
    const success = await registerApi({ ...data, role: 'doctor' });
    if (success) {
      toast.success('Registration submitted. Pending admin verification of your medical license.');
      navigate('/login');
    }
  };

  return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none mix-blend-multiply opacity-30" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />

        <Card className="w-full max-w-2xl border-0 shadow-2xl shadow-slate-200/50 sm:border sm:border-slate-200 relative z-10 glass-panel">
          <Card.Body>
            <div className="flex flex-col gap-6">
              {/* Brand Header */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-primary/30 mb-2 border border-white/20">
                  <FiActivity className="w-7 h-7" />
                </div>
                <h1 className="text-slate-900 font-extrabold text-3xl tracking-tight">Create Account</h1>
                <p className="text-slate-500 text-sm font-medium">Join the Emergency EHR Network</p>
              </div>

              {/* Role Toggle Tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mx-auto w-full max-w-sm">
                <button
                    type="button"
                    onClick={() => onRoleChange('patient')}
                    className={`py-2 text-sm font-black rounded-lg transition-all ${
                        selectedRole === 'patient'
                            ? 'bg-white text-sky-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  Patient Profile
                </button>
                <button
                    type="button"
                    onClick={() => onRoleChange('doctor')}
                    className={`py-2 text-sm font-black rounded-lg transition-all ${
                        selectedRole === 'doctor'
                            ? 'bg-white text-emerald-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  Doctor Registration
                </button>
              </div>

              {/* Forms Wrapper */}
              <div className="mt-4">
                {selectedRole === 'patient' ? (
                    <MultiStepRegistration onSubmit={handlePatientSubmit} loading={loading} />
                ) : (
                    <form onSubmit={handleSubmit(handleDoctorSubmit)} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            icon={<FiUser />}
                            placeholder="Dr. John Doe"
                            error={errors.name?.message}
                            {...register('name', { required: 'Full name is required' })}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            icon={<FiMail />}
                            placeholder="doctor@example.com"
                            error={errors.email?.message}
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email format'
                              }
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
                            {...register('phone', { required: 'Phone number is required' })}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4 mt-2">
                        <Input
                            label="Specialty"
                            icon={<FiBriefcase />}
                            placeholder="Cardiology"
                            error={errors.specialty?.message}
                            {...register('specialty', { required: 'Specialty is required' })}
                        />
                        <Input
                            label="Hospital"
                            icon={<FiHome />}
                            placeholder="General Hospital"
                            error={errors.hospital?.message}
                            {...register('hospital', { required: 'Hospital name is required' })}
                        />
                        <Input
                            label="License ID"
                            icon={<FiAward />}
                            placeholder="MD-12345"
                            error={errors.licenseNumber?.message}
                            {...register('licenseNumber', { required: 'License ID is required' })}
                        />
                      </div>

                      <Button
                          type="submit"
                          variant="primary"
                          fullWidth
                          isLoading={loading}
                          className="mt-6 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Submit Doctor Application
                      </Button>
                    </form>
                )}
              </div>

              {/* Footer Link */}
              <p className="text-slate-500 text-center text-xs font-semibold mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-sky-500 hover:text-sky-600 font-black">
                  Sign In
                </Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
  );
}
