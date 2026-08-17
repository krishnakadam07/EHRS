import React, { useState } from 'react';
import { FiUsers, FiSearch, FiShield, FiMoreVertical, FiLock, FiUnlock } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';

// Mock Patients
const MOCK_PATIENTS = [
  { id: 'PT-10492-AX', name: 'Jane Doe', email: 'jane.doe@example.com', registered: '2026-01-15', status: 'Active', scans: 14 },
  { id: 'PT-99381-BC', name: 'John Smith', email: 'john.smith@example.com', registered: '2026-03-22', status: 'Active', scans: 2 },
  { id: 'PT-88123-DZ', name: 'Emily Chen', email: 'emily.chen@example.com', registered: '2026-05-10', status: 'Suspended', scans: 0 },
  { id: 'PT-77291-WQ', name: 'Michael Roberts', email: 'michael.r@example.com', registered: '2026-06-05', status: 'Active', scans: 8 },
  { id: 'PT-66182-LK', name: 'Sarah Connor', email: 's.connor@example.com', registered: '2026-08-12', status: 'Active', scans: 1 },
];

export default function ManagePatients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState(MOCK_PATIENTS);

  const handleToggleStatus = (id) => {
    setPatients(prev => prev.map(p => {
      if (p.id === id) {
         return { ...p, status: p.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return p;
    }));
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'id', label: 'Patient ID', render: (val) => <span className="font-bold text-slate-700">{val}</span> },
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'registered', label: 'Join Date' },
    { key: 'scans', label: 'Total Scans' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'danger'} soft>{val}</Badge> },
    { key: 'actions', label: '', render: (_, row) => (
       <div className="flex justify-end">
         <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleToggleStatus(row.id)}
            className={row.status === 'Active' ? 'text-orange-500 hover:bg-orange-50 hover:border-orange-200' : 'text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200'}
         >
            {row.status === 'Active' ? <span className="flex items-center gap-1"><FiLock/> Suspend</span> : <span className="flex items-center gap-1"><FiUnlock/> Activate</span>}
         </Button>
       </div>
    )}
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader 
        title="Patient Directory" 
        subtitle="Manage registered users, oversee access, and handle account suspensions."
      />

      <Card>
         <Card.Header>
            <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
               <div className="w-full sm:w-96">
                  <SearchBar placeholder="Search by name or Patient ID..." onSearch={setSearchQuery} />
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shrink-0">
                  <FiUsers className="text-primary" /> Total: {filteredPatients.length}
               </div>
            </div>
         </Card.Header>
         <Card.Body noPadding>
            <DataTable 
               columns={columns} 
               data={filteredPatients} 
               keyExtractor={(item) => item.id}
            />
         </Card.Body>
      </Card>
    </div>
  );
}
