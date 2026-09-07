import React, { useState } from 'react';
import { FiSettings, FiBell, FiShield, FiLock, FiSmartphone, FiEye, FiMoon } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function DoctorSettings() {
    const [settings, setSettings] = useState({
        emailAlerts: true,
        smsAlerts: false,
        twoFactor: true,
        darkMode: false,
        biometricLogin: false,
        patientDataSharing: true
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto w-full">
            <PageHeader
                title="Account Settings"
                subtitle="Manage your security preferences, notifications, and application behavior."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* SECURITY PREFERENCES */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <FiShield className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">Security</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <ToggleSetting
                            label="Two-Factor Authentication (2FA)"
                            description="Require an OTP code when logging in from a new device."
                            enabled={settings.twoFactor}
                            onToggle={() => toggleSetting('twoFactor')}
                            icon={<FiLock />}
                        />
                        <ToggleSetting
                            label="Biometric Login"
                            description="Use FaceID or Fingerprint to unlock your dashboard quickly."
                            enabled={settings.biometricLogin}
                            onToggle={() => toggleSetting('biometricLogin')}
                            icon={<FiSmartphone />}
                        />
                    </div>
                </div>

                {/* NOTIFICATIONS */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                            <FiBell className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">Notifications</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <ToggleSetting
                            label="Email Alerts"
                            description="Receive an email when an Admin verifies your license."
                            enabled={settings.emailAlerts}
                            onToggle={() => toggleSetting('emailAlerts')}
                        />
                        <ToggleSetting
                            label="SMS Alerts"
                            description="Get a text message for urgent system announcements."
                            enabled={settings.smsAlerts}
                            onToggle={() => toggleSetting('smsAlerts')}
                        />
                    </div>
                </div>

                {/* APPEARANCE & DATA */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6 md:col-span-2">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                            <FiEye className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">Appearance & Privacy</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ToggleSetting
                            label="Dark Mode"
                            description="Switch the dashboard theme to dark colors."
                            enabled={settings.darkMode}
                            onToggle={() => toggleSetting('darkMode')}
                            icon={<FiMoon />}
                        />
                        <ToggleSetting
                            label="Anonymous Telemetry"
                            description="Share anonymous usage data to help us improve."
                            enabled={settings.patientDataSharing}
                            onToggle={() => toggleSetting('patientDataSharing')}
                        />
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end mt-4">
                <Button variant="primary" size="lg" className="px-8 shadow-xl shadow-primary/20">
                    Save Preferences
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