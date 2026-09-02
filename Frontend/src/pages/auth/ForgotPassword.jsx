import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiArrowLeft, FiActivity } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { sendOtp, forgotPasswordSuccess, loading, error, clearStates } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: ''
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

  useEffect(() => {
    if (forgotPasswordSuccess) {
      toast.success('Simulated OTP code sent! Use 123456 to verify.');
      navigate('/verify-otp');
    }
  }, [forgotPasswordSuccess, navigate]);

  const onSubmit = async (data) => {
    await sendOtp(data.email);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-2">
            <FiActivity className="w-6 h-6" />
          </div>
          <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Reset Password</h1>
          <p className="text-slate-400 text-sm font-medium">
            Enter your email to receive a 6-digit verification code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-xs font-black uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <FiMail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="name@example.com"
                className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email format'
                  }
                })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs font-semibold">{errors.email.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending OTP...
              </>
            ) : (
              'Send OTP Code'
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="flex justify-center mt-2">
          <Link to="/login" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 font-bold transition-colors">
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
