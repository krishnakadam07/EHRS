import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiEdit3, FiDroplet, FiFileText, FiShield, FiLock, FiXCircle, FiMaximize } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import { doctorService } from '../../services/doctorService';
import useAuth from '../../hooks/useAuth';

export default function PatientDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    const [activeTab, setActiveTab] = useState('Prescriptions');
    const [patientData, setPatientData] = useState(null);
    const [s3Records, setS3Records] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const scannedPatientId = location.state?.patientId;

    useEffect(() => {
        if (scannedPatientId && currentUser?.email) {
            const numericId = scannedPatientId.replace(/\D/g, '');

            // Fetch everything at once!
            Promise.all([
                doctorService.getPatientDetails(numericId, currentUser.email),
                doctorService.getPatientRecords(numericId),
                doctorService.getPatientPrescriptions(numericId)
            ]).then(([patientInfo, recordsList, rxList]) => {
                setPatientData(patientInfo);
                setS3Records(recordsList);
                setPrescriptions(rxList);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [scannedPatientId, currentUser]);

    if (!scannedPatientId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6"><FiLock className="w-10 h-10" /></div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">Access Denied</h2>
                <Button variant="primary" onClick={() => navigate(ROUTES.DOCTOR.SCAN_QR)} className="mt-4">Go to QR Scanner</Button>
            </div>
        );
    }

    if (loading) return <div className="text-center mt-20 animate-pulse font-bold text-slate-500">Loading Secure Profile...</div>;
    if (!patientData) return <div className="text-center mt-20 font-bold text-red-500">Error fetching patient data.</div>;

    const recordColumns = [
        { accessor: 'title', header: 'Document Name' },
        { accessor: 'type', header: 'Category' },
        { accessor: 'uploadDate', header: 'Date Uploaded', cell: (row) => new Date(row.uploadDate).toLocaleDateString() },
        { accessor: 'fileUrl', header: 'Action', cell: (row) => (
                <a href={row.fileUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">View File</a>
            )},
    ];

    const rxColumns = [
        { accessor: 'medicationName', header: 'Medication' },
        { accessor: 'dosage', header: 'Dosage / Freq', cell: (row) => `${row.dosage} - ${row.frequency}` },
        { accessor: 'dateIssued', header: 'Date Issued' },
        { accessor: 'doctorEmail', header: 'Issued By' },
    ];

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><FiShield className="w-5 h-5" /></div>
                    <div><h1 className="text-2xl font-black">Active Session</h1><p className="text-sm font-bold text-emerald-600">Secure Access Granted</p></div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={<FiEdit3 />} onClick={() => navigate(ROUTES.DOCTOR.ADD_PRESCRIPTION, { state: { patientId: scannedPatientId } })}>Add Prescription</Button>
                    <Button variant="danger" icon={<FiXCircle />} onClick={() => navigate(ROUTES.DOCTOR.DASHBOARD, { replace: true, state: {} })}>End Session</Button>
                </div>
            </div>

            <Card className="bg-slate-900 text-white">
                <Card.Body padding="p-8">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-black">{patientData.fullName?.charAt(0) || 'P'}</div>
                        <div>
                            <h2 className="text-3xl font-black">{patientData.fullName}</h2>
                            <p className="text-slate-400 font-bold mt-1">ID: {scannedPatientId} &bull; {patientData.gender}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header>
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-bold flex items-center gap-2"><FiFileText className="text-primary" /> Patient Records</h3>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button onClick={() => setActiveTab('Prescriptions')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'Prescriptions' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Prescriptions</button>
                            <button onClick={() => setActiveTab('S3 Files')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'S3 Files' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>S3 Documents</button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body noPadding>
                    {activeTab === 'Prescriptions' ? (
                        <DataTable columns={rxColumns} data={prescriptions} keyExtractor={(item) => item.id} />
                    ) : (
                        <DataTable columns={recordColumns} data={s3Records} keyExtractor={(item) => item.id} />
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}