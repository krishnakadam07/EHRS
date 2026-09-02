import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPhoneCall, FiNavigation, FiHeart, FiDroplet, FiInfo, FiCrosshair, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { getCurrentLocation, fetchNearbyBloodBanks } from '../../services/locationService';

// Fallback Mock Data
const MOCK_BLOOD_BANKS = [
  { id: 'mock-1', name: 'Mercer County Community Blood Center', distance: '2.3 km', address: '414 Red Cross Rd, Trenton', phone: '+1 555-0140', stock: { "O+": "High", "O-": "Low", "A+": "Critical", "B+": "High", "AB-": "Out of Stock" }, coordinates: { x: 20, y: 30 } },
  { id: 'mock-2', name: 'Metro Red Cross Blood Bank', distance: '4.5 km', address: '880 Donor Blvd, Princeton', phone: '+1 555-0211', stock: { "O+": "Medium", "O-": "Medium", "A+": "High", "B+": "Critical", "AB-": "Low" }, coordinates: { x: 70, y: 60 } }
];

const STOCK_COLORS = {
  'High': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Medium': 'text-sky-600 bg-sky-50 border-sky-200',
  'Low': 'text-warning bg-orange-50 border-orange-200',
  'Critical': 'text-red-600 bg-red-50 border-red-200',
  'Out of Stock': 'text-slate-500 bg-slate-100 border-slate-300'
};

