import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
<<<<<<< HEAD
import { FiMaximize, FiShield, FiAlertCircle, FiCheckCircle, FiCrosshair, FiLock, FiAlertTriangle, FiUnlock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ROUTES } from '../../routes/routeConstants';
import useAuth from '../../hooks/useAuth';
import api from '../../utils/api';
=======
import { FiMaximize, FiShield, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

export default function ScanQR() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { currentUser } = useAuth();

  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const [isBreakGlassOpen, setIsBreakGlassOpen] = useState(false);
  const [overrideData, setOverrideData] = useState({ patientId: '', reason: '' });
  const [isForcingAccess, setIsForcingAccess] = useState(false);

  useEffect(() => {
    if (!isScanning || scannedData || isDecrypting || isBreakGlassOpen) return;

    let html5QrCode;
    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("reader");
        await html5QrCode.start(
            { facingMode: "environment" }, { fps: 15, qrbox: { width: 280, height: 280 } },
            (decodedText) => {
              if (decodedText.includes('EHRS') || decodedText.includes('localhost')) {
                handleScanSuccess(decodedText);
              }
            }, () => {}
        );
      } catch (err) {
        setError("Camera initialization failed. Check permissions.");
      }
    };
    startScanner();
    return () => { if (html5QrCode?.isScanning) { html5QrCode.stop().then(() => html5QrCode.clear()); } };
  }, [isScanning, scannedData, isDecrypting, isBreakGlassOpen]);

  const handleScanSuccess = (data) => {
    setIsScanning(false);
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      const parts = data.split('/');
      const extractedId = parts[parts.length - 1] || "PT-VERIFIED";
      setScannedData({ patientId: extractedId, timestamp: new Date().toLocaleTimeString(), method: 'QR_SCAN' });
    }, 1500);
  };

  const handleBreakGlassSubmit = async (e) => {
    e.preventDefault();
    if (!overrideData.patientId || !overrideData.reason) {
      toast.error("You must provide both a Patient ID and a valid reason.");
      return;
    }

    setIsForcingAccess(true);
    try {
      await api.post('/emergency/break-glass', {
        patientId: overrideData.patientId,
        doctorEmail: currentUser.email,
        reason: overrideData.reason
      });

      toast.success("Emergency Override Successful. Audit Logged.");
      setIsBreakGlassOpen(false);

      // NAVIGATE STRAIGHT TO FULL FILE (Triggers SMS in DoctorController)
      navigate(ROUTES.DOCTOR.PATIENT_DETAILS, {
        state: { patientId: overrideData.patientId }
      });

    } catch (err) {
      toast.error(err.response?.data || "Failed to force access. Invalid Patient ID.");
    } finally {
      setIsForcingAccess(false);
    }
=======
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning || scannedData) return;

    let html5QrCode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        await html5QrCode.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
              // Success Callback
              if (decodedText.startsWith('EHRS-ACCESS::')) {
                handleScanSuccess(decodedText);
              } else {
                setError("Invalid QR Code. Please scan a valid EHRS Medical Identity Card.");
              }
            },
            () => {} // Ignore frame errors
        );
      } catch (err) {
        setError("Camera access denied or device not supported. Please enable camera permissions.");
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => html5QrCode.clear()).catch(console.error);
      }
    };
  }, [isScanning, scannedData]);

  const handleScanSuccess = (data) => {
    setIsScanning(false);

    // Parse Payload: EHRS-ACCESS::PT-10492::TOKEN-xyz
    const parts = data.split('::');
    const patientId = parts[1]; // Extracts "PT-10492"

    setScannedData({
      patientId: patientId,
      timestamp: new Date().toLocaleTimeString(),
      raw: data
    });
  };

  const handleAccessProfile = () => {
    // 🌟 FIX: Navigate to the DOCTOR'S Patient Details page, passing the scanned ID!
    navigate(ROUTES.DOCTOR.PATIENT_DETAILS, {
      state: { patientId: scannedData.patientId }
    });
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
  };

  return (
      <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto h-full">
<<<<<<< HEAD
        <PageHeader title="Medical Scanner" subtitle="Scan cryptographic tokens or use Emergency Override for unconscious patients." />

        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[500px]">

          <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(15,23,42,0.5)] ring-4 ring-slate-800">

            {error && (
                <div className="absolute inset-0 z-30 bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
                  <FiAlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
                  <p className="text-white font-black uppercase tracking-widest mb-6">{error}</p>
                  <Button variant="primary" onClick={() => { setError(null); setIsScanning(true); }}>Reboot Scanner</Button>
                </div>
            )}

            <AnimatePresence>
              {isDecrypting && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 bg-emerald-900/90 backdrop-blur-md flex flex-col items-center justify-center">
                    <FiLock className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-black text-white tracking-widest uppercase animate-pulse">Decrypting</h2>
                    <p className="text-emerald-300 font-mono text-sm mt-2">Bypassing Zero-Knowledge Proofs...</p>
                  </motion.div>
              )}
            </AnimatePresence>

            <div id="reader" className="w-full h-full object-cover"></div>
            <div className="absolute inset-0 pointer-events-none z-10 border-[50px] border-slate-900/80 backdrop-blur-[2px]" />

            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
              <div className="w-[280px] h-[280px] relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-sky-400 rounded-tl-2xl" />
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-sky-400 rounded-tr-2xl" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-sky-400 rounded-bl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-sky-400 rounded-br-2xl" />
                <FiCrosshair className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-sky-400/30" />
                {!scannedData && !error && !isDecrypting && (
                    <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-1 bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,1)] z-20" />
