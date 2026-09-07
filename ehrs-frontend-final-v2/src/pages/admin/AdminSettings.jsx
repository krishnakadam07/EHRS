import React, { useState } from 'react';
import { FiSettings, FiBell, FiShield, FiLock, FiServer, FiEye, FiDatabase, FiAlertTriangle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        newDoctorAlerts: true,
        systemErrorAlerts: true,
        dailySummary: false,
        requireAdmin2FA: true,
        strictPasswords: true,
        auditLogging: true,
        maintenanceMode: false
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto w-full">
            <PageHeader
                title="System Settings"
                subtitle="Manage global platform configurations, admin security, and server alerts."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* PLATFORM SECURITY */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                            <FiShield className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">Platform Security</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <ToggleSetting
                            label="Enforce Admin 2FA"
                            description="Mandatory Two-Factor Authentication for all Admin accounts."
                            enabled={settings.requireAdmin2FA}
                            onToggle={() => toggleSetting('requireAdmin2FA')}
                            icon={<FiLock />}
                        />
                        <ToggleSetting
                            label="Strict Password Policy"
                            description="Require special characters, numbers, and 12+ character lengths."
                            enabled={settings.strictPasswords}
                            onToggle={() => toggleSetting('strictPasswords')}
                            icon={<FiSettings />}
                        />
                        <ToggleSetting
                            label="Global Audit Logging"
                            description="Record every database change made by any user on the platform."
                            enabled={settings.auditLogging}
                            onToggle={() => toggleSetting('auditLogging')}
                            icon={<FiDatabase />}
                        />
                    </div>
                </div>

                {/* SERVER & SYSTEM ALERTS */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                            <FiServer className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">System Alerts</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <ToggleSetting
                            label="New Doctor Registrations"
                            description="Send an email whenever a new doctor requires verification."
                            enabled={settings.newDoctorAlerts}
                            onToggle={() => toggleSetting('newDoctorAlerts')}
                            icon={<FiBell />}
                        />
                        <ToggleSetting
                            label="Critical Error Alerts"
                            description="Get SMS alerts if the Spring Boot backend experiences a crash."
                            enabled={settings.systemErrorAlerts}
                            onToggle={() => toggleSetting('systemErrorAlerts')}
                            icon={<FiAlertTriangle />}
                        />
                        <ToggleSetting
                            label="Maintenance Mode"
                            description="Temporarily disable logins for Patients and Doctors."
                            enabled={settings.maintenanceMode}
                            onToggle={() => toggleSetting('maintenanceMode')}
                            icon={<FiEye />}
                        />
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end mt-4">
                <Button variant="primary" size="lg" className="px-8 shadow-xl shadow-primary/20">
                    Apply Global Settings
                </Button>
            </div>
        </div>
    );
}

// 🌟 Reusable Toggle Component
function ToggleSetting({ label, description, enabled, onToggle, icon }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-3">
                {icon && <div className="text-slate-400">{icon}</div>}
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{label}</span>
                    <span className="text-xs font-medium text-slate-500">{description}</span>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${enabled ? 'bg-primary' : 'bg-slate-300'}`}
            >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>
    );
}