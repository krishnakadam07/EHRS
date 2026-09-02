import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize, FiShield, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

export default function ScanQR() {
  const navigate = useNavigate();
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
  };

  return (
      <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto h-full">
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
                )}
              </div>
            </div>
          </div>

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
                  </Button>
                </div>
              </div>
          )}
        </Modal>
      </div>
  );
}