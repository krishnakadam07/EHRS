import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, FiEdit3, FiPhone, FiDroplet, FiHeart, 
  FiFileText, FiActivity, FiShield, FiScissors, FiImage
} from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';

// Mock Patient Data
const MOCK_PATIENT = {
  id: 'PT-10492-AX',
  name: 'Jane Doe',
  age: 41,
  dob: '1985-06-15',
  bloodType: 'B+',
  height: '178 cm',
  weight: '75 kg',
  phone: '+1 555-0198',
  allergies: ['Peanuts', 'Penicillin'],
  conditions: ['Mild Asthma'],
  emergencyContact: {
    name: 'John Doe',
    relation: 'Spouse',
    phone: '+1 555-0199'
  }
};

const MOCK_RECORDS = [
  { id: 'REC-001', title: 'Complete Blood Count', category: 'Lab Reports', date: '2026-10-15', doctor: 'Dr. Sarah Jenkins', size: '2.4 MB' },
  { id: 'REC-002', title: 'Chest X-Ray', category: 'Scans', date: '2026-09-22', doctor: 'Dr. Emily Chen', size: '15.8 MB' },
  { id: 'REC-003', title: 'Amoxicillin 500mg', category: 'Prescriptions', date: '2026-10-01', doctor: 'Dr. Michael Roberts', size: '120 KB' },
];

export default function PatientDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const columns = [
    { key: 'title', label: 'Document Name' },
    { key: 'category', label: 'Category', render: (val) => <CategoryBadge category={val} /> },
    { key: 'date', label: 'Date Issued' },
    { key: 'doctor', label: 'Issuer / Doctor' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors focus:outline-none"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <PageHeader 
            title="Patient Profile" 
            subtitle={`Viewing securely accessed records for ${MOCK_PATIENT.name}`}
          />
        </div>
        
        <Button 
          variant="primary" 
          icon={<FiEdit3 />} 
          onClick={() => navigate(ROUTES.DOCTOR.ADD_PRESCRIPTION)}
          className="shadow-md shadow-primary/20"
        >
          Add Prescription
        </Button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
        
        {/* Core Identity Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-lg">
             <div className="h-2 bg-gradient-to-r from-primary to-sky-400 w-full" />
             <Card.Body padding="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 shrink-0">
                      {MOCK_PATIENT.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">{MOCK_PATIENT.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{MOCK_PATIENT.id}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="text-sm font-bold text-slate-500">{MOCK_PATIENT.age} yrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Vitals Grid */}
                  <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 md:border-l md:border-slate-100 md:pl-8">
                     <VitalStat label="Blood Type" value={MOCK_PATIENT.bloodType} icon={<FiDroplet className="text-red-500 w-4 h-4" />} color="text-red-600" />
                     <VitalStat label="Height" value={MOCK_PATIENT.height} />
                     <VitalStat label="Weight" value={MOCK_PATIENT.weight} />
                     <VitalStat label="DOB" value={MOCK_PATIENT.dob} />
                  </div>
                </div>
             </Card.Body>
          </Card>
        </motion.div>

        {/* Two Column Layout for Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Left Column: Health Summary & Contacts */}
           <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:col-span-1">
              <Card>
                 <Card.Header>
                    <h3 className="text-lg font-bold text-slate-800">Critical Alerts</h3>
                 </Card.Header>
                 <Card.Body>
                    <div className="flex flex-col gap-4">
                       <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Severe Allergies</span>
                          <div className="flex flex-wrap gap-2">
                             {MOCK_PATIENT.allergies.map(a => <Badge key={a} variant="danger" soft>{a}</Badge>)}
                          </div>
                       </div>
                       <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Chronic Conditions</span>
                          <div className="flex flex-wrap gap-2">
                             {MOCK_PATIENT.conditions.map(c => <Badge key={c} variant="warning" soft>{c}</Badge>)}
                          </div>
                       </div>
                    </div>
                 </Card.Body>
              </Card>

              <Card>
                 <Card.Header>
                    <h3 className="text-lg font-bold text-slate-800">Contact Info</h3>
                 </Card.Header>
                 <Card.Body noPadding>
                    <div className="flex flex-col divide-y divide-slate-100 p-4 gap-4">
                       <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Phone</span>
                             <span className="text-sm font-bold text-slate-800">{MOCK_PATIENT.phone}</span>
                          </div>
                          <a href={`tel:${MOCK_PATIENT.phone}`} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                             <FiPhone />
                          </a>
                       </div>
                       <div className="flex items-center justify-between pt-4">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Emergency Contact</span>
                             <span className="text-sm font-bold text-slate-800">{MOCK_PATIENT.emergencyContact.name} ({MOCK_PATIENT.emergencyContact.relation})</span>
                          </div>
                          <a href={`tel:${MOCK_PATIENT.emergencyContact.phone}`} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors">
                             <FiPhone />
                          </a>
                       </div>
                    </div>
                 </Card.Body>
              </Card>
           </motion.div>

           {/* Right Column: Medical Records Explorer */}
           <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="h-full">
                 <Card.Header>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                       <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          <FiFileText className="text-primary" /> Medical Records
                       </h3>
                       
                       <div className="flex bg-slate-100 p-1 rounded-xl">
                          {['Overview', 'Lab Reports', 'Prescriptions'].map(tab => (
                             <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                             >
                                {tab}
                             </button>
                          ))}
                       </div>
                    </div>
                 </Card.Header>
                 <DataTable 
                    columns={columns} 
                    data={MOCK_RECORDS.filter(r => activeTab === 'Overview' || r.category === activeTab)}
                    keyExtractor={(item) => item.id}
                 />
              </Card>
           </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// Helpers
function VitalStat({ label, value, icon, color = "text-slate-800" }) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-2xl border border-slate-100">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className={`text-xl font-black flex items-center gap-1 ${color}`}>
        {icon} {value}
      </span>
    </div>
  );
}

function CategoryBadge({ category }) {
  let variant = 'info';
  switch (category) {
    case 'Lab Reports': variant = 'primary'; break;
    case 'Scans': variant = 'secondary'; break;
    case 'Prescriptions': variant = 'warning'; break;
    case 'Vaccinations': variant = 'success'; break;
    case 'Surgeries': variant = 'danger'; break;
  }
  return <Badge variant={variant} soft>{category}</Badge>;
}
