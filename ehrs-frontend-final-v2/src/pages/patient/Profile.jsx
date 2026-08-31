import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiSave, FiUser, FiPhone, FiCalendar, FiDroplet, FiActivity, FiShield } from 'react-icons/fi';
import { patientService } from '../../services/patientService';
import { motion } from 'framer-motion';

export default function Profile() {
  const { currentUser } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '', phone: '', dob: '', gender: '', bloodGroup: '', height: '', weight: '',
      allergies: '', chronicConditions: '',
      emergencyContactName: '', emergencyContactRelation: '', emergencyContactPhone: '',
      insuranceProvider: '', insurancePolicy: '', insuranceExpiry: ''
    }
  });

  useEffect(() => {
    if (currentUser?.email) {
      patientService.getProfile(currentUser.email)
        .then(data => {
          reset({
            name: data.fullName || '',
            phone: data.phoneNumber || '',
            dob: data.dateOfBirth || '',
            bloodGroup: data.bloodType || '',
            gender: data.gender || '',
            height: data.height || '',
            weight: data.weight || '',
            allergies: data.allergies || '',
            chronicConditions: data.chronicConditions || '',
            emergencyContactName: data.emergencyContacts?.[0]?.name || '',
            emergencyContactRelation: data.emergencyContacts?.[0]?.relation || '',
            emergencyContactPhone: data.emergencyContacts?.[0]?.phone || '',
            insuranceProvider: data.insuranceProvider || '',
            insurancePolicy: data.insurancePolicy || '',
            insuranceExpiry: data.insuranceExpiry || ''
          });
        })
        .catch(err => console.error("Error loading profile", err));
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    const profileData = {
      email: currentUser.email,
      name: data.name,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      height: data.height,
      weight: data.weight,
      allergies: data.allergies ? data.allergies.split(',').map(a => a.trim()) : [],
      chronicConditions: data.chronicConditions ? data.chronicConditions.split(',').map(c => c.trim()) : [],
      emergencyContacts: data.emergencyContactName ? [{
        name: data.emergencyContactName,
        relation: data.emergencyContactRelation,
        phone: data.emergencyContactPhone
      }] : [],
      insurance: {
        provider: data.insuranceProvider,
        policyNumber: data.insurancePolicy,
        expiry: data.insuranceExpiry
      }
    };

    try {
      await patientService.updateProfile(currentUser.email, profileData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">My Profile</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your personal and medical information.</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 font-black hover:bg-blue-50 rounded-xl transition-colors px-4 py-2"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <motion.div 
        whileHover={{ y: -2 }}
        className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-sm border border-slate-200 overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Personal Details */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FiUser className="text-blue-600" /> Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" {...register("name")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="text" {...register("phone")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input type="date" {...register("dob")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select {...register("gender")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Height</label>
                    <input type="text" {...register("height")} disabled={!isEditing} placeholder="e.g. 5'10" className="w-full p-3 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Weight</label>
                    <input type="text" {...register("weight")} disabled={!isEditing} placeholder="e.g. 70kg" className="w-full p-3 border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Medical & Emergency */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FiActivity className="text-red-500" /> Medical & Emergency
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                  <select {...register("bloodGroup")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg">
                    <option value="">Select</option>
                    <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Critical Allergies</label>
                  <input type="text" {...register("allergies")} disabled={!isEditing} placeholder="e.g. Peanuts, Penicillin" className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Chronic Conditions</label>
                  <input type="text" {...register("chronicConditions")} disabled={!isEditing} placeholder="e.g. Diabetes, Asthma" className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 col-span-1 md:col-span-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                    <input type="text" {...register("emergencyContactName")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Relation</label>
                    <input type="text" {...register("emergencyContactRelation")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input type="text" {...register("emergencyContactPhone")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Insurance Details */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FiShield className="text-emerald-500" /> Insurance Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
                  <input type="text" {...register("insuranceProvider")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Policy Number</label>
                  <input type="text" {...register("insurancePolicy")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                  <input type="date" {...register("insuranceExpiry")} disabled={!isEditing} className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {loading ? "Saving..." : <><FiSave /> Save Changes</>}
                </button>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}