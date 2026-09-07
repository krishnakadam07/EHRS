<<<<<<< HEAD
import React, { useState } from 'react';
import { FiSettings, FiBell, FiShield, FiLock, FiSmartphone, FiEye, FiMoon, FiHeart, FiActivity } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function Settings() {
  const [settings, setSettings] = useState({
    appointmentAlerts: true,
    prescriptionRefills: true,
    loginAlerts: true,
    twoFactor: false,
    qrPinProtection: true,
    shareDataForResearch: false,
    darkMode: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
      <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto w-full">
        <PageHeader
            title="Account Settings"
            subtitle="Manage your medical privacy, security preferences, and system notifications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* SECURITY & PRIVACY */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                <FiShield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-800">Security & Privacy</h3>
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
                  label="Emergency QR PIN"
                  description="Require paramedics to enter a 4-digit PIN to scan your QR code."
                  enabled={settings.qrPinProtection}
                  onToggle={() => toggleSetting('qrPinProtection')}
                  icon={<FiSmartphone />}
              />
              <ToggleSetting
                  label="Medical Research Data"
                  description="Anonymously share medical data to help clinical research."
                  enabled={settings.shareDataForResearch}
                  onToggle={() => toggleSetting('shareDataForResearch')}
                  icon={<FiHeart />}
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
                  label="Prescription Alerts"
                  description="Get notified when a new prescription is added by your doctor."
                  enabled={settings.prescriptionRefills}
                  onToggle={() => toggleSetting('prescriptionRefills')}
                  icon={<FiActivity />}
              />
              <ToggleSetting
                  label="Login Alerts"
                  description="Receive an email if a login occurs from an unrecognized device."
                  enabled={settings.loginAlerts}
                  onToggle={() => toggleSetting('loginAlerts')}
                  icon={<FiEye />}
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
=======
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiBell, FiShield, FiDownload, FiTrash2, FiSmartphone } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { patientService } from '../../services/patientService';

export default function Settings() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [settings, setSettings] = useState({ emailNotifs: true, smsNotifs: false, twoFactor: true, shareData: false });

  useEffect(() => {
    if (currentUser?.email) {
      patientService.getSettings(currentUser.email).then(data => {
        setSettings({ emailNotifs: data.emailNotifs, smsNotifs: data.smsNotifs, twoFactor: data.twoFactor, shareData: data.shareData });
        setLoading(false);
      }).catch(err => { console.error("Failed to load settings", err); setLoading(false); });
    }
  }, [currentUser]);

  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    patientService.updateSettings(currentUser.email, newSettings)
      .then(() => toast.success("Settings saved to database."))
      .catch(() => { toast.error("Failed to save settings."); setSettings(settings); });
  };

  if (loading) return <div className="text-center mt-20 text-slate-500 font-bold">Loading Preferences...</div>;

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto">
      <PageHeader title="Settings & Preferences" subtitle="Manage your account security, notifications, and data privacy." />
      <div className="flex flex-col gap-6">
        <SettingsSection title="Security & Authentication" icon={<FiLock className="text-blue-600 w-5 h-5" />}>
          <SettingRow title="Two-Factor Authentication" description="Require a code sent to your phone when logging in." isActive={settings.twoFactor} onToggle={() => toggleSetting('twoFactor')} />
          <SettingRow title="Active Sessions" description="Manage devices currently logged into your account." action={<Button variant="outline" size="sm"><FiSmartphone className="mr-2" /> Manage Devices</Button>} />
        </SettingsSection>
        <SettingsSection title="Notifications" icon={<FiBell className="text-orange-500 w-5 h-5" />}>
          <SettingRow title="Email Notifications" description="Receive daily summaries and critical alerts via email." isActive={settings.emailNotifs} onToggle={() => toggleSetting('emailNotifs')} />
          <SettingRow title="SMS Alerts" description="Get text messages for emergency access only." isActive={settings.smsNotifs} onToggle={() => toggleSetting('smsNotifs')} />
        </SettingsSection>
        <SettingsSection title="Data Privacy" icon={<FiShield className="text-emerald-500 w-5 h-5" />}>
          <SettingRow title="Anonymous Data Sharing" description="Allow anonymous usage data to help us improve the platform." isActive={settings.shareData} onToggle={() => toggleSetting('shareData')} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
            <div className="flex flex-col"><span className="text-base font-black text-slate-800">Download Health Data</span><span className="text-sm font-bold text-slate-500 mt-1">Export all your medical records as a ZIP file.</span></div>
            <Button variant="outline" onClick={() => toast.success("Preparing your ZIP file...")}><FiDownload className="mr-2" /> Export Data</Button>
          </div>
        </SettingsSection>
        <div className="mt-8 border border-red-200 bg-red-50/50 rounded-[32px] overflow-hidden">
          <div className="p-6 border-b border-red-100"><h3 className="text-lg font-black text-red-600">Danger Zone</h3><p className="text-sm font-bold text-red-400 mt-1">Irreversible actions for your account.</p></div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col"><span className="text-base font-black text-slate-800">Delete Account</span><span className="text-sm font-bold text-slate-500 mt-1">Permanently remove all data and revoke hospital access.</span></div>
            <Button className="bg-red-500 hover:bg-red-600 text-white border-none" onClick={() => toast.error("Account deletion request initiated.")}><FiTrash2 className="mr-2" /> Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
function SettingsSection({ title, icon, children }) { return ( <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden"> <div className="flex items-center gap-2 p-6 border-b border-slate-100 bg-slate-50/50"> {icon} <h2 className="text-lg font-black text-slate-800 tracking-tight">{title}</h2> </div> <div className="flex flex-col divide-y divide-slate-100">{children}</div> </motion.div> ); }
function SettingRow({ title, description, isActive, onToggle, action }) { return ( <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50 transition-colors"> <div className="flex flex-col pr-8"> <span className="text-base font-black text-slate-800">{title}</span> <span className="text-sm font-bold text-slate-500 mt-1">{description}</span> </div> <div className="shrink-0"> {action ? action : ( <button onClick={onToggle} className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`}> <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm" style={{ x: isActive ? 24 : 0 }} /> </button> )} </div> </div> ); }
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
