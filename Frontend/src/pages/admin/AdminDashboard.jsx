import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiActivity, FiShield, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock Data for the Activity Graph
const data = [
  { name: 'Mon', scans: 400, prescriptions: 240, newUsers: 100 },
  { name: 'Tue', scans: 300, prescriptions: 139, newUsers: 120 },
  { name: 'Wed', scans: 550, prescriptions: 380, newUsers: 200 },
  { name: 'Thu', scans: 450, prescriptions: 290, newUsers: 150 },
  { name: 'Fri', scans: 600, prescriptions: 480, newUsers: 250 },
  { name: 'Sat', scans: 750, prescriptions: 380, newUsers: 300 },
  { name: 'Sun', scans: 650, prescriptions: 430, newUsers: 180 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <PageHeader 
           title="Master Control Panel" 
           subtitle="System overview, network activity, and security management."
         />
         <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All Systems Nominal
            </span>
         </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
        
        {/* Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Users" 
            value="14,281" 
            trend="+12%" 
            icon={<FiUsers />} 
            color="text-primary" 
            bgColor="bg-primary/10" 
          />
          <MetricCard 
            title="Active Doctors" 
            value="842" 
            trend="+3%" 
            icon={<FiActivity />} 
            color="text-emerald-500" 
            bgColor="bg-emerald-500/10" 
          />
          <MetricCard 
            title="Pending Verifications" 
            value="24" 
            trend="Action Req" 
            icon={<FiShield />} 
            color="text-orange-500" 
            bgColor="bg-orange-500/10" 
            urgent
          />
          <MetricCard 
            title="Daily QR Scans" 
            value="1,192" 
            trend="+18%" 
            icon={<FiFileText />} 
            color="text-sky-500" 
            bgColor="bg-sky-500/10" 
          />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Activity Graph (Spans 2 columns) */}
           <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
              <Card className="h-full">
                 <Card.Header>
                    <div className="flex justify-between items-center">
                       <h2 className="text-lg font-bold text-slate-800">Network Activity (7 Days)</h2>
                       <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.ADMIN.ANALYTICS)}>Full Analytics</Button>
                    </div>
                 </Card.Header>
                 <Card.Body>
                    <div className="h-[300px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                             <defs>
                               <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                               </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                             <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                             <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                             />
                             <Area type="monotone" dataKey="scans" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </Card.Body>
              </Card>
           </motion.div>

           {/* Quick Actions (1 column) */}
           <motion.div variants={itemVariants} className="flex flex-col gap-6">
              
              <div className="bg-slate-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <FiShield className="w-32 h-32" />
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center">
                          <span className="text-lg font-black">24</span>
                       </div>
                       <h3 className="text-xl font-black">Doctors Pending Verification</h3>
                    </div>
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                       You have unverified medical professionals requesting access to the network. Please review their credentials.
                    </p>
                    <Button variant="primary" fullWidth onClick={() => navigate(ROUTES.ADMIN.VERIFY_DOCTORS)}>
                       Review Applications
                    </Button>
                 </div>
              </div>

              <Card>
                 <Card.Header>
                    <h3 className="font-bold text-slate-800">Quick Tools</h3>
                 </Card.Header>
                 <Card.Body noPadding>
                    <div className="flex flex-col divide-y divide-slate-100">
                       <QuickActionItem icon={<FiUsers />} label="Manage Patient Directory" onClick={() => navigate(ROUTES.ADMIN.PATIENTS)} />
                       <QuickActionItem icon={<FiActivity />} label="Manage Doctor Roster" onClick={() => navigate(ROUTES.ADMIN.DOCTORS)} />
                       <QuickActionItem icon={<FiFileText />} label="System Audit Logs" onClick={() => navigate(ROUTES.ADMIN.LOGS)} />
                    </div>
                 </Card.Body>
              </Card>

           </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, color, bgColor, urgent }) {
  return (
    <div className={`bg-white rounded-3xl p-5 border shadow-sm flex flex-col gap-3 transition-all hover:shadow-md ${urgent ? 'border-orange-200' : 'border-slate-200'}`}>
      <div className="flex justify-between items-start">
        <span className="text-sm font-bold text-slate-500">{title}</span>
        <div className={`w-12 h-12 rounded-xl ${bgColor} ${color} flex items-center justify-center shrink-0`}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
      </div>
      <div className="flex items-end justify-between mt-1">
        <span className="text-3xl font-black text-slate-800">{value}</span>
        <span className={`text-xs font-black px-2 py-1 rounded-md ${urgent ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function QuickActionItem({ icon, label, onClick }) {
   return (
      <button onClick={onClick} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors w-full text-left group">
         <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            {React.cloneElement(icon, { className: 'w-5 h-5' })}
         </div>
         <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{label}</span>
      </button>
   );
}
