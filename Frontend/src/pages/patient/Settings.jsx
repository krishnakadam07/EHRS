import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiBell, FiShield, FiDownload, FiTrash2, FiSmartphone, FiGlobe } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifs: true,
    smsNotifs: false,
    twoFactor: true,
    shareData: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
      <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto">
        <PageHeader
            title="Settings & Preferences"
            subtitle="Manage your account security, notifications, and data privacy."
        />

        <div className="flex flex-col gap-6">

          {/* Security Section */}
          <SettingsSection title="Security & Authentication" icon={<FiLock className="text-primary w-5 h-5" />}>
            <SettingRow
                title="Two-Factor Authentication"
                description="Require a code sent to your phone when logging in."
                isActive={settings.twoFactor}
                onToggle={() => toggleSetting('twoFactor')}
            />
            <SettingRow
                title="Active Sessions"
                description="Manage devices currently logged into your account."
                action={<Button variant="outline" size="sm"><FiSmartphone className="mr-2" /> Manage Devices</Button>}
            />
          </SettingsSection>

          {/* Notifications Section */}
          <SettingsSection title="Notifications" icon={<FiBell className="text-orange-500 w-5 h-5" />}>
            <SettingRow
                title="Email Notifications"
                description="Receive daily summaries and critical alerts via email."
                isActive={settings.emailNotifs}
                onToggle={() => toggleSetting('emailNotifs')}
            />
            <SettingRow
                title="SMS Alerts"
                description="Get text messages for emergency access only."
                isActive={settings.smsNotifs}
                onToggle={() => toggleSetting('smsNotifs')}
            />
          </SettingsSection>

          {/* Privacy & Data Section */}
          <SettingsSection title="Data Privacy" icon={<FiShield className="text-emerald-500 w-5 h-5" />}>
            <SettingRow
                title="Anonymous Data Sharing"
                description="Allow anonymous usage data to help us improve the platform."
                isActive={settings.shareData}
                onToggle={() => toggleSetting('shareData')}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
              <div className="flex flex-col">
                <span className="text-base font-black text-slate-800">Download Health Data</span>
                <span className="text-sm font-bold text-slate-500 mt-1">Export all your medical records as a ZIP file.</span>
              </div>
              <Button variant="outline"><FiDownload className="mr-2" /> Export Data</Button>
            </div>
          </SettingsSection>

          {/* Danger Zone */}
          <div className="mt-8 border border-red-200 bg-red-50/50 rounded-[32px] overflow-hidden">
            <div className="p-6 border-b border-red-100">
              <h3 className="text-lg font-black text-red-600">Danger Zone</h3>
              <p className="text-sm font-bold text-red-400 mt-1">Irreversible actions for your account.</p>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-base font-black text-slate-800">Delete Account</span>
                <span className="text-sm font-bold text-slate-500 mt-1">Permanently remove all data and revoke hospital access.</span>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white border-none"><FiTrash2 className="mr-2" /> Delete Account</Button>
            </div>
          </div>

        </div>
      </div>
  );
}

function SettingsSection({ title, icon, children }) {
  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[32px] border border-slate-200 shadow-soft overflow-hidden"
      >
        <div className="flex items-center gap-2 p-6 border-b border-slate-100 bg-slate-50/50">
          {icon}
          <h2 className="text-lg font-black text-slate-800 tracking-tight">{title}</h2>
        </div>
        <div className="flex flex-col divide-y divide-slate-100">
          {children}
        </div>
      </motion.div>
  );
}

function SettingRow({ title, description, isActive, onToggle, action }) {
  return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50 transition-colors">
        <div className="flex flex-col pr-8">
          <span className="text-base font-black text-slate-800">{title}</span>
          <span className="text-sm font-bold text-slate-500 mt-1">{description}</span>
        </div>

        <div className="shrink-0">
          {action ? action : (
              <button
                  onClick={onToggle}
                  className={`
              relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out
              ${isActive ? 'bg-primary' : 'bg-slate-200'}
            `}
              >
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`
                absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm
              `}
                    style={{
                      x: isActive ? 24 : 0
                    }}
                />
              </button>
          )}
        </div>
      </div>
  );
}
