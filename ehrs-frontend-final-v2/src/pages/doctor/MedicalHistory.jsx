import React, { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import useAuth from '../../hooks/useAuth';
import { doctorService } from '../../services/doctorService';

export default function MedicalHistory() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌟 FETCH REAL DB RECORDS
  useEffect(() => {
    if (currentUser?.email) {
      doctorService.getIssuedPrescriptions(currentUser.email)
          .then(data => { setRecords(data); setLoading(false); })
          .catch(console.error);
    }
  }, [currentUser]);

  const filteredRecords = records.filter(r =>
      r.medicationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patientId?.includes(searchQuery)
  );

  const columns = [
    { accessor: 'patientId', header: 'Patient ID', cell: (row) => <span className="font-bold text-slate-500">PT-{row.patientId}</span> },
    { accessor: 'medicationName', header: 'Medication', cell: (row) => <span className="font-black text-slate-800">{row.medicationName}</span> },
    { accessor: 'dosage', header: 'Dosage' },
    { accessor: 'duration', header: 'Duration' },
    { accessor: 'dateIssued', header: 'Date Issued', cell: (row) => <Badge variant="primary" soft>{row.dateIssued}</Badge> },
  ];

  if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-400">Loading History...</div>;

  return (
      <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
        <PageHeader title="My Issued Prescriptions" subtitle="Review all medical records you have securely issued." />
        <Card>
          <Card.Header>
            <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
              <div className="w-full sm:w-96"><SearchBar placeholder="Search medication or patient ID..." onSearch={setSearchQuery} /></div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <FiFileText className="text-primary" /> Total Issued: {filteredRecords.length}
              </div>
            </div>
          </Card.Header>
          <Card.Body noPadding>
            {filteredRecords.length > 0 ? (
                <DataTable columns={columns} data={filteredRecords} keyExtractor={(item) => item.id} />
            ) : (
                <div className="p-8 text-center text-slate-500">No prescriptions issued yet.</div>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}