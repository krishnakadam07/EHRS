import React, { useState } from 'react';
import { FiActivity, FiLock, FiUnlock } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';

// Mock Doctors
const MOCK_DOCTORS = [
  { id: 'DR-7781', name: 'Dr. Gregory House', license: 'MED-12345-NJ', hospital: 'Princeton-Plainsboro', status: 'Active', prescriptions: 124 },
  { id: 'DR-7782', name: 'Dr. James Wilson', license: 'MED-54321-NJ', hospital: 'Princeton-Plainsboro', status: 'Active', prescriptions: 89 },
  { id: 'DR-7783', name: 'Dr. Lisa Cuddy', license: 'MED-99887-NJ', hospital: 'Princeton-Plainsboro', status: 'Suspended', prescriptions: 0 },
  { id: 'DR-7784', name: 'Dr. John Dorian', license: 'MED-44556-CA', hospital: 'Sacred Heart', status: 'Active', prescriptions: 342 },
];

export default function ManageDoctors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);

  const handleToggleStatus = (id) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === id) {
         return { ...d, status: d.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return d;
    }));
  };

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.license.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'id', label: 'Network ID', render: (val) => <span className="font-bold text-slate-700">{val}</span> },
    { key: 'name', label: 'Doctor Name' },
    { key: 'license', label: 'Medical License' },
    { key: 'hospital', label: 'Affiliated Hospital' },
    { key: 'prescriptions', label: 'Total Prescriptions' },
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
        title="Doctor Directory" 
        subtitle="Manage verified medical professionals and their network privileges."
      />

      <Card>
         <Card.Header>
            <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
               <div className="w-full sm:w-96">
                  <SearchBar placeholder="Search by name or license number..." onSearch={setSearchQuery} />
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shrink-0">
                  <FiActivity className="text-primary" /> Total: {filteredDoctors.length}
               </div>
            </div>
         </Card.Header>
         <Card.Body noPadding>
            <DataTable 
               columns={columns} 
               data={filteredDoctors} 
               keyExtractor={(item) => item.id}
            />
         </Card.Body>
      </Card>
    </div>
  );
}
