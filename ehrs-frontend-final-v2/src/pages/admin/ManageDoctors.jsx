import React, { useState, useEffect } from 'react';
import { FiActivity, FiLock, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { adminService } from '../../services/adminService';

export default function ManageDoctors() {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = () => {
        adminService.getAllDoctors().then(setDoctors).catch(console.error);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleToggleStatus = async (doctor) => {
        try {
            if (doctor.verified) {
                await adminService.suspendDoctor(doctor.id);
                toast.warning(`${doctor.fullName} has been suspended.`);
            } else {
                await adminService.approveDoctor(doctor.id);
                toast.success(`${doctor.fullName} has been approved.`);
            }
            fetchDoctors(); // Refresh the table automatically
        } catch (error) {
            toast.error("Failed to update doctor status.");
        }
    };

    const filteredDoctors = doctors.filter(d =>
        (d.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.licenseNumber || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            accessor: 'id',
            header: 'Network ID',
            cell: (row) => <span className="font-bold text-slate-700">DR-{row.id}</span>
        },
        { accessor: 'fullName', header: 'Doctor Name' },
        { accessor: 'licenseNumber', header: 'Medical License' },
        { accessor: 'hospitalAffiliation', header: 'Affiliated Hospital' },
        {
            accessor: 'verified',
            header: 'Status',
            cell: (row) => <Badge variant={row.verified ? 'success' : 'warning'} soft>{row.verified ? 'Active' : 'Pending'}</Badge>
        },
        {
            accessor: 'actions',
            header: 'Actions',
            cell: (row) => (
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(row)}
                        className={row.verified ? 'text-orange-500 hover:bg-orange-50 hover:border-orange-200' : 'text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200'}
                    >
                        {row.verified ? <span className="flex items-center gap-1"><FiLock/> Suspend</span> : <span className="flex items-center gap-1"><FiCheckCircle/> Approve</span>}
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 pb-12">
            <PageHeader title="Doctor Directory" subtitle="Manage verified medical professionals and their network privileges." />
            <Card>
                <Card.Header>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
                        <div className="w-full sm:w-96"><SearchBar placeholder="Search by name or license number..." onSearch={setSearchQuery} /></div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"><FiActivity className="text-primary" /> Total: {filteredDoctors.length}</div>
                    </div>
                </Card.Header>
                <Card.Body noPadding>
                    <DataTable columns={columns} data={filteredDoctors} keyExtractor={(item) => item.id} />
                </Card.Body>
            </Card>
        </div>
    );
}