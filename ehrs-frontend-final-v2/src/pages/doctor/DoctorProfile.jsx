import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiMapPin, FiShield, FiCheckCircle, FiStar, FiAward, FiClock } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { doctorService } from '../../services/doctorService';

export default function DoctorProfile() {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [doctorData, setDoctorData] = useState({
    fullName: '',
    email: '',
    hospitalAffiliation: '',
    specialty: 'Emergency Medicine',
    licenseNumber: '',
    verified: false
  });

  // Fetch data on load
  useEffect(() => {
    if (currentUser?.email) {
      doctorService.getDoctorProfile(currentUser.email)
          .then(data => {
            setDoctorData({
              fullName: data.fullName || '',
              email: currentUser.email,
              hospitalAffiliation: data.hospitalAffiliation || '',
              specialty: data.specialty || 'Emergency Medicine',
              licenseNumber: data.licenseNumber || '',
              verified: data.verified || false
            });
            setLoading(false);
          })
          .catch(err => {
            console.error("Failed to fetch doctor profile", err);
            setLoading(false);
          });
    }
  }, [currentUser]);

  // Handle typing in input fields
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  // 🌟 Handle clicking "Save Changes"
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await doctorService.updateDoctorProfile(currentUser.email, doctorData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Error saving profile. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-slate-500 font-bold animate-pulse">Loading Profile...</div>;
  }

  return (
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
        <PageHeader title="Doctor Profile" subtitle="Manage your credentials and hospital affiliations." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: ID Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-primary to-sky-600 rounded-[32px] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-5xl font-black mb-4 relative z-10">
                {doctorData.fullName.charAt(0) || 'D'}
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-1">{doctorData.fullName}</h2>
                <p className="text-sky-100 font-bold mb-4">{doctorData.specialty}</p>

                {doctorData.verified ? (
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 mb-6">
                      <FiCheckCircle className="text-emerald-300" />
                      <span className="text-sm font-bold text-emerald-100">Verified Practitioner</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6">
                      <FiShield className="text-orange-300" />
                      <span className="text-sm font-bold text-orange-100">Verification Pending</span>
                    </div>
                )}
              </div>
              <div className="w-full bg-black/20 rounded-2xl p-4 text-left relative z-10">
                <span className="block text-[10px] font-black uppercase text-sky-200 tracking-widest mb-1">Medical License</span>
                <span className="font-mono text-lg font-bold">{doctorData.licenseNumber}</span>
              </div>
            </div>

            <Card>
              <Card.Body padding="p-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Professional Stats</h3>
                <div className="flex flex-col gap-4">
                  <StatRow icon={<FiStar />} label="Patient Rating" value="4.9/5.0" />
                  <StatRow icon={<FiClock />} label="Consultations" value="14,281+" />
                </div>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Right Column: Editable Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="h-full">
              <Card.Header className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
                {/* 🌟 EDIT AND SAVE BUTTONS */}
                {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button variant="primary" size="sm" onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
                    </div>
                )}
              </Card.Header>

              <Card.Body padding="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <Input label="Full Name" name="fullName" value={doctorData.fullName} onChange={handleChange} disabled={!isEditing} icon={<FiUser />} />
                  </div>
                  <Input label="Email Address" name="email" value={doctorData.email} disabled={true} icon={<FiMail />} />
                  <Input label="Hospital Affiliation" name="hospitalAffiliation" value={doctorData.hospitalAffiliation} onChange={handleChange} disabled={!isEditing} icon={<FiMapPin />} />
                  <Input label="Medical License" name="licenseNumber" value={doctorData.licenseNumber} onChange={handleChange} disabled={!isEditing} icon={<FiShield />} />
                  <Input label="Specialty" name="specialty" value={doctorData.specialty} onChange={handleChange} disabled={!isEditing} icon={<FiAward />} />
                </div>
              </Card.Body>
            </Card>
          </motion.div>

        </div>
      </div>
  );
}

function StatRow({ icon, label, value }) {
  return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3"><div className="text-primary">{icon}</div><span className="text-sm font-bold text-slate-600">{label}</span></div>
        <span className="text-sm font-black text-slate-800">{value}</span>
      </div>
  );
}