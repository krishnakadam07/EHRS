import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiActivity } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, currentUser, loading, error, clearStates } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Clear errors when entering login page
  useEffect(() => {
    clearStates();
  }, [clearStates]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success(`Logged in as ${currentUser.name}`);
      if (currentUser.role === 'patient') navigate(ROUTES.PATIENT.DASHBOARD);
      else if (currentUser.role === 'doctor') navigate(ROUTES.DOCTOR.DASHBOARD);
      else if (currentUser.role === 'admin') navigate(ROUTES.ADMIN.DASHBOARD);
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Show error toast if authSlice updates with an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) {
      clearStates();
    }
  };

  return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none mix-blend-multiply opacity-30" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />

        <Card className="w-full max-w-md border-0 shadow-2xl shadow-slate-200/50 sm:border sm:border-slate-200 relative z-10 glass-panel">
          <Card.Body noPadding>
            <div className="p-8 flex flex-col gap-6">
              {/* Brand Header */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center text-white shadow-lg shadow-primary/30 mb-2 border border-white/20">
                  <FiActivity className="w-7 h-7" />
                </div>
                <h1 className="text-slate-900 font-extrabold text-3xl tracking-tight">Welcome Back</h1>
                <p className="text-slate-500 text-sm font-medium">Access your Emergency Health Record Portal</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="patient@ehr.com or doctor@ehr.com"
                    icon={<FiMail className="w-4 h-4" />}
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address format'
                      }
                    })}
                />

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center mb-[-0.375rem] z-10 relative px-1">
                    <span /> {/* Spacer */}
                    <Link to="/forgot-password" className="text-xs text-sky-500 hover:text-sky-600 font-bold">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      icon={<FiLock className="w-4 h-4" />}
                      error={errors.password?.message}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters long'
                        }
                      })}
                  />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={loading}
                    className="mt-2"
                >
                  Sign In
                </Button>
              </form>

              {/* Demo Accounts Panel */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">Demo Accounts:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex flex-col border border-slate-200/50 bg-white rounded-lg p-2">
                    <span className="font-bold text-slate-700">Patient:</span>
                    <span className="text-[10px] text-slate-500">patient@ehr.com</span>
                    <span className="text-[10px] text-slate-500">Pass: password123</span>
                  </div>
                  <div className="flex flex-col border border-slate-200/50 bg-white rounded-lg p-2">
                    <span className="font-bold text-slate-700">Doctor (Verified):</span>
                    <span className="text-[10px] text-slate-500">doctor@ehr.com</span>
                    <span className="text-[10px] text-slate-500">Pass: password123</span>
                  </div>
                  <div className="flex flex-col border border-slate-200/50 bg-white rounded-lg p-2">
                    <span className="font-bold text-slate-700">Doctor (Unverified):</span>
                    <span className="text-[10px] text-slate-500">cameron@ehr.com</span>
                    <span className="text-[10px] text-slate-500">Pass: password123</span>
                  </div>
                  <div className="flex flex-col border border-slate-200/50 bg-white rounded-lg p-2">
                    <span className="font-bold text-slate-700">Admin:</span>
                    <span className="text-[10px] text-slate-500">admin@ehr.com</span>
                    <span className="text-[10px] text-slate-500">Pass: password123</span>
                  </div>
                </div>
              </div>

              {/* Footer Link */}
              <p className="text-slate-500 text-center text-xs font-semibold">
                Don't have an account?{' '}
                <Link to="/register" className="text-sky-500 hover:text-sky-600 font-black">
                  Sign Up
                </Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
  );
}
