import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiFileText, FiMapPin, FiShield, FiAlertTriangle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

// Mock Pending Doctors
const MOCK_PENDING = [
  { id: 'DR-REQ-101', name: 'Dr. Sarah Jenkins', license: 'MED-77281-NY', hospital: 'Metro General Hospital', specialty: 'Emergency Medicine', submitted: '2 hours ago' },
  { id: 'DR-REQ-102', name: 'Dr. Robert Smith', license: 'MED-99212-CA', hospital: 'Westside Clinic', specialty: 'General Practice', submitted: '5 hours ago' },
  { id: 'DR-REQ-103', name: 'Dr. Emily Chen', license: 'MED-44123-TX', hospital: 'Texas Heart Institute', specialty: 'Cardiology', submitted: '1 day ago' },
];

export default function VerifyDoctors() {
  const [pendingList, setPendingList] = useState(MOCK_PENDING);
  const [activeModal, setActiveModal] = useState(null); // { type: 'Approve' | 'Reject', doctor: obj }

  const handleAction = () => {
    // Simulate API call to approve/reject
    setPendingList(prev => prev.filter(d => d.id !== activeModal.doctor.id));
    setActiveModal(null);
  };

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-5xl mx-auto">
      <PageHeader 
        title="Verify Doctors" 
        subtitle="Review medical credentials and grant cryptographic network access."
      />

      {/* Info Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex gap-4">
         <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
            <FiShield className="w-5 h-5" />
         </div>
         <div className="flex flex-col">
            <h4 className="text-sm font-bold text-sky-900 mb-1">Strict Verification Required</h4>
            <p className="text-xs text-sky-800 font-medium leading-relaxed max-w-3xl">
               Approving a doctor grants them the ability to scan patient QR codes and author immutable prescriptions. You must physically verify their medical license against the national registry before approval.
            </p>
         </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4 mt-2">
         <AnimatePresence>
            {pendingList.length === 0 ? (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200 shadow-sm"
               >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mb-4">
                     <FiCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">All Caught Up!</h3>
                  <p className="text-slate-500">There are no pending doctor verifications at this time.</p>
               </motion.div>
            ) : (
               pendingList.map(doctor => (
                  <motion.div 
                     key={doctor.id}
                     layout
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                     <div className="flex flex-col md:flex-row gap-6 md:items-center flex-1">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-2xl font-black text-slate-400 flex items-center justify-center shrink-0">
                           {doctor.name.charAt(4)}
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                           <div className="flex items-center gap-3">
                              <h3 className="text-xl font-black text-slate-800">{doctor.name}</h3>
                              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                                 {doctor.submitted}
                              </span>
                           </div>
                           <p className="text-sm font-bold text-primary">{doctor.specialty}</p>
                           
                           <div className="flex flex-wrap items-center gap-4 mt-3">
                              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                 <FiFileText className="text-slate-400" /> {doctor.license}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                 <FiMapPin className="text-slate-400" /> {doctor.hospital}
                              </span>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                        <Button 
                           variant="outline" 
                           icon={<FiX />} 
                           className="flex-1 lg:flex-none text-red-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                           onClick={() => setActiveModal({ type: 'Reject', doctor })}
                        >
                           Reject
                        </Button>
                        <Button 
                           variant="primary" 
                           icon={<FiCheck />} 
                           className="flex-1 lg:flex-none shadow-lg shadow-primary/20"
                           onClick={() => setActiveModal({ type: 'Approve', doctor })}
                        >
                           Approve
                        </Button>
                     </div>
                  </motion.div>
               ))
            )}
         </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      <Modal 
         isOpen={!!activeModal} 
         onClose={() => setActiveModal(null)}
         size="sm"
      >
         {activeModal && (
            <div className="flex flex-col gap-4 p-2">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeModal.type === 'Approve' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {activeModal.type === 'Approve' ? <FiShield className="w-6 h-6" /> : <FiAlertTriangle className="w-6 h-6" />}
               </div>
               
               <h3 className="text-2xl font-black text-slate-800">
                  {activeModal.type} {activeModal.doctor.name}?
               </h3>
               
               <p className="text-sm font-medium text-slate-500 mb-4">
                  {activeModal.type === 'Approve' 
                     ? "This will grant the doctor full cryptographic access to the EHRS network. They will be able to scan patient QR codes and author prescriptions."
                     : "This will permanently reject the application. The doctor will need to re-apply with valid credentials."}
               </p>

               <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setActiveModal(null)}>Cancel</Button>
                  <Button 
                     variant="primary" 
                     fullWidth 
                     className={activeModal.type === 'Reject' ? 'bg-red-500 hover:bg-red-600' : ''}
                     onClick={handleAction}
                  >
                     Confirm {activeModal.type}
                  </Button>
               </div>
            </div>
         )}
      </Modal>

    </div>
  );
}
