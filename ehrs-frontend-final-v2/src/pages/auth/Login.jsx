import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiActivity, FiArrowRight, FiShield, FiZap, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../utils/api';

export default function Login() {
  const navigate = useNavigate();
  const { login, logout, isAuthenticated, currentUser, loading, error, clearStates } = useAuth();
  const [activeTab, setActiveTab] = useState('patient');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: { email: '', password: '' }
  });

  useEffect(() => { clearStates(); }, [clearStates]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success(`Logged in as ${currentUser.name || 'User'}`);

      // 🌟 PERFECT ROUTING FOR ALL THREE ROLES
      if (currentUser.role === 'patient') {
        navigate(ROUTES.PATIENT.DASHBOARD);
      } else if (currentUser.role === 'doctor') {
        navigate(ROUTES.DOCTOR.DASHBOARD);
      } else if (currentUser.role === 'admin') {
        navigate(ROUTES.ADMIN.DASHBOARD);
      }
    }
  }, [isAuthenticated, currentUser, navigate, logout]);

  useEffect(() => {
    if (error) { toast.error(error); clearStates(); }
  }, [error, clearStates]);

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password, activeTab);
    if (success) clearStates();
  };

  // Helper for demo buttons
  const fillDemo = (email, pass, role) => {
    setValue('email', email);
    setValue('password', pass);
    setActiveTab(role);
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
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center mb-[-0.375rem] z-10 relative px-1">
                        <span />
                        <Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="text-xs text-primary hover:text-sky-600 font-bold transition-colors">
                          Forgot Password?
                        </Link>
                      </div>
                      <Input label="Password" type="password" icon={<FiLock />} placeholder="••••••••" error={errors.password?.message} {...register("password", { required: "Password is required" })} />
                    </div>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full mt-4 justify-center shadow-lg shadow-blue-600/20" isLoading={loading} rightIcon={<FiArrowRight />}>
                    Secure {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login
                  </Button>
                </motion.form>
              </AnimatePresence>
            </div>

            {/* Divider */}
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
                        role: activeTab
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

            <p className="text-slate-500 text-center text-sm font-semibold mt-8">Don't have an account?{' '}<Link to={ROUTES.AUTH.REGISTER} className="text-blue-600 hover:text-blue-700">Create one now</Link></p>

            {/* Demo Login Helper */}

          </motion.div>
        </div>

        {/* Right Panel: Interactive Graphic */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
          {/* Animated Mesh Gradients */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }} />

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiLz48L3N2Zz4=')] opacity-50" />

          <div className="relative z-10 max-w-lg">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <FiShield className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black mb-4 leading-tight tracking-tight">Enterprise-Grade <br/>Medical Security</h2>
              <ul className="flex flex-col gap-4 mt-8">
                <FeatureItem text="SHA-256 Cryptographic Hashing" />
                <FeatureItem text="Decentralized Access Logs" />
                <FeatureItem text="Strict RBAC Verification" />
              </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -bottom-16 -right-12 bg-white rounded-2xl p-6 shadow-2xl rotate-[-5deg]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-slate-800 font-black">System Status</p>
                  <p className="text-emerald-500 font-bold text-sm">All Services Online</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  );
}

function DemoButton({ label, email, onClick }) {
  return (
      <button
          type="button"
          onClick={onClick}
          className="flex flex-col items-start p-3 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-sm hover:shadow-primary/10 transition-all text-left"
      >
        <span className="font-black text-slate-800 text-sm">{label}</span>
        <span className="text-xs text-slate-500">{email}</span>
      </button>
  );
}

function FeatureItem({ text }) {
  return (
      <motion.li
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-slate-300 font-medium"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        {text}
      </motion.li>
  );
}