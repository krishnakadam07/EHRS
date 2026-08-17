import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
  LineChart, Line, ResponsiveContainer 
} from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';

// Mock Data
const userDemographics = [
  { name: 'Patients', value: 12400 },
  { name: 'Doctors', value: 842 },
  { name: 'Emergency Responders', value: 1039 },
];
const COLORS = ['#0ea5e9', '#10b981', '#f97316'];

const monthlyActivity = [
  { name: 'Jan', scans: 4000, prescriptions: 2400 },
  { name: 'Feb', scans: 3000, prescriptions: 1398 },
  { name: 'Mar', scans: 2000, prescriptions: 9800 },
  { name: 'Apr', scans: 2780, prescriptions: 3908 },
  { name: 'May', scans: 1890, prescriptions: 4800 },
  { name: 'Jun', scans: 2390, prescriptions: 3800 },
  { name: 'Jul', scans: 3490, prescriptions: 4300 },
];

const growthData = [
  { month: 'Jan', users: 4000 },
  { month: 'Feb', users: 5500 },
  { month: 'Mar', users: 7000 },
  { month: 'Apr', users: 8200 },
  { month: 'May', users: 10500 },
  { month: 'Jun', users: 12000 },
  { month: 'Jul', users: 14281 },
];

export default function Analytics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100">
          <p className="font-bold text-slate-800 mb-2">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader 
        title="Platform Analytics" 
        subtitle="Deep dive into system usage, demographics, and growth metrics."
      />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
        
        {/* Top Row: Line Chart (Growth) & Pie Chart (Demographics) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="h-full">
                 <Card.Header>
                    <h2 className="text-lg font-bold text-slate-800">Platform Growth (YTD)</h2>
                 </Card.Header>
                 <Card.Body>
                    <div className="h-[300px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                             <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                             <RechartsTooltip content={<CustomTooltip />} />
                             <Line type="monotone" dataKey="users" name="Total Users" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 6, fill: '#0ea5e9', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                          </LineChart>
                       </ResponsiveContainer>
                    </div>
                 </Card.Body>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="h-full">
                 <Card.Header>
                    <h2 className="text-lg font-bold text-slate-800">User Demographics</h2>
                 </Card.Header>
                 <Card.Body>
                    <div className="h-[300px] w-full flex items-center justify-center relative">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie
                               data={userDemographics}
                               cx="50%"
                               cy="50%"
                               innerRadius={60}
                               outerRadius={100}
                               paddingAngle={5}
                               dataKey="value"
                               stroke="none"
                             >
                               {userDemographics.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                               ))}
                             </Pie>
                             <RechartsTooltip content={<CustomTooltip />} />
                          </PieChart>
                       </ResponsiveContainer>
                       {/* Center Label */}
                       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total</span>
                          <span className="text-2xl font-black text-slate-800">14.2K</span>
                       </div>
                    </div>
                 </Card.Body>
              </Card>
           </motion.div>

        </div>

        {/* Bottom Row: Bar Chart (Activity) */}
        <motion.div variants={itemVariants}>
           <Card>
              <Card.Header>
                 <h2 className="text-lg font-bold text-slate-800">Monthly Platform Activity (Scans vs Prescriptions)</h2>
              </Card.Header>
              <Card.Body>
                 <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={monthlyActivity} margin={{ top: 20, right: 30, left: -20, bottom: 5 }} barSize={30}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                          <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 'bold' }} />
                          <Bar dataKey="scans" name="QR Scans" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="prescriptions" name="Prescriptions Issued" fill="#f97316" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </Card.Body>
           </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}
