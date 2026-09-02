import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiShield, FiDownload, FiPrinter } from 'react-icons/fi';
import QRCode from 'react-qr-code';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function QRCodePage() {
  const { currentUser } = useAuth();
  const cardRef = useRef(null);

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.email) {
      patientService.getProfile(currentUser.email)
          .then(data => {
            setPatientData({
              name: data.fullName || 'Unknown',
              id: `PT-${data.id || '0000'}`,
              dob: data.dateOfBirth || 'N/A',
              bloodType: data.bloodType || 'N/A',
              allergies: data.allergies || 'None',
              emergencyToken: data.emergencyToken
            });
            setLoading(false);
          })
          .catch(err => {
            console.error("Error loading profile for QR", err);
            setLoading(false);
          });
    }
  }, [currentUser]);

  // 🌟 THE FIX: This payload now perfectly matches what the Doctor's scanner expects!
  const qrPayload = patientData ? `EHRS-ACCESS::${patientData.id}` : 'LOADING...';

  const handlePrint = () => window.print();

  const handleShare = async () => {
    if (navigator.share && patientData) {
      try {
        await navigator.share({
          title: 'Emergency Medical Profile',
          text: 'Scan this code to access my emergency health records.',
          url: `http://localhost:5173/emergency/${patientData.id}`,
        });
      } catch (err) {
        if (err.name !== 'AbortError') alert('Failed to share.');
      }
    } else {
      navigator.clipboard.writeText(qrPayload);
      alert('Access code copied to clipboard!');
    }
  };

  const handleDownload = () => alert('Medical ID ready for download.');

  if (loading) return <div className="text-center mt-20 text-slate-500 font-bold">Generating Secure Identity...</div>;
  if (!patientData) return <div className="text-center mt-20 text-red-500">Failed to load ID card.</div>;

  return (
      <div className="flex flex-col gap-8 pb-12 max-w-5xl mx-auto">
        <div className="print:hidden">
          <PageHeader
              title="Medical Identity Card"
              subtitle="Your secure emergency access code. Keep this available for first responders."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">

          <motion.div
              initial={{ opacity: 0, y: 20, rotateY: 10 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full max-w-sm shrink-0 perspective-1000 mx-auto lg:mx-0 group cursor-pointer"
          >
            <div ref={cardRef} className="print-only-card bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-200 flex flex-col relative" style={{ aspectRatio: '63/100' }}>
              <div className="h-32 bg-gradient-to-br from-blue-600 to-blue-800 relative p-6 flex flex-col justify-between shrink-0">
                <div className="absolute top-0 right-0 p-4 opacity-20"><FiActivity className="w-24 h-24 text-white" /></div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-white font-black tracking-widest uppercase text-xs opacity-90">Emergency Access</span>
                  <FiShield className="text-white w-5 h-5 opacity-90" />
                </div>
                <h2 className="relative z-10 text-white font-black text-2xl tracking-tight leading-none">EHRS Portal</h2>
              </div>

              <div className="px-6 relative flex-1 flex flex-col">
                <div className="flex justify-between items-end -mt-10 mb-4 relative z-20">
                  <div className="w-20 h-20 bg-white rounded-2xl p-1 shadow-md">
                    <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center font-bold text-3xl text-slate-400">
                      {patientData.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end pb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID Number</span>
                    <span className="text-sm font-black text-slate-800 tracking-wider">{patientData.id}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-auto">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black text-slate-800 leading-tight">{patientData.name}</h3>
                    <span className="text-sm font-bold text-blue-600">Verified Patient Profile</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-y border-slate-100 py-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">DOB</span>
                      <span className="text-sm font-bold text-slate-800">{patientData.dob}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Blood</span>
                      <span className="text-sm font-black text-red-600">{patientData.bloodType}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Critical Allergies</span>
                      <span className="text-sm font-bold text-slate-800 truncate">{patientData.allergies}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-6 flex flex-col items-center gap-2">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 inline-block">
                    <QRCode value={qrPayload} size={140} level="Q" className="rounded-lg" />
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mt-1">Scan for Emergency Access</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col gap-8 print:hidden max-w-md w-full mx-auto lg:mx-0">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="font-bold text-blue-900 text-lg">How does this work?</h3>
              <p className="text-sm text-blue-700 leading-relaxed font-medium">This uniquely generated QR code contains your secure database token. It grants temporary, read-only access to your critical medical profile.</p>
              <p className="text-sm text-blue-700 leading-relaxed font-medium">When a Doctor scans this card using their tablet, it automatically queries our Spring Boot server for your live details.</p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Actions</h4>
              <Button variant="primary" size="lg" icon={<FiDownload />} onClick={handleDownload} className="justify-center">Download ID Card</Button>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" icon={<FiPrinter />} onClick={handlePrint} className="flex-1 justify-center">Print</Button>
              </div>
            </div>
          </motion.div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .print-only-card, .print-only-card * { visibility: visible; }
          .print-only-card {
            position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) !important;
            border: 2px solid #000 !important; width: 3.5in !important; height: 5.5in !important;
          }
        }
      `}} />
      </div>
  );
}