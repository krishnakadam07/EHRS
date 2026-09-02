import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import SearchBar from '../../components/common/SearchBar';
import { adminService } from '../../services/adminService';

export default function ManagePatients() {
    const [searchQuery, setSearchQuery] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        adminService.getAllPatients().then(setPatients).catch(console.error);
    }, []);

    const filteredPatients = patients.filter(p =>
        (p.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.bloodType || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 🌟 FIX: Updated to accessor, header, and cell for the DataTable component
    const columns = [
        {
            accessor: 'id',
            header: 'Patient ID',
            cell: (row) => <span className="font-bold text-slate-700">PT-{row.id}</span>
        },
        { accessor: 'fullName', header: 'Full Name' },
        { accessor: 'phoneNumber', header: 'Phone Number' },
        { accessor: 'bloodType', header: 'Blood Type' },
        { accessor: 'dateOfBirth', header: 'Date of Birth' }
    ];

    return (
        <div className="flex flex-col gap-6 pb-12">
            <PageHeader title="Patient Directory" subtitle="Manage registered users and oversee network access." />
            <Card>
                <Card.Header>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
                        <div className="w-full sm:w-96"><SearchBar placeholder="Search by name or blood type..." onSearch={setSearchQuery} /></div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"><FiUsers className="text-primary" /> Total: {filteredPatients.length}</div>
                    </div>
                </Card.Header>
                <Card.Body noPadding>
                    <DataTable columns={columns} data={filteredPatients} keyExtractor={(item) => item.id} />
                </Card.Body>
            </Card>
        </div>
    );
}