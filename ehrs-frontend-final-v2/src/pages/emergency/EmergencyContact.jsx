import React from 'react';
import { FiPhone } from 'react-icons/fi';

// This is a reusable component extracted from EmergencyView
export default function EmergencyContact({ contacts }) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest pl-2">Emergency Contacts</h2>
      
      {contacts.map((contact, idx) => (
        <a 
          key={idx} 
          href={`tel:${contact.phone}`}
          className="bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-3xl p-6 flex items-center justify-between shadow-lg shadow-emerald-500/20 group cursor-pointer"
        >
          <div className="flex flex-col text-white">
            <span className="text-sm font-black uppercase tracking-widest opacity-90 mb-1">{contact.relation}</span>
            <span className="text-2xl font-black">{contact.name}</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-white text-emerald-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <FiPhone className="w-8 h-8" />
          </div>
        </a>
      ))}
    </div>
  );
}
