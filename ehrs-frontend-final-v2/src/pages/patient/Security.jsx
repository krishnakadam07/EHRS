import React, { useState, useEffect } from 'react';
import { FiShield, FiClock, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';

export default function Security() {
    const { currentUser } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Reporting State
    const [reportingDoctor, setReportingDoctor] = useState(null);
    const [reportReason, setReportReason] = useState('');

    useEffect(() => {
        if (currentUser?.email) {
            patientService.getMyAccessLogs(currentUser.email)
                .then(data => { setLogs(data); setLoading(false); })
                .catch(console.error);
        }
    }, [currentUser]);

    const submitReport = async () => {
        try {
            await patientService.reportDoctor({
                patientEmail: currentUser.email,
                doctorName: reportingDoctor.accessor,
                reason: reportReason
            });
            alert("Report successfully sent to Admin for investigation.");
            setReportingDoctor(null);
            setReportReason('');
        } catch (err) {
            alert("Failed to send report.");
        }
    };

    const columns = [
        { accessor: 'date', header: 'Date & Time' },
        { accessor: 'accessor', header: 'Accessed By', cell: (row) => <span className="font-black text-slate-800">{row.accessor}</span> },
        { accessor: 'type', header: 'Action Taken', cell: (row) => <Badge variant="primary" soft>{row.type}</Badge> },
        { accessor: 'location', header: 'Location' },
        { accessor: 'actions', header: 'Security Action', cell: (row) => (
                <Button variant="danger" size="sm" icon={<FiAlertTriangle />} onClick={() => setReportingDoctor(row)}>
                    Report
                </Button>
            )},
    ];

    if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-400">Loading Audit Logs...</div>;

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
            <PageHeader title="Security & Audit Logs" subtitle="Cryptographic record of anyone who has accessed your medical data." />

            <Card>
                <Card.Header><h3 className="font-bold flex items-center gap-2"><FiClock className="text-primary"/> Access History</h3></Card.Header>
                <Card.Body noPadding>
                    <DataTable columns={columns} data={logs} keyExtractor={(item) => item.id} />
                </Card.Body>
            </Card>

            {/* REPORT DOCTOR MODAL */}
            <Modal isOpen={!!reportingDoctor} onClose={() => setReportingDoctor(null)} title="Report Suspicious Access">
                <div className="p-4 flex flex-col gap-4">
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm font-medium">
                        You are reporting <strong>{reportingDoctor?.accessor}</strong> for unauthorized access on {reportingDoctor?.date}. This report will be sent directly to the Admin Investigation team.
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-slate-700">Reason / Proof of Unauthorized Access</label>
                        <textarea
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                            rows="4"
                            placeholder="E.g., I did not visit this doctor today. I have proof of my location..."
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setReportingDoctor(null)}>Cancel</Button>
                        <Button variant="danger" onClick={submitReport} disabled={!reportReason}>Submit Official Report</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}