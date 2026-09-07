import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiClock, FiShield, FiAlertCircle, FiXCircle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

// Mock Data
const MOCK_HISTORY = [
  { id: 1, date: 'Today, 10:45 AM', accessor: 'City General Hospital', type: 'Emergency Scan', status: 'Authorized', location: 'Trauma Center, Metro City' },
  { id: 2, date: 'Oct 15, 2026, 02:30 PM', accessor: 'Dr. Sarah Jenkins', type: 'Specialist Review', status: 'Authorized', location: 'Metro Cardiology Clinic' },
  { id: 3, date: 'Oct 10, 2026, 09:15 AM', accessor: 'Unknown Scanner', type: 'QR Scan Attempt', status: 'Blocked', location: 'Unknown Location' },
  { id: 4, date: 'Sep 28, 2026, 11:00 AM', accessor: 'Westside Medical Center', type: 'Routine Checkup', status: 'Authorized', location: 'General Ward' },
];

export default function AccessHistory() {
  return (
      <div className="flex flex-col gap-8 pb-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader
              title="Access History"
              subtitle="Monitor who has viewed your medical records and when."
          />
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
            <FiAlertCircle className="mr-2" /> Report Suspicious Access
          </Button>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-soft overflow-hidden">
          {/* Header Row (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-slate-50 border-b border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400">
            <div className="col-span-3">Timestamp</div>
            <div className="col-span-4">Accessor Details</div>
            <div className="col-span-3">Access Type</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* History List */}
          <div className="flex flex-col divide-y divide-slate-100">
            {MOCK_HISTORY.map((log, index) => (
                <AccessLogItem key={log.id} log={log} index={index} />
            ))}
          </div>
        </div>
      </div>
  );
}

function AccessLogItem({ log, index }) {
  const isBlocked = log.status === 'Blocked';

  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ backgroundColor: '#f8fafc' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 transition-colors group cursor-default items-center relative"
      >
        {/* Mobile-only labels are added via flex-col structure in a responsive way, but here we just use the grid for simplicity. */}

        {/* Timestamp */}
        <div className="col-span-1 md:col-span-3 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isBlocked ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'}`}>
            {isBlocked ? <FiXCircle className="w-5 h-5" /> : <FiClock className="w-5 h-5" />}
          </div>
          <span className="text-sm font-bold text-slate-600">{log.date}</span>
        </div>

        {/* Accessor Details */}
        <div className="col-span-1 md:col-span-4 flex flex-col justify-center">
          <span className="text-base font-black text-slate-800">{log.accessor}</span>
          <span className="text-xs font-bold text-slate-500 mt-0.5">{log.location}</span>
        </div>

        {/* Access Type */}
        <div className="col-span-1 md:col-span-3 flex items-center gap-2">
          <FiEye className="text-slate-400 w-4 h-4" />
          <span className="text-sm font-bold text-slate-700">{log.type}</span>
        </div>

        {/* Status & Actions */}
        <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-4">
          <Badge variant={isBlocked ? 'danger' : 'success'} soft>
            {log.status}
          </Badge>

          {/* Hidden action button that appears on hover */}
          {!isBlocked && (
              <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors opacity-0 md:group-hover:opacity-100 absolute right-6 md:relative md:right-0"
                  title="Revoke Access"
              >
                <FiShield className="w-4 h-4" />
              </motion.button>
          )}
        </div>
      </motion.div>
  );
}
