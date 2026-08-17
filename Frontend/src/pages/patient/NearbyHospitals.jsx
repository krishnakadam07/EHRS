import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhoneCall, FiNavigation, FiClock, FiActivity, FiShield } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';

// Mock Hospitals Data
const MOCK_HOSPITALS = [
    { id: 1, name: 'City General Hospital', distance: 1.2, address: '123 Health Ave, Metro City', open: true, emergency: '+1 555-0911', ambulance: '+1 555-0912', type: 'Level 1 Trauma Center', coordinates: { x: 30, y: 40 } },
    { id: 2, name: 'Westside Medical Center', distance: 3.5, address: '456 West Blvd, Metro City', open: true, emergency: '+1 555-0921', ambulance: '+1 555-0922', type: 'General Hospital', coordinates: { x: 70, y: 20 } },
    { id: 3, name: 'St. Jude Childrens Research', distance: 5.8, address: '789 Hope St, Metro City', open: true, emergency: '+1 555-0931', ambulance: '+1 555-0932', type: 'Specialty Care', coordinates: { x: 50, y: 80 } },
    { id: 4, name: 'Metro Cardiology Clinic', distance: 8.4, address: '101 Heart Way, Metro City', open: false, emergency: null, ambulance: null, type: 'Specialty Clinic', coordinates: { x: 80, y: 60 } },
];

export default function NearbyHospitals() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeHospital, setActiveHospital] = useState(MOCK_HOSPITALS[0]);

    const filteredHospitals = MOCK_HOSPITALS.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.32))] min-h-[600px] pb-6 relative">
            <div className="mb-4 shrink-0">
                <PageHeader
                    title="Nearby Hospitals & Emergency"
                    subtitle="Locate trauma centers and dispatch ambulances instantly."
                />
            </div>

            {/* Split Screen Layout Container */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 relative">

                {/* Left Pane: List View (Scrollable) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 h-[400px] lg:h-full shrink-0">
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 shrink-0">
                        <SearchBar placeholder="Search hospitals or specialties..." onSearch={setSearchQuery} />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4 pb-4">
                        {filteredHospitals.map(hospital => (
                            <HospitalCard
                                key={hospital.id}
                                hospital={hospital}
                                isActive={activeHospital.id === hospital.id}
                                onClick={() => setActiveHospital(hospital)}
                            />
                        ))}
                        {filteredHospitals.length === 0 && (
                            <div className="p-8 text-center text-slate-500 font-medium">No hospitals found matching your criteria.</div>
                        )}
                    </div>
                </div>

                {/* Right Pane: Premium Map Placeholder */}
                <div className="w-full lg:w-2/3 h-[400px] lg:h-full bg-slate-100 rounded-[2rem] overflow-hidden relative shadow-inner border border-slate-200 shrink-0">

                    {/* Stylized Map Background (Mesh Gradient) */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-slate-100 to-emerald-50 opacity-80" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-50" />

                    {/* Interactive Map Pins */}
                    {filteredHospitals.map(hospital => (
                        <MapPin
                            key={hospital.id}
                            hospital={hospital}
                            isActive={activeHospital.id === hospital.id}
                            onClick={() => setActiveHospital(hospital)}
                        />
                    ))}

                    {/* Active Hospital Quick Info Overlay (Bottom Left) */}
                    <AnimatePresence mode="wait">
                        {activeHospital && (
                            <motion.div
                                key={activeHospital.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-80 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/50"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <FiActivity className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-800 leading-tight truncate">{activeHospital.name}</h3>
                                </div>
                                <p className="text-xs font-bold text-slate-500 mb-4">{activeHospital.address}</p>

                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-700 transition-colors">
                                        <FiNavigation /> Direct
                                    </button>
                                    {activeHospital.ambulance && (
                                        <a href={`tel:${activeHospital.ambulance}`} className="flex-1 py-2 bg-red-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                                            <FiPhoneCall /> EMS
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Subcomponents

function HospitalCard({ hospital, isActive, onClick }) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`
         p-5 rounded-[24px] border cursor-pointer transition-all duration-300 shadow-soft hover:shadow-premium
         ${isActive
                ? 'bg-primary/5 border-primary shadow-md'
                : 'bg-white border-slate-200 hover:border-primary/40'
            }
      `}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-black text-slate-800 leading-tight pr-2">{hospital.name}</h3>
                <Badge variant={hospital.open ? 'success' : 'danger'} soft shrink>
                    {hospital.open ? 'Open' : 'Closed'}
                </Badge>
            </div>

            <p className="text-xs font-bold text-slate-500 mb-4">{hospital.type}</p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-sm font-black text-sky-600">
                    <FiNavigation className="w-4 h-4" /> {hospital.distance} km
                </div>
                {hospital.emergency && (
                    <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                        <FiPhoneCall /> {hospital.emergency}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function MapPin({ hospital, isActive, onClick }) {
    return (
        <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            style={{ left: `${hospital.coordinates.x}%`, top: `${hospital.coordinates.y}%` }}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            animate={isActive ? { scale: 1.2, zIndex: 20 } : { scale: 1, zIndex: 10 }}
        >
            {/* Ping Animation for Active Pin */}
            {isActive && (
                <span className="absolute flex h-full w-full inset-0">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
            </span>
            )}

            <div className={`
            relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg border-2 transition-colors
            ${isActive ? 'bg-primary border-white text-white' : 'bg-white border-primary text-primary group-hover:bg-primary/10'}
         `}>
                {hospital.type.includes('Trauma') ? <FiShield className="w-5 h-5" /> : <FiMapPin className="w-5 h-5" />}
            </div>

            {/* Tooltip on Hover (Desktop) */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {hospital.name}
            </div>
        </motion.div>
    );
}
