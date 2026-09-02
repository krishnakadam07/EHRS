import React, { useState, useEffect } from 'react';
import { FiTerminal, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import { adminService } from '../../services/adminService';

export default function SystemLogs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService.getSystemLogs()
            .then(data => {
                setLogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch logs:", err);
                setLoading(false);
            });
    }, []);

    const filteredLogs = logs.filter(log =>
        (log.accessor || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.location || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const s = (status || '').toUpperCase();
        if (s.includes('SUCCESS') || s.includes('GRANTED')) {
            return <Badge variant="success" soft><FiCheckCircle className="inline mr-1"/> {status}</Badge>;
        }
        if (s.includes('FAIL') || s.includes('DENIED')) {
            return <Badge variant="danger" soft><FiAlertTriangle className="inline mr-1"/> {status}</Badge>;
        }
        return <Badge variant="warning" soft>{status}</Badge>;
    };

    // 🌟 MATCHED TO YOUR JAVA ENTITY FIELDS: id, date, accessor, type, location, status
    const columns = [
        {
            accessor: 'id',
            header: 'Log ID',
            cell: (row) => <span className="text-slate-500 font-mono text-xs">#{row.id}</span>
        },
        {
            accessor: 'date',
            header: 'Date & Time',
            cell: (row) => <span className="font-medium text-slate-700">{row.date}</span>
        },
        {
            accessor: 'accessor',
            header: 'Accessor (User/Doctor)',
            cell: (row) => <span className="font-bold text-slate-800">{row.accessor}</span>
        },
        {
            accessor: 'type',
            header: 'Action Type',
            cell: (row) => <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{row.type}</span>
        },
        {
            accessor: 'location',
            header: 'Location / IP'
        },
        {
            accessor: 'status',
            header: 'Status',
            cell: (row) => getStatusBadge(row.status)
        },
    ];

    return (
        <div className="flex flex-col gap-6 pb-12">
            <PageHeader
                title="System Logs"
                subtitle="Monitor network traffic, authentication attempts, and security events."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                <Card className="bg-slate-900 text-white border-none shadow-xl">
                    <Card.Body className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <FiTerminal className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Events</p>
                            <h3 className="text-3xl font-black">{logs.length}</h3>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="bg-emerald-900 text-white border-none shadow-xl">
                    <Card.Body className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <FiShield className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-emerald-400/80 text-sm font-bold uppercase tracking-wider">Network Status</p>
                            <h3 className="text-2xl font-black">Secure</h3>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <Card>
                <Card.Header>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
                        <div className="w-full sm:w-96">
                            <SearchBar placeholder="Search logs by accessor, type, or location..." onSearch={setSearchQuery} />
                        </div>
                    </div>
                </Card.Header>
                <Card.Body noPadding>
                    <DataTable
                        columns={columns}
                        data={filteredLogs}
                        loading={loading}
                        keyExtractor={(item) => item.id}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}