=======
        <PageHeader
            title="Scan Patient QR"
            subtitle="Align the patient's Medical Identity QR code within the frame to securely access their emergency profile."
        />

        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[500px]">
          {/* Scanner Container */}
          <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-slate-900/50">

            {error && (
                <div className="absolute inset-0 z-20 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center">
                  <FiAlertCircle className="w-12 h-12 text-danger mb-4" />
                  <p className="text-white font-medium mb-6">{error}</p>
                  <Button variant="primary" onClick={() => { setError(null); setIsScanning(true); setScannedData(null); }}>
                    Try Again
                  </Button>
                </div>
            )}

            <div id="reader" className="w-full h-full object-cover"></div>
            <div className="absolute inset-0 pointer-events-none z-10 border-[60px] border-slate-900/70" />

            {/* Targeting Brackets */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
              <div className="w-[250px] h-[250px] relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

                {!scannedData && !error && (
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-0.5 bg-primary shadow-[0_0_15px_rgba(14,165,233,1)] z-20"
                    />
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
                )}
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="mt-12 text-center max-w-sm w-full">
            <button
                onClick={() => { setIsScanning(false); setIsBreakGlassOpen(true); }}
                className="w-full flex items-center justify-center gap-3 bg-red-950/30 border border-red-500/50 hover:bg-red-600 hover:border-red-600 text-red-500 hover:text-white rounded-2xl py-4 font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
            >
              <FiAlertTriangle className="w-5 h-5 animate-pulse" />
              Break Glass Override
            </button>
            <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">For Unconscious Patients Only</p>
          </div>
        </div>

        <Modal isOpen={isBreakGlassOpen} onClose={() => { setIsBreakGlassOpen(false); setIsScanning(true); }} size="md">
          <div className="bg-slate-900 -m-6 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-600/10 animate-pulse pointer-events-none" />
            <div className="relative z-10 flex flex-col">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                <div className="w-14 h-14 bg-red-500/20 text-red-500 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  <FiUnlock className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider">Force Access</h2>
                  <p className="text-red-400 font-mono text-xs mt-1">System Audit Logging Active</p>
                </div>
              </div>

              <form onSubmit={handleBreakGlassSubmit} className="flex flex-col gap-5">
                <div className="bg-red-950/50 border border-red-900/50 rounded-xl p-4 flex gap-3 mb-2">
                  <FiAlertTriangle className="text-red-500 w-6 h-6 shrink-0 mt-1" />
                  <p className="text-sm text-red-200 leading-relaxed font-medium">
                    <strong>WARNING:</strong> You are overriding privacy protocols. A real-time alert will be sent to the patient's device, and this action will be permanently logged for Admin review.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Patient ID Number</label>
                  <input
                      type="text"
                      required
                      placeholder="e.g. PT-42"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 font-mono text-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                      value={overrideData.patientId}
                      onChange={(e) => setOverrideData({...overrideData, patientId: e.target.value.toUpperCase()})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Clinical Justification (Reason)</label>
                  <textarea
                      required
                      rows="3"
                      placeholder="State the medical emergency requiring forced access..."
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none resize-none"
                      value={overrideData.reason}
                      onChange={(e) => setOverrideData({...overrideData, reason: e.target.value})}
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => { setIsBreakGlassOpen(false); setIsScanning(true); }} className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isForcingAccess} className="flex-1 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all uppercase tracking-widest disabled:opacity-50">
                    {isForcingAccess ? 'Overriding...' : 'Force Unlock'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <Modal isOpen={!!scannedData} onClose={() => { setScannedData(null); setIsScanning(true); }} size="md">
          {scannedData && (
              <div className="flex flex-col items-center text-center p-6 bg-slate-900 rounded-3xl border border-slate-800">
                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <FiCheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Identity Decrypted</h2>

                <div className="flex flex-col gap-4 w-full mt-8">
                  <Button variant="primary" size="lg" fullWidth onClick={() => navigate(ROUTES.DOCTOR.PATIENT_DETAILS, { state: { patientId: scannedData.patientId } })} icon={<FiShield />} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black border-none">
                    Access Full Patient File
=======
          <div className="mt-8 text-center max-w-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 text-slate-500 mb-4">
              <FiMaximize className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-500">
              Position the QR code inside the box. Scanning will start automatically.
            </p>
          </div>
        </div>

        {/* Success Modal */}
        <Modal isOpen={!!scannedData} onClose={() => { setScannedData(null); setIsScanning(true); }} size="md">
          {scannedData && (
              <div className="flex flex-col items-center text-center p-4">
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4"
                >
                  <FiCheckCircle className="w-10 h-10" />
                </motion.div>

                <h2 className="text-2xl font-black text-slate-800 mb-2">Verification Success</h2>
                <p className="text-sm text-slate-500 mb-6">Patient identity confirmed via cryptographic token.</p>

                <div className="w-full bg-slate-50 rounded-xl p-4 flex flex-col gap-3 mb-8 border border-slate-100">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient ID</span>
                    <span className="font-black text-slate-800">{scannedData.patientId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scanned At</span>
                    <span className="font-bold text-slate-700">{scannedData.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  {/* 🌟 Now this button navigates to the Doctor's Patient Details page! */}
                  <Button variant="primary" size="lg" fullWidth onClick={handleAccessProfile} icon={<FiShield />}>
                    Access Emergency Profile
                  </Button>
                  <Button variant="outline" fullWidth onClick={() => { setScannedData(null); setIsScanning(true); }}>
                    Cancel & Scan Another
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
                  </Button>
                </div>
              </div>
          )}
        </Modal>
      </div>
  );
}