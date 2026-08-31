import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiActivity, FiArrowRight, FiShield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, currentUser, loading, error, clearStates } = useAuth();
  const [activeTab, setActiveTab] = useState('patient');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  useEffect(() => { clearStates(); }, [clearStates]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success(`Logged in as ${currentUser.email}`);
      const role = currentUser.role?.toLowerCase() || 'patient';

      // Dynamic routing based on role
      if (role === 'admin') navigate(ROUTES.ADMIN.DASHBOARD);
      else if (role === 'doctor') navigate(ROUTES.DOCTOR.DASHBOARD);
      else navigate(ROUTES.PATIENT.DASHBOARD);
    }
  }, [isAuthenticated, currentUser, navigate]);

  useEffect(() => {
    if (error) { toast.error(error); clearStates(); }
  }, [error, clearStates]);

  const onSubmit = async (data) => {
    await login(data.email, data.password, activeTab);
  };

  const formVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, exit: { opacity: 0, x: 20, transition: { duration: 0.2 } } };

  return (
      <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-600/30">

        {/* Left Panel: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative z-10 bg-white shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)] overflow-y-auto">

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-8 left-8 md:left-12">
            <Link to={ROUTES.PUBLIC.HOME} className="text-slate-400 hover:text-blue-600 font-bold text-sm flex items-center gap-2 transition-colors">
              <FiArrowRight className="rotate-180" /> Back to Home
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }} className="w-full max-w-xl mx-auto mt-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <FiActivity className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-slate-800 tracking-tight">EHRS.</span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 font-medium mb-10">Log in to securely access the portal.</p>

            {/* INTERACTIVE 3-WAY ADMIN TAB */}
            <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl w-full mb-8 relative border border-slate-200 shadow-inner overflow-hidden">
              <motion.div
                  className="absolute top-1 bottom-1 w-[calc(33.33%-4px)] bg-white rounded-lg shadow-md"
                  initial={false}
                  animate={{ left: activeTab === 'patient' ? '4px' : activeTab === 'doctor' ? 'calc(33.33%)' : 'calc(66.66% + 2px)' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {['patient', 'doctor', 'admin'].map((tab) => (
                  <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative z-10 py-3 text-sm font-black rounded-lg transition-all capitalize duration-300 ${activeTab === tab ? 'text-blue-600 transform scale-[1.02]' : 'text-slate-500 hover:text-slate-800'}`}>
                    {tab}
                  </button>
              ))}
            </div>

            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.form key={activeTab} variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <Input label="Email Address" type="email" icon={<FiMail />} placeholder="you@example.com" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
                  <div>
                    <Input label="Password" type="password" icon={<FiLock />} placeholder="••••••••" error={errors.password?.message} {...register("password", { required: "Password is required" })} />
                    <div className="flex justify-end mt-2"><Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot password?</Link></div>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full mt-4 justify-center shadow-lg shadow-blue-600/20" isLoading={loading} rightIcon={<FiArrowRight />}>
                    Secure {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login
                  </Button>
                </motion.form>
              </AnimatePresence>
            </div>
            <p className="text-slate-500 text-center text-sm font-semibold mt-8">Don't have an account?{' '}<Link to={ROUTES.AUTH.REGISTER} className="text-blue-600 hover:text-blue-700">Create one now</Link></p>
          </motion.div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>

          <div className="relative z-10 max-w-lg">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6"><FiActivity className="w-6 h-6 text-blue-400" /></div>
              <h2 className="text-3xl font-black mb-4 leading-tight tracking-tight">Your Health Data,<br/>Unified.</h2>
              <p className="text-slate-300 font-medium mb-8 leading-relaxed">Consolidate your medical history, allergies, and emergency contacts into a single cryptographic QR token for immediate access by first responders.</p>

              <div className="flex gap-4">
                <div className="flex -space-x-4"><div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-200"></div><div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-300"></div><div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-400"></div></div>
                <div className="flex flex-col justify-center"><span className="font-bold text-sm">5M+ Patients</span><span className="text-xs text-slate-400">Secured globally</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: 'spring' }} className="absolute -top-12 -right-12 bg-white rounded-2xl p-6 shadow-2xl rotate-[5deg]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><FiShield className="w-6 h-6 text-blue-600" /></div>
                <div><p className="text-slate-800 font-black">HIPAA Compliant</p><p className="text-slate-500 font-bold text-sm">Audited & Verified</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  );
}