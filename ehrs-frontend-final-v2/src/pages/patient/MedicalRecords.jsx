import React, { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';

export default function Records() {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('Prescriptions');

    const [prescriptions, setPrescriptions] = useState([]);
    const [s3Records, setS3Records] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser?.email) {
            Promise.all([
                patientService.getMyPrescriptions(currentUser.email),
                patientService.getMyMedicalRecords(currentUser.email)
            ]).then(([rxData, s3Data]) => {
                setPrescriptions(rxData);
                setS3Records(s3Data);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [currentUser]);

    const rxColumns = [
        { accessor: 'medicationName', header: 'Medication', cell: (row) => <span className="font-black text-slate-800">{row.medicationName}</span> },
        { accessor: 'dosage', header: 'Dosage / Freq', cell: (row) => `${row.dosage} - ${row.frequency}` },
        { accessor: 'notes', header: 'Doctor Instructions' },
        { accessor: 'doctorEmail', header: 'Issued By' },
        { accessor: 'dateIssued', header: 'Date', cell: (row) => <Badge variant="success" soft>{row.dateIssued}</Badge> },
    ];

    const s3Columns = [
        { accessor: 'title', header: 'Document Name' },
        { accessor: 'type', header: 'Category' },
        { accessor: 'uploadDate', header: 'Date Uploaded', cell: (row) => new Date(row.uploadDate).toLocaleDateString() },
        { accessor: 'fileUrl', header: 'Action', cell: (row) => (
                <a href={row.fileUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">View File</a>
            )},
    ];

    if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-400">Loading Medical Vault...</div>;

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
            <PageHeader title="My Medical Records" subtitle="View your official prescriptions and S3 documents." />

            <Card>
                <Card.Header>
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-bold flex items-center gap-2"><FiFileText className="text-primary"/> Personal Vault</h3>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button onClick={() => setActiveTab('Prescriptions')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'Prescriptions' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Prescriptions</button>
                            <button onClick={() => setActiveTab('S3 Files')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'S3 Files' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Uploaded Documents</button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body noPadding>
                    {activeTab === 'Prescriptions' ? (
                        <DataTable columns={rxColumns} data={prescriptions} keyExtractor={(item) => item.id} />
                    ) : (
                        <DataTable columns={s3Columns} data={s3Records} keyExtractor={(item) => item.id} />
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}