import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiSave, FiUser, FiPhone, FiCalendar, FiDroplet } from 'react-icons/fi';
import { updatePatientProfile } from '../../redux/patient/patientApi';
import Loader from '../../components/common/Loader';
import { motion } from 'framer-motion';

export default function Profile() {
  const { currentUser } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.patient);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      dob: currentUser?.dob || '',
      gender: currentUser?.gender || '',
      bloodGroup: currentUser?.bloodGroup || '',
      insuranceProvider: currentUser?.insurance?.provider || '',
      insurancePolicy: currentUser?.insurance?.policyNumber || '',
      insuranceExpiry: currentUser?.insurance?.expiry || ''
    }
  });

  const onSubmit = async (data) => {
    const profileData = {
      id: currentUser.id,
      name: data.name,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      insurance: {
        provider: data.insuranceProvider,
        policyNumber: data.insurancePolicy,
        expiry: data.insuranceExpiry
      }
    };

    try {
      await dispatch(updatePatientProfile(profileData));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (!currentUser) return null;

  return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">My Profile</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your personal and insurance information.</p>
          </div>
          <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary font-black hover:bg-primary/5 rounded-xl transition-colors px-4 py-2"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-soft border border-slate-200 overflow-hidden hover:shadow-premium hover:border-primary/30 transition-all duration-300"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Personal Details Section */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FiUser className="text-primary" /> Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} ${errors.name ? 'border-danger' : 'border-slate-300'}`}
                    />
                    {errors.name && <p className="text-danger text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                          type="text"
                          {...register("phone")}
                          disabled={!isEditing}
                          className={`w-full p-3 pl-10 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                          type="date"
                          {...register("dob")}
                          disabled={!isEditing}
                          className={`w-full p-3 pl-10 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                      <select
                          {...register("gender")}
                          disabled={!isEditing}
                          className={`w-full p-3 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                        <FiDroplet className="text-danger" /> Blood Group
                      </label>
                      <select
                          {...register("bloodGroup")}
                          disabled={!isEditing}
                          className={`w-full p-3 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Insurance Details Section */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Insurance Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
                    <input
                        type="text"
                        {...register("insuranceProvider")}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Policy Number</label>
                    <input
                        type="text"
                        {...register("insurancePolicy")}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                    <input
                        type="date"
                        {...register("insuranceExpiry")}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg outline-none transition-colors ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white focus:border-primary focus:ring-1 focus:ring-primary'} border-slate-300`}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                  <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
                    >
                      {loading ? <Loader inline /> : <FiSave />}
                      Save Changes
                    </button>
                  </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
  );
}
