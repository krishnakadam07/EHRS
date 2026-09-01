import React, { useState, useEffect } from 'react';
import { FiAlertOctagon, FiShieldOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { adminService } from '../../services/adminService';

import { ROUTES } from '../../routes/routeConstants'; // Adjust this import if needed

export default function AdminReports() {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        adminService.getFraudReports().then(setReports).catch(console.error);
    }, []);

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
            <PageHeader title="Fraud Investigations" subtitle="Review unauthorized access reports submitted by patients." />

            <div className="grid grid-cols-1 gap-4">
                {reports.length === 0 ? (
                    <div className="text-center p-12 text-slate-400 font-bold bg-white rounded-2xl border border-slate-200">No active fraud reports.</div>
                ) : (
                    reports.map(report => (
                        <Card key={report.id} className="border-red-200">
                            <Card.Body>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiAlertOctagon className="text-red-500" />
                                            <h3 className="font-black text-slate-800">{report.title}</h3>
                                            <span className="text-xs text-slate-400">{report.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 bg-red-50 p-4 rounded-xl border border-red-100 font-medium">
                                            {report.message}
                                        </p>
                                    </div>
                                    <Button variant="danger" icon={<FiShieldOff />} onClick={() => navigate('/admin/doctors')}>
                                        Go Block Doctor
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}