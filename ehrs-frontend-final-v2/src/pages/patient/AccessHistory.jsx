import React, { useState, useEffect } from 'react';
import { FiShield, FiClock } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';

export default function Security() {
    const { currentUser } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🌟 FETCH REAL DB ACCESS LOGS
    useEffect(() => {
        if (currentUser?.email) {
            patientService.getMyAccessLogs(currentUser.email)
                .then(data => { setLogs(data); setLoading(false); })
                .catch(console.error);
        }
    }, [currentUser]);

    const columns = [
        { accessor: 'date', header: 'Date & Time', cell: (row) => <span className="font-bold text-slate-500">{row.date}</span> },
        { accessor: 'accessor', header: 'Accessed By', cell: (row) => <span className="font-black text-slate-800">{row.accessor}</span> },
        { accessor: 'type', header: 'Action Taken', cell: (row) => <Badge variant="primary" soft>{row.type}</Badge> },
        { accessor: 'location', header: 'Location / IP' },
        { accessor: 'status', header: 'Status', cell: (row) => <Badge variant={row.status === 'Granted' ? 'success' : 'danger'} soft>{row.status}</Badge> },
    ];

    if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-400">Loading Audit Logs...</div>;

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
            <PageHeader title="Security & Audit Logs" subtitle="Cryptographic record of anyone who has accessed your medical data." />

            <div className="bg-slate-800 rounded-2xl p-6 text-white mb-4 flex items-center gap-4 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><FiShield className="w-6 h-6 text-emerald-400" /></div>
                <div>
                    <h3 className="font-black text-lg">Your Data is Protected</h3>
                    <p className="text-sm text-slate-300">Under EHRS compliance, every access to your profile is permanently logged here.</p>
                </div>
            </div>

            <Card>
                <Card.Header><h3 className="font-bold flex items-center gap-2"><FiClock className="text-primary"/> Access History</h3></Card.Header>
                <Card.Body noPadding>
                    {logs.length > 0 ? (
                        <DataTable columns={columns} data={logs} keyExtractor={(item) => item.id} />
                    ) : (
                        <div className="p-8 text-center text-slate-500">No access logs found. Your data is secure.</div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}