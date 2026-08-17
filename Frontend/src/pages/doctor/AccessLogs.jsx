import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiFilter, FiDownload, FiShield } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

// Mock Log Data
const MOCK_LOGS = [
  { id: 'LOG-8912', timestamp: '2026-10-16 14:32:01', action: 'QR Scanned', patient: 'PT-10492-AX (Jane Doe)', ip: '192.168.1.104', status: 'Granted' },
  { id: 'LOG-8911', timestamp: '2026-10-16 14:35:12', action: 'Prescription Issued', patient: 'PT-10492-AX (Jane Doe)', ip: '192.168.1.104', status: 'Granted' },
  { id: 'LOG-8890', timestamp: '2026-10-15 09:15:00', action: 'Record Viewed', patient: 'PT-99381-BC (John Smith)', ip: '192.168.1.104', status: 'Granted' },
  { id: 'LOG-8854', timestamp: '2026-10-14 11:20:45', action: 'QR Scanned', patient: 'PT-88123-DZ (Emily Chen)', ip: '10.0.0.52', status: 'Granted' },
  { id: 'LOG-8853', timestamp: '2026-10-14 11:15:20', action: 'QR Scan Attempt', patient: 'UNKNOWN', ip: '10.0.0.52', status: 'Denied' },
];

export default function AccessLogs() {
  const [filter, setFilter] = useState('All');

  const columns = [
    { key: 'timestamp', label: 'Date & Time' },
    { key: 'action', label: 'Action Taken', render: (val) => <ActionBadge action={val} /> },
    { key: 'patient', label: 'Patient Identity' },
    { key: 'ip', label: 'Location / IP' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const filteredLogs = MOCK_LOGS.filter(log => filter === 'All' || log.status === filter);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-2">
        <PageHeader 
          title="Security & Access Logs" 
          subtitle="Cryptographic audit trail of all patient interactions."
        />
        <Button variant="outline" icon={<FiDownload />}>
          Export Logs (CSV)
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
         
         {/* Left Side: Policy Widget */}
         <div className="w-full md:w-72 shrink-0 flex flex-col gap-4">
            <Card className="bg-slate-800 text-white border-none relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FiShield className="w-24 h-24" />
               </div>
               <Card.Body padding="p-5">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 relative z-10">
                     <FiClock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold relative z-10 mb-2">Audit Compliance</h3>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed relative z-10">
                     Under EHRS Policy, all actions including viewing records and issuing prescriptions are permanently logged. These logs are auditable by system administrators.
                  </p>
               </Card.Body>
            </Card>
            
            <Card>
               <Card.Header>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2"><FiFilter /> Filters</h4>
               </Card.Header>
               <Card.Body padding="p-4">
                  <div className="flex flex-col gap-2">
                     {['All', 'Granted', 'Denied'].map(f => (
                        <button
                           key={f}
                           onClick={() => setFilter(f)}
                           className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === f ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                           {f} Status
                        </button>
                     ))}
                  </div>
               </Card.Body>
            </Card>
         </div>

         {/* Right Side: Data Table */}
         <div className="flex-1 w-full">
            <Card>
               <DataTable 
                  columns={columns} 
                  data={filteredLogs} 
                  keyExtractor={(item) => item.id}
               />
            </Card>
         </div>

      </div>
    </div>
  );
}

// Helpers
function ActionBadge({ action }) {
  let color = 'bg-slate-100 text-slate-600';
  if (action.includes('Scan')) color = 'bg-sky-100 text-sky-700';
  if (action.includes('Prescription')) color = 'bg-emerald-100 text-emerald-700';
  if (action.includes('Viewed')) color = 'bg-purple-100 text-purple-700';

  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${color}`}>
      {action}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <Badge variant={status === 'Granted' ? 'success' : 'danger'} soft>
      {status}
    </Badge>
  );
}
