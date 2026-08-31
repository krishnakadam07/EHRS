import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiLock, FiActivity, FiArrowLeft } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const { verifyOtp, otpVerified, loading, error, clearStates } = useAuth();
  const [timer, setTimer] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      otp: ''
    }
  });

  // Countdown timer logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    clearStates();
  }, [clearStates]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (otpVerified) {
      toast.success('Identity verified! Your password reset is complete.');
    }
  }, [otpVerified]);

  const onSubmit = async (data) => {
    await verifyOtp(data.otp);
  };

  const handleResend = () => {
    setTimer(60);
    toast.success('A new verification code has been sent!');
  };

  if (otpVerified) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-8 flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2 animate-float">
            <FiCheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Verification Success</h1>
          <p className="text-slate-400 text-sm font-medium">
            Your credentials have been verified and your password was successfully reset. You can now access your account.
          </p>
          <Link to="/login" className="btn-primary w-full py-3 text-sm font-bold text-center">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-2">
            <FiActivity className="w-6 h-6" />
          </div>
          <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Enter OTP Code</h1>
          <p className="text-slate-400 text-sm font-medium">
            Please enter the 6-digit verification code sent to your email.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5 text-center text-xs text-sky-700 font-semibold leading-relaxed">
          Demo verification code: <span className="font-extrabold underline text-sky-800">123456</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-xs font-black uppercase tracking-wider">Verification Code</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <FiLock className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                className={`input-field pl-10 tracking-[0.25em] text-center font-extrabold text-base ${
                  errors.otp ? 'border-red-500 focus:border-red-500' : ''
                }`}
                {...register('otp', {
                  required: 'OTP code is required',
                  minLength: {
                    value: 6,
                    message: 'Verification code must be 6 digits'
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Verification code must only contain digits'
                  }
                })}
              />
            </div>
            {errors.otp && (
              <span className="text-red-500 text-xs font-semibold">{errors.otp.message}</span>
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
                Verifying...
              </>
            ) : (
              'Verify & Authenticate'
            )}
          </button>
        </form>

        {/* Resend Actions */}
        <div className="flex flex-col items-center gap-1.5">
          {timer > 0 ? (
            <span className="text-xs text-slate-400 font-bold">
              Resend code in <span className="text-slate-600 font-black">{timer}s</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-xs text-sky-500 hover:text-sky-600 font-black"
            >
              Resend Code
            </button>
          )}
          <Link to="/login" className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 font-bold mt-2">
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
