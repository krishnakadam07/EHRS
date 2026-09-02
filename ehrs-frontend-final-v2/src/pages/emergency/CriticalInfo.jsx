import React from 'react';
import { motion } from 'framer-motion';
import { FiDroplet, FiAlertTriangle, FiActivity, FiHeart } from 'react-icons/fi';

// This is a reusable component extracted from EmergencyView
export default function CriticalInfo({ profile }) {
  if (!profile) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* CRITICAL VITALS - The "3 Second" Rule Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Blood Type - Massive Visibility */}
        <div className="bg-red-500 rounded-3xl p-6 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] border border-red-400 relative overflow-hidden text-white min-h-[200px]">
            <FiDroplet className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20 pointer-events-none" />
            <span className="text-sm font-black uppercase tracking-widest opacity-90 mb-2 relative z-10">Blood Group</span>
            <span className="text-8xl font-black tracking-tighter relative z-10 leading-none">{profile.bloodType}</span>
        </div>

        {/* Severe Allergies - High Alert */}
        <div className="bg-orange-500 rounded-3xl p-6 flex flex-col shadow-[0_0_40px_rgba(249,115,22,0.2)] border border-orange-400 text-white min-h-[200px]">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <FiAlertTriangle className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-widest">Critical Allergies</span>
            </div>
            <div className="flex flex-col gap-2">
              {profile.allergies.map(allergy => (
                <div key={allergy} className="bg-orange-600/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-orange-400/50 font-black text-lg">
                  {allergy}
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Chronic Diseases */}
      <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <FiActivity className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-widest">Chronic Conditions</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.diseases.map(disease => (
              <span key={disease} className="px-4 py-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-xl font-bold text-lg">
                {disease}
              </span>
            ))}
          </div>
      </div>

      {/* Current Medications */}
      <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <FiHeart className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-widest">Active Medications</h2>
          </div>
          <div className="flex flex-col divide-y divide-slate-700">
            {profile.medications.map((med, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 first:pt-0 last:pb-0 gap-1">
                <span className="text-xl font-bold text-white">{med.name}</span>
                <span className="text-sm font-bold text-slate-400 bg-slate-700 px-3 py-1 rounded-lg self-start sm:self-auto">{med.dosage}</span>
              </div>
            ))}
          </div>
      </div>

    </div>
  );
}
