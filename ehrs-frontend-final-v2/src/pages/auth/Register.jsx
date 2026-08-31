import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiPhone, FiActivity, FiBriefcase, FiAward, FiHome, FiArrowRight, FiShield, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import MultiStepRegistration from './MultiStepRegistration';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../utils/api';

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
        defaultValues: { name: '', email: '', password: '', phone: '', specialty: '', hospital: '', licenseNumber: '' }
    });

    useEffect(() => { clearStates(); }, [clearStates]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const onRoleChange = (role) => {
        setSelectedRole(role);
        clearStates();
        reset();
    };

    // 🌟 FIX APPLIED HERE: Map frontend names to backend names!
    const handlePatientSubmit = async (data) => {
        const mappedData = {
            ...data,
            dateOfBirth: data.dob,         // Maps 'dob' to 'dateOfBirth'
            bloodType: data.bloodGroup,    // Maps 'bloodGroup' to 'bloodType'
            role: 'patient'
        };

        const success = await registerApi(mappedData);
        if (success) {
            // toast handled in wrapper
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
        <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-primary/30">

            {/* Left Panel: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative z-10 bg-white shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)] overflow-y-auto">

                {/* Back to home */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-8 left-8 md:left-12">
                    <Link to={ROUTES.PUBLIC.HOME} className="text-slate-400 hover:text-primary font-bold text-sm flex items-center gap-2 transition-colors">
                        <FiArrowRight className="rotate-180" /> Back to Home
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                    className="w-full max-w-xl mx-auto mt-12"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-tr from-primary to-emerald-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                            <FiActivity className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-slate-800 tracking-tight">EHRS<span className="text-primary">.</span></span>
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 font-medium mb-10">Join the decentralized Emergency Health Record network.</p>

                    {/* Role Toggle Tabs */}
                    <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl w-full mb-8 relative">
                        <motion.div
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                            initial={false}
                            animate={{ left: selectedRole === 'patient' ? '4px' : 'calc(50%)' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            type="button"
                            onClick={() => onRoleChange('patient')}
                            className={`relative z-10 py-3 text-sm font-black rounded-lg transition-colors ${
                                selectedRole === 'patient' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Patient Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => onRoleChange('doctor')}
                            className={`relative z-10 py-3 text-sm font-black rounded-lg transition-colors ${
                                selectedRole === 'doctor' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Doctor Registration
                        </button>
                    </div>

                    {/* Forms Wrapper */}
                    <div className="min-h-[400px]">
                        {selectedRole === 'patient' ? (
                            <motion.div key="patient" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                                <MultiStepRegistration onSubmit={handlePatientSubmit} loading={loading} />
                            </motion.div>
                        ) : (
                            <motion.form key="doctor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit(handleDoctorSubmit)} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        icon={<FiUser className="w-4 h-4"/>}
                                        placeholder="Dr. Jane Smith"
                                        error={errors.name?.message}
                                        {...register('name', { required: 'Full name is required' })}
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        icon={<FiMail className="w-4 h-4"/>}
                                        placeholder="jane.smith@hospital.org"
                                        error={errors.email?.message}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid format' }
                                        })}
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        icon={<FiLock className="w-4 h-4"/>}
                                        placeholder="••••••••"
                                        error={errors.password?.message}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: { value: 6, message: 'Min 6 characters' }
                                        })}
                                    />
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        icon={<FiPhone className="w-4 h-4"/>}
                                        placeholder="+1 555-0100"
                                        error={errors.phone?.message}
                                        {...register('phone', { required: 'Phone number is required' })}
                                    />
                                </div>

                                <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col gap-4">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Professional Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input
                                            label="Specialty"
                                            icon={<FiBriefcase className="w-4 h-4"/>}
                                            placeholder="Cardiology"
                                            error={errors.specialty?.message}
                                            {...register('specialty', { required: 'Specialty required' })}
                                        />
                                        <Input
                                            label="Hospital"
                                            icon={<FiHome className="w-4 h-4"/>}
                                            placeholder="General Hosp."
                                            error={errors.hospital?.message}
                                            {...register('hospital', { required: 'Hospital required' })}
                                        />
                                        <Input
                                            label="License ID"
                                            icon={<FiAward className="w-4 h-4"/>}
                                            placeholder="MD-12345"
                                            error={errors.licenseNumber?.message}
                                            {...register('licenseNumber', { required: 'License required' })}
                                        />
                                    </div>
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
                                    <Button type="submit" variant="primary" fullWidth isLoading={loading} className="py-4 text-lg bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 border-emerald-600">
                                        Submit Application
                                    </Button>
                                </motion.div>
                                <p className="text-xs text-slate-400 text-center font-medium mt-2">
                                    Your medical license will be manually verified by administrators before account activation.
                                </p>
                            </motion.form>
                        )}
                    </div>


                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500 font-bold uppercase tracking-widest text-xs">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const response = await api.post('/auth/google', {
                                        token: credentialResponse.credential,
                                        role: selectedRole
                                    });
                                    const token = response.data.token;
                                    localStorage.setItem('ehr_jwt_token', token);

                                    // Decode JWT to get role and email
                                    const payload = JSON.parse(atob(token.split('.')[1]));
                                    const user = {
                                        email: payload.sub,
                                        role: payload.role.toLowerCase(),
                                        name: 'Google User',
                                        id: 'google-auth'
                                    };
                                    localStorage.setItem('ehr_current_user', JSON.stringify(user));

                                    // Reload so Redux picks it up and routes correctly
                                    window.location.reload();
                                } catch (error) {
                                    toast.error("Google Authentication Failed");
                                }
                            }}
                            onError={() => {
                                toast.error('Google Login Failed');
                            }}
                            useOneTap
                            shape="pill"
                            size="large"
                            width="300px"
                        />
                    </div>

                    <p className="text-slate-500 text-center text-sm font-semibold mt-10">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-sky-600 font-black transition-colors">
                            Sign In
                        </Link>
                    </p>

                </motion.div>
            </div>

            {/* Right Panel: Interactive Graphic */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                {/* Animated Mesh Gradients */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none" style={{ animationDelay: '4s' }} />

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiLz48L3N2Zz4=')] opacity-50" />

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl"
                    >
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                            <FiActivity className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 leading-tight tracking-tight">Your Health Data,<br/>Unified.</h2>
                        <p className="text-slate-300 font-medium mb-8 leading-relaxed">
                            Consolidate your medical history, allergies, and emergency contacts into a single cryptographic QR token for immediate access by first responders.
                        </p>

                        <div className="flex gap-4">
                            <div className="flex -space-x-4">
                                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-200"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-300"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-400"></div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-bold text-sm">5M+ Patients</span>
                                <span className="text-xs text-slate-400">Secured globally</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        className="absolute -top-12 -right-12 bg-white rounded-2xl p-6 shadow-2xl rotate-[5deg]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <FiShield className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-slate-800 font-black">HIPAA Compliant</p>
                                <p className="text-slate-500 font-bold text-sm">Audited & Verified</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}