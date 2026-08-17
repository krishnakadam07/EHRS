import React, { useState } from 'react';
import { FiClock, FiFilter, FiDownload, FiTerminal } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

// Mock Log Data
const MOCK_SYSTEM_LOGS = [
  { id: 'EVT-99012', timestamp: '2026-10-16 15:42:01', category: 'Security', event: 'Failed Login Attempt', actor: 'Unknown IP (192.168.1.55)', severity: 'Warning' },
  { id: 'EVT-99011', timestamp: '2026-10-16 15:30:12', category: 'Access', event: 'Doctor Account Approved', actor: 'Admin (System)', severity: 'Info' },
  { id: 'EVT-99010', timestamp: '2026-10-16 14:15:00', category: 'Crypto', event: 'Prescription Signed', actor: 'DR-7781', severity: 'Info' },
  { id: 'EVT-99009', timestamp: '2026-10-16 11:20:45', category: 'System', event: 'Automated Backup Completed', actor: 'System Daemon', severity: 'Info' },
  { id: 'EVT-99008', timestamp: '2026-10-15 09:05:20', category: 'Security', event: 'Multiple Failed Scans', actor: 'Unknown IP (10.0.0.52)', severity: 'Critical' },
  { id: 'EVT-99007', timestamp: '2026-10-15 08:30:00', category: 'Access', event: 'Patient Account Suspended', actor: 'Admin (System)', severity: 'Warning' },
];

export default function SystemLogs() {
  const [severityFilter, setSeverityFilter] = useState('All');

  const columns = [
    { key: 'timestamp', label: 'Timestamp', render: (val) => <span className="text-slate-500 font-medium">{val}</span> },
    { key: 'category', label: 'Category', render: (val) => <span className="font-bold text-slate-700">{val}</span> },
    { key: 'event', label: 'Event Description' },
    { key: 'actor', label: 'Actor / Source' },
    { key: 'severity', label: 'Severity', render: (val) => <SeverityBadge severity={val} /> },
  ];

  const filteredLogs = MOCK_SYSTEM_LOGS.filter(log => severityFilter === 'All' || log.severity === severityFilter);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-2">
        <PageHeader 
          title="Master System Logs" 
          subtitle="Immutable cryptographic audit trail of all platform events."
        />
        <Button variant="outline" icon={<FiDownload />}>
          Export Logs (CSV)
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
         
         {/* Left Side: Policy Widget */}
         <div className="w-full md:w-72 shrink-0 flex flex-col gap-4">
            <Card className="bg-slate-900 text-white border-none relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FiTerminal className="w-24 h-24" />
               </div>
               <Card.Body padding="p-5">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 relative z-10">
                     <FiClock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold relative z-10 mb-2">Immutable Ledger</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed relative z-10 mb-4">
                     All security and access events are permanently recorded. These logs cannot be altered or deleted by administrators to ensure strict compliance.
                  </p>
               </Card.Body>
            </Card>
            
            <Card>
               <Card.Header>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2"><FiFilter /> Filter Severity</h4>
               </Card.Header>
               <Card.Body padding="p-4">
                  <div className="flex flex-col gap-2">
                     {['All', 'Info', 'Warning', 'Critical'].map(f => (
                        <button
                           key={f}
                           onClick={() => setSeverityFilter(f)}
                           className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-colors ${severityFilter === f ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                           {f}
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
function SeverityBadge({ severity }) {
   let variant = 'info';
   if (severity === 'Warning') variant = 'warning';
   if (severity === 'Critical') variant = 'danger';

   return (
      <Badge variant={variant} soft>
         {severity}
      </Badge>
   );
}
