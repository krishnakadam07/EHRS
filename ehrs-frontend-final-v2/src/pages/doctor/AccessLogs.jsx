import React, { useState, useEffect } from 'react';
import { FiClock, FiFilter, FiDownload, FiShield } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { doctorService } from '../../services/doctorService';

export default function AccessLogs() {
    const { currentUser } = useAuth();
    const [filter, setFilter] = useState('All');
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🌟 FETCH REAL AUDIT LOGS FROM DATABASE
    useEffect(() => {
        if (currentUser?.email) {
            doctorService.getMyAccessLogs(currentUser.email)
                .then(data => {
                    setLogs(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to load logs", error);
                    setLoading(false);
                });
        }
    }, [currentUser]);

    const filteredLogs = logs.filter(log => filter === 'All' || log.status === filter);

    const columns = [
        { accessor: 'timestamp', header: 'Date & Time', cell: (row) => <span className="font-bold text-slate-500">{row.timestamp}</span> },
        { accessor: 'action', header: 'Action Taken', cell: (row) => <ActionBadge action={row.action} /> },
        { accessor: 'patient', header: 'Patient Identity', cell: (row) => <span className="font-black text-slate-800">{row.patient}</span> },
        { accessor: 'ip', header: 'Location / IP' },
        { accessor: 'status', header: 'Status', cell: (row) => <Badge variant={row.status === 'Granted' ? 'success' : 'danger'} soft>{row.status}</Badge> },
    ];

    if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-400">Loading Secure Audit Trail...</div>;

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-2">
                <PageHeader title="Security & Access Logs" subtitle="Cryptographic audit trail of all patient interactions." />
                <Button variant="outline" icon={<FiDownload />}>Export Logs</Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-72 shrink-0 flex flex-col gap-4">
                    <Card className="bg-slate-800 text-white border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><FiShield className="w-24 h-24" /></div>
                        <Card.Body padding="p-5">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 relative z-10"><FiClock className="w-5 h-5 text-white" /></div>
                            <h3 className="text-lg font-bold relative z-10 mb-2">Audit Compliance</h3>
                            <p className="text-xs font-medium text-slate-300 leading-relaxed relative z-10">Under EHRS Policy, all actions including viewing records are permanently logged.</p>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header><h4 className="text-sm font-bold text-slate-800 flex items-center gap-2"><FiFilter /> Filters</h4></Card.Header>
                        <Card.Body padding="p-4">
                            <div className="flex flex-col gap-2">
                                {['All', 'Granted', 'Denied'].map(f => (
                                    <button key={f} onClick={() => setFilter(f)} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === f ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}>
                                        {f} Status
                                    </button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="flex-1 w-full">
                    <Card>
                        <Card.Body noPadding>
                            {filteredLogs.length > 0 ? (
                                <DataTable columns={columns} data={filteredLogs} keyExtractor={(item) => item.id} />
                            ) : (
                                <div className="p-8 text-center text-slate-500 font-bold">No access logs found. Scan a QR code to generate a log!</div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ActionBadge({ action }) {
    if (!action) return null;
    let color = 'bg-slate-100 text-slate-600';
    if (action.includes('Profile')) color = 'bg-sky-100 text-sky-700';
    if (action.includes('Prescription')) color = 'bg-emerald-100 text-emerald-700';
    return <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${color}`}>{action}</span>;
}