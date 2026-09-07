import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPhone, FiDroplet, FiClock, FiSearch, FiAlertCircle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import Badge from '../../components/common/Badge';

// Mock Blood Banks
const MOCK_BLOOD_BANKS = [
    { id: 1, name: 'City Central Blood Bank', distance: 2.4, status: 'Open 24/7', phone: '+1 555-0100', inventory: { 'A+': 'High', 'O-': 'Low', 'B+': 'Medium', 'AB+': 'High' } },
    { id: 2, name: 'Metro General Hospital Blood Center', distance: 5.1, status: 'Closes at 8 PM', phone: '+1 555-0101', inventory: { 'A+': 'Medium', 'O-': 'Critical', 'B+': 'High', 'AB+': 'Medium' } },
    { id: 3, name: 'Red Cross Regional', distance: 8.7, status: 'Open 24/7', phone: '+1 555-0102', inventory: { 'A+': 'High', 'O-': 'Medium', 'B+': 'Medium', 'AB+': 'Low' } },
    { id: 4, name: 'Westside Community Clinic', distance: 12.0, status: 'Closes at 6 PM', phone: '+1 555-0103', inventory: { 'A+': 'Low', 'O-': 'Out of Stock', 'B+': 'Low', 'AB+': 'Critical' } },
    { id: 5, name: 'University Medical Blood Drive', distance: 3.2, status: 'Closes at 5 PM', phone: '+1 555-0104', inventory: { 'A+': 'Medium', 'O-': 'High', 'B+': 'High', 'AB+': 'High' } },
];

const BLOOD_TYPES = ['All Types', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const DISTANCES = [
    { label: 'Any Distance', value: 100 },
    { label: 'Within 5 km', value: 5 },
    { label: 'Within 10 km', value: 10 },
    { label: 'Within 20 km', value: 20 },
];

export default function BloodBankFinder() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('All Types');
    const [maxDistance, setMaxDistance] = useState(100);

    const filteredBanks = useMemo(() => {
        return MOCK_BLOOD_BANKS.filter(bank => {
            // 1. Search Filter
            const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase());
            // 2. Distance Filter
            const matchesDistance = bank.distance <= maxDistance;
            // 3. Blood Type Filter
            let matchesType = true;
            if (selectedBloodType !== 'All Types') {
                const stock = bank.inventory[selectedBloodType];
                matchesType = stock && stock !== 'Out of Stock';
            }

            return matchesSearch && matchesDistance && matchesType;
        }).sort((a, b) => a.distance - b.distance);
    }, [searchQuery, selectedBloodType, maxDistance]);

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-7xl mx-auto">
            <PageHeader
                title="Blood Bank Finder"
                subtitle="Locate nearby blood banks and check real-time stock availability for specific blood groups."
            />

            {/* Filter Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200 sticky top-20 z-20">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="w-full lg:flex-1">
                        <SearchBar placeholder="Search by hospital or blood bank name..." onSearch={setSearchQuery} />
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 custom-scrollbar hide-scrollbar-on-mobile">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 shrink-0">
                            <FiDroplet className="text-red-500 w-5 h-5" />
                            <select
                                value={selectedBloodType}
                                onChange={(e) => setSelectedBloodType(e.target.value)}
                                className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                            >
                                {BLOOD_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 shrink-0">
                            <FiMapPin className="text-sky-500 w-5 h-5" />
                            <select
                                value={maxDistance}
                                onChange={(e) => setMaxDistance(Number(e.target.value))}
                                className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                            >
                                {DISTANCES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
                {filteredBanks.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-200"
                    >
                        <FiAlertCircle className="w-16 h-16 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Blood Banks Found</h3>
                        <p className="text-slate-500 max-w-md">Try expanding your search radius or changing the requested blood type.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredBanks.map(bank => (
                            <BloodBankCard
                                key={bank.id}
                                bank={bank}
                                selectedBloodType={selectedBloodType}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function BloodBankCard({ bank, selectedBloodType }) {
    // Determine primary badge to show (either the requested type, or a generic stock overview)
    const stockLevels = selectedBloodType === 'All Types'
        ? Object.entries(bank.inventory).slice(0, 3) // Show first 3 if "All"
        : [[selectedBloodType, bank.inventory[selectedBloodType] || 'Unknown']];

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-soft hover:shadow-premium hover:border-red-500/30 transition-all flex flex-col h-full group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-[20px] bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-red-500/30">
                    <FiDroplet className="w-7 h-7" />
                </div>
                <Badge variant={bank.status.includes('24/7') ? 'success' : 'warning'} soft>
                    {bank.status}
                </Badge>
            </div>

            <h3 className="text-xl font-black text-slate-800 leading-tight mb-2 line-clamp-2">{bank.name}</h3>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-6">
                <span className="flex items-center gap-1"><FiMapPin className="w-4 h-4 text-sky-500" /> {bank.distance} km away</span>
                <span className="flex items-center gap-1"><FiClock className="w-4 h-4 text-orange-400" /> Updated 10m ago</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex-1 mb-6">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Inventory Status</h4>
                <div className="flex flex-col gap-2">
                    {stockLevels.map(([type, status]) => (
                        <div key={type} className="flex items-center justify-between">
                            <span className="text-sm font-black text-slate-700">{type}</span>
                            <StockBadge status={status} />
                        </div>
                    ))}
                </div>
            </div>

            <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${bank.phone}`}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
                <FiPhone /> Call {bank.phone}
            </motion.a>
        </motion.div>
    );
}

function StockBadge({ status }) {
    let bg = 'bg-slate-100 text-slate-600';
    if (status === 'High') bg = 'bg-emerald-100 text-emerald-700';
    if (status === 'Medium') bg = 'bg-sky-100 text-sky-700';
    if (status === 'Low') bg = 'bg-orange-100 text-orange-700';
    if (status === 'Critical' || status === 'Out of Stock') bg = 'bg-red-100 text-red-700';

    return (
        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${bg}`}>
       {status}
     </span>
    );
}
