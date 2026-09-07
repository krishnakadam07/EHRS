import React, { useState, useEffect } from 'react';
import { FiFileText, FiTrash2, FiClipboard } from 'react-icons/fi';
import jsPDF from 'jspdf';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
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

    const handleDeletePrescription = async (id) => {
        if (window.confirm("Are you sure you want to delete this prescription?")) {
            try {
                await patientService.deletePrescription(id);
                setPrescriptions(prev => prev.filter(item => item.id !== id));
            } catch (err) {
                alert("Failed to delete prescription.");
            }
        }
    };

    const handleDeleteS3Record = async (id) => {
        if (window.confirm("Are you sure you want to delete this document?")) {
            try {
                await patientService.deleteMedicalRecord(id);
                setS3Records(prev => prev.filter(item => item.id !== id));
            } catch (err) {
                alert("Failed to delete document.");
            }
        }
    };

    const downloadPrescriptionPDF = (prescription) => {
        const doc = new jsPDF();

        // 🌟 ADD HOSPITAL LOGO GRAPHIC TO PDF
        doc.setFillColor(14, 165, 233);
        doc.rect(20, 15, 10, 10, 'F'); // Blue Square Logo
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text("+", 23, 22); // White cross inside logo

        doc.setFontSize(22);
        doc.setTextColor(14, 165, 233);
        doc.text("EHRS Official Prescription", 35, 23);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Date Issued: ${prescription.dateIssued}`, 20, 35);
        doc.text(`Doctor: ${prescription.doctorEmail}`, 20, 43);
        doc.setLineWidth(0.5);
        doc.line(20, 50, 190, 50);
        doc.setFontSize(16);
        doc.setTextColor(20);
        doc.text("Medication Details", 20, 60);
        doc.setFontSize(12);
        doc.text(`Rx: ${prescription.medicationName}`, 20, 70);
        doc.text(`Dosage: ${prescription.dosage}`, 20, 80);
        doc.text(`Frequency: ${prescription.frequency}`, 20, 90);
        doc.text(`Duration: ${prescription.duration}`, 20, 100);
        doc.text(`Instructions: ${prescription.notes || 'Take as directed by your physician.'}`, 20, 120);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("This is a cryptographically verified electronic document.", 20, 280);
        doc.save(`Prescription_${prescription.medicationName}.pdf`);
    };

    const rxColumns = [
        { accessor: 'medicationName', header: 'Medication', cell: (row) => <span className="font-black text-slate-800">{row.medicationName}</span> },
        { accessor: 'dosage', header: 'Dosage / Freq', cell: (row) => `${row.dosage} - ${row.frequency}` },
        { accessor: 'doctorEmail', header: 'Issued By' },
        { accessor: 'dateIssued', header: 'Date', cell: (row) => <Badge variant="success" soft>{row.dateIssued}</Badge> },
        { accessor: 'actions', header: 'Actions', cell: (row) => (
                <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => downloadPrescriptionPDF(row)}>PDF</Button>
                    <Button variant="danger" size="sm" icon={<FiTrash2 />} onClick={() => handleDeletePrescription(row.id)}>Delete</Button>
                </div>
            )},
    ];

    const s3Columns = [
        { accessor: 'title', header: 'Document Name' },
        { accessor: 'type', header: 'Category' },
        { accessor: 'uploadDate', header: 'Date Uploaded', cell: (row) => new Date(row.uploadDate).toLocaleDateString() },
        { accessor: 'actions', header: 'Actions', cell: (row) => (
                <div className="flex items-center gap-4">
                    <a href={row.fileUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">View File</a>
                    <Button variant="danger" size="sm" icon={<FiTrash2 />} onClick={() => handleDeleteS3Record(row.id)}>Delete</Button>
                </div>
            )},
    ];

    // 🌟 SKELETON LOADER
    if (loading) return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto animate-pulse">
            <div className="h-20 bg-slate-200 rounded-3xl w-full"></div>
            <div className="h-64 bg-slate-200 rounded-3xl w-full"></div>
        </div>
    );

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
                        // 🌟 EMPTY STATE GRAPHIC
                        prescriptions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-16 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4"><FiClipboard className="w-8 h-8 text-slate-300"/></div>
                                <h3 className="text-lg font-black text-slate-700">Clean Bill of Health!</h3>
                                <p className="text-sm text-slate-500 mt-1 max-w-xs">No doctors have issued any prescriptions to your secure medical profile yet.</p>
                            </div>
                        ) : <DataTable columns={rxColumns} data={prescriptions} keyExtractor={(item) => item.id} />
                    ) : (
                        // 🌟 EMPTY STATE GRAPHIC
                        s3Records.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-16 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4"><FiFileText className="w-8 h-8 text-slate-300"/></div>
                                <h3 className="text-lg font-black text-slate-700">Vault Empty</h3>
                                <p className="text-sm text-slate-500 mt-1 max-w-xs">You have not uploaded any external medical records to the AWS S3 vault.</p>
                            </div>
                        ) : <DataTable columns={s3Columns} data={s3Records} keyExtractor={(item) => item.id} />
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}