export default function BloodBankFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodBanks, setBloodBanks] = useState(MOCK_BLOOD_BANKS);
  const [activeBank, setActiveBank] = useState(MOCK_BLOOD_BANKS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [usingRealData, setUsingRealData] = useState(false);

  const locateRealBloodBanks = async () => {
    setIsLoading(true);
    try {
      const coords = await getCurrentLocation();
      toast.success('Location acquired. Searching for blood banks/donation centers...');
      
      const realBanks = await fetchNearbyBloodBanks(coords.lat, coords.lng, 15000); // 15km radius
      
      if (realBanks.length > 0) {
        // Map abstract coordinates for visual map
        const mapped = realBanks.map(b => ({
          ...b,
          coordinates: { x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 }
        }));
        setBloodBanks(mapped);
        setActiveBank(mapped[0]);
        setUsingRealData(true);
        toast.success(`Found ${mapped.length} real blood centers near you!`);
      } else {
        toast.warning('No blood centers found in a 15km radius on OpenStreetMap. Showing demo data.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not get location. Ensure GPS is enabled.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBanks = bloodBanks.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.32))] min-h-[600px] pb-6 relative">
      <div className="mb-4 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <PageHeader 
            title="Blood Bank Availability" 
            subtitle="Locate nearest blood banks and check real-time stock levels."
         />
         <Button 
            variant="primary" 
            onClick={locateRealBloodBanks}
            disabled={isLoading}
            className="shadow-premium shadow-red-500/30 bg-red-600 hover:bg-red-700 border-none"
         >
            {isLoading ? <FiLoader className="animate-spin w-5 h-5" /> : <FiCrosshair className="w-5 h-5" />}
            {isLoading ? 'Locating...' : 'Use My GPS Location'}
         </Button>
      </div>

      {usingRealData && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm font-bold shadow-sm">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Live GPS tracking active. Showing real facilities within 15km via OpenStreetMap. Stock levels are simulated for demonstration.
        </div>
      )}

      {/* Split Screen Layout Container */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 relative">
        
        {/* Left Pane: List View (Scrollable) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 h-[400px] lg:h-full shrink-0">
           <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 shrink-0">
              <SearchBar placeholder="Search by name or area..." onSearch={setSearchQuery} />
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4 pb-4">
              {filteredBanks.map(bank => (
                 <BloodBankCard 
                    key={bank.id} 
                    bank={bank} 
                    isActive={activeBank?.id === bank.id}
                    onClick={() => setActiveBank(bank)}
                 />
              ))}
              {filteredBanks.length === 0 && (
                 <div className="p-8 text-center text-slate-500 font-medium">No blood banks found matching your criteria.</div>
              )}
           </div>
        </div>

        {/* Right Pane: Premium Map & Live Stock Detail */}
        <div className="w-full lg:w-2/3 flex flex-col h-full shrink-0 gap-6">
            
            {/* Top: Minimalist Radar Map */}
            <div className="flex-1 min-h-[300px] bg-slate-900 rounded-[2rem] overflow-hidden relative shadow-inner border border-slate-800 shrink-0 flex items-center justify-center">
               
               {/* Radar Rings */}
               <div className="absolute w-[800px] h-[800px] rounded-full border border-slate-800 opacity-50" />
               <div className="absolute w-[600px] h-[600px] rounded-full border border-slate-700 opacity-40" />
               <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-600 opacity-30" />
               <div className="absolute w-[200px] h-[200px] rounded-full border border-red-500/20 bg-red-500/5 animate-pulse" />
               
               {/* Center User Dot */}
               <div className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] z-0" />
               <div className="absolute w-12 h-12 bg-red-500/20 rounded-full animate-ping" />

               {/* Map Pins */}
               {filteredBanks.map(bank => (
                  <MapPin 
                     key={bank.id} 
                     bank={bank} 
                     isActive={activeBank?.id === bank.id}
                     onClick={() => setActiveBank(bank)}
                  />
               ))}
            </div>

            {/* Bottom: Active Blood Bank Stock Details */}
            <div className="shrink-0">
               <AnimatePresence mode="wait">
                  {activeBank ? (
                     <motion.div 
                        key={activeBank.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-[2rem] p-6 shadow-soft border border-slate-200"
                     >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 pb-6 border-b border-slate-100 gap-4">
                           <div>
                              <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                                 <FiHeart className="text-red-500" /> {activeBank.name}
                              </h3>
                              <p className="text-sm font-bold text-slate-500 mt-2">{activeBank.address}</p>
                           </div>
                           <div className="flex gap-2">
                              <button 
                                 onClick={() => {
                                   if (activeBank.isReal) {
                                     window.open(`https://www.google.com/maps/dir/?api=1&destination=${activeBank.lat},${activeBank.lng}`, '_blank');
                                   } else {
                                     toast.info('Opening Maps...');
                                   }
                                 }}
                                 className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors"
                              >
                                 <FiNavigation /> Drive
                              </button>
                              <a href={`tel:${activeBank.phone}`} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-100 transition-colors">
                                 <FiPhoneCall /> Call
                              </a>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                           {Object.entries(activeBank.stock).map(([bloodType, level]) => (
                              <div key={bloodType} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 ${STOCK_COLORS[level]} transition-colors`}>
                                 <span className="text-2xl font-black">{bloodType}</span>
                                 <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80">{level}</span>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  ) : (
                     <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-slate-200 h-48 flex flex-col items-center justify-center text-slate-400">
                        <FiInfo className="w-8 h-8 mb-2" />
                        <p className="font-bold">Select a blood bank to view real-time stock</p>
                     </div>
                  )}
               </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function BloodBankCard({ bank, isActive, onClick }) {
  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
         p-5 rounded-[24px] border cursor-pointer transition-all duration-300 shadow-soft hover:shadow-premium
         ${isActive 
            ? 'bg-red-50/50 border-red-500 shadow-md' 
            : 'bg-white border-slate-200 hover:border-red-300'
         }
      `}
    >
      <h3 className="text-base font-black text-slate-800 leading-tight pr-2 mb-2">{bank.name}</h3>
      <p className="text-xs font-bold text-slate-500 mb-4 line-clamp-1">{bank.address}</p>
      
      <div className="flex items-center justify-between mt-auto">
         <div className="flex items-center gap-1 text-sm font-black text-slate-600">
            <FiNavigation className="w-4 h-4 text-sky-500" /> {bank.distance}
         </div>
         {bank.phone !== 'Phone not available' && (
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
               <FiPhoneCall /> {bank.phone}
            </div>
         )}
      </div>
    </motion.div>
  );
}

function MapPin({ bank, isActive, onClick }) {
   return (
      <motion.div 
         className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
         style={{ left: `${bank.coordinates.x}%`, top: `${bank.coordinates.y}%` }}
         onClick={onClick}
         whileHover={{ scale: 1.1 }}
         animate={isActive ? { scale: 1.3, zIndex: 20 } : { scale: 1, zIndex: 10 }}
      >
         <div className={`
            relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 transition-colors
            ${isActive ? 'bg-red-500 border-white text-white' : 'bg-slate-800 border-red-500 text-red-500 hover:bg-red-900'}
         `}>
            <FiDroplet className="w-4 h-4" />
         </div>
         
         {/* Tooltip on Hover */}
         <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-white text-slate-800 text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl border border-slate-100">
            {bank.name}
         </div>
      </motion.div>
   );
}
