import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FiFileText, FiUploadCloud, FiMaximize, FiMapPin,
  FiActivity, FiHeart, FiDroplet, FiPhone, FiCalendar, FiClock
} from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Mock data for widgets
  const recentActivity = [
    { id: 1, action: 'Record Uploaded', detail: 'Blood Test Results', time: '2 hours ago', icon: <FiUploadCloud /> },
    { id: 2, action: 'QR Scanned', detail: 'By Dr. Sarah Jenkins', time: 'Yesterday', icon: <FiMaximize /> },
    { id: 3, action: 'Profile Updated', detail: 'Emergency Contact changed', time: '3 days ago', icon: <FiActivity /> },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Emily Chen', specialty: 'Cardiology', date: 'Oct 24, 2026', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Michael Roberts', specialty: 'General Practice', date: 'Nov 02, 2026', time: '02:30 PM' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
      <div className="flex flex-col gap-8 pb-12 relative">
        {/* Decorative ambient background for dashboard hero */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-100/50 to-transparent pointer-events-none -z-10 rounded-3xl mix-blend-multiply blur-3xl" />

        <div className="flex flex-col gap-1">
          <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black text-slate-800 tracking-tight"
          >
            {getGreeting()}, {currentUser?.name?.split(' ')[0] || 'Patient'}
          </motion.h1>
          <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-medium"
          >
            Here is an overview of your health records and recent activity.
          </motion.p>
        </div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
        >
          {/* Section 1: Quick Actions (Dock style) */}
          <motion.div variants={itemVariants} className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar snap-x">
            <QuickActionButton
                icon={<FiUploadCloud />}
                label="Upload Report"
                color="bg-sky-500"
                onClick={() => navigate(ROUTES.PATIENT.UPLOAD)}
            />
            <QuickActionButton
                icon={<FiMaximize />}
                label="View QR Code"
                color="bg-primary"
                onClick={() => navigate(ROUTES.PATIENT.QR)}
            />
            <QuickActionButton
                icon={<FiActivity />}
                label="Emergency Profile"
                color="bg-emerald-500"
                onClick={() => setIsEmergencyModalOpen(true)}
            />
            <QuickActionButton
                icon={<FiMapPin />}
                label="Find Blood Bank"
                color="bg-red-500"
                onClick={() => navigate(ROUTES.PATIENT.BLOOD_BANKS)}
            />
          </motion.div>

          {/* Section 2: Metric Cards Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard onClick={() => navigate(ROUTES.PATIENT.RECORDS)} title="Total Records" value="14" subtitle="+2 this month" icon={<FiFileText />} color="text-primary" bgColor="bg-primary/10" />
            <MetricCard onClick={() => navigate(ROUTES.PATIENT.HISTORY)} title="Emergency Scans" value="3" subtitle="Last scanned 2d ago" icon={<FiMaximize />} color="text-emerald-500" bgColor="bg-emerald-500/10" />
            <MetricCard onClick={() => navigate(ROUTES.PATIENT.NOTIFICATIONS)} title="Pending Reports" value="1" subtitle="Awaiting review" icon={<FiClock />} color="text-orange-500" bgColor="bg-orange-500/10" />
            <MetricCard onClick={() => navigate(ROUTES.PATIENT.HOSPITALS)} title="Nearby Hospitals" value="5" subtitle="Within 10km radius" icon={<FiMapPin />} color="text-sky-500" bgColor="bg-sky-500/10" />
          </motion.div>

          {/* Section 3: Bento Box Data Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Health Summary - Spans 8 cols */}
            <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col">
              <Card className="h-full shadow-soft border-slate-200">
                <Card.Header>
                  <div className="flex items-center gap-2">
                    <FiHeart className="text-red-500 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Health Summary</h2>
                  </div>
                </Card.Header>
                <Card.Body padding="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <motion.div whileHover={{ y: -5, backgroundColor: '#ffffff', borderColor: '#fee2e2' }} className="flex flex-col gap-1 p-5 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm transition-colors cursor-default">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Type</span>
                      <span className="text-3xl font-black text-red-600 flex items-center gap-2 mt-1">
                      <FiDroplet className="w-6 h-6" /> B+
                    </span>
                    </motion.div>
                    <motion.div whileHover={{ y: -5, backgroundColor: '#ffffff' }} className="flex flex-col gap-1 p-5 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm transition-colors cursor-default">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Height</span>
                      <span className="text-3xl font-black text-slate-800 mt-1">178<span className="text-sm text-slate-500 font-bold ml-1">cm</span></span>
                    </motion.div>
                    <motion.div whileHover={{ y: -5, backgroundColor: '#ffffff' }} className="flex flex-col gap-1 p-5 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm transition-colors cursor-default">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weight</span>
                      <span className="text-3xl font-black text-slate-800 mt-1">75<span className="text-sm text-slate-500 font-bold ml-1">kg</span></span>
                    </motion.div>
                    <motion.div whileHover={{ y: -5, backgroundColor: '#ffffff' }} className="flex flex-col gap-1 p-5 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm transition-colors cursor-default relative overflow-hidden">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider relative z-10">BMI</span>
                      <span className="text-3xl font-black text-slate-800 mt-1 relative z-10">23.7</span>
                      {/* BMI status indicator bar */}
                      <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500 w-[60%]" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-8 bg-slate-50 p-6 rounded-[24px] border border-slate-100">
                    <div className="flex-1">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Critical Allergies</h3>
                      <div className="flex flex-wrap gap-2">
                        <motion.div whileHover={{ scale: 1.05 }}><Badge variant="danger" soft>Peanuts</Badge></motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}><Badge variant="danger" soft>Penicillin</Badge></motion.div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Chronic Conditions</h3>
                      <div className="flex flex-wrap gap-2">
                        <motion.div whileHover={{ scale: 1.05 }}><Badge variant="warning" soft>Mild Asthma</Badge></motion.div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Recent Activity - Spans 4 cols */}
            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col">
              <Card className="h-full shadow-soft border-slate-200">
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Recent Activity</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.PATIENT.RECORDS)}>View All</Button>
                  </div>
                </Card.Header>
                <Card.Body noPadding>
                  <div className="flex flex-col divide-y divide-slate-100">
                    {recentActivity.map((activity, idx) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            whileHover={{ x: 5, backgroundColor: '#f8fafc' }}
                            className="flex items-start gap-4 p-5 cursor-pointer transition-colors"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-sm">
                            {activity.icon}
                          </div>
                          <div className="flex flex-col flex-1 justify-center min-h-[48px]">
                            <span className="text-sm font-black text-slate-800 leading-tight">{activity.action}</span>
                            <span className="text-xs font-bold text-slate-500 mt-0.5">{activity.detail}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap mt-1">{activity.time}</span>
                        </motion.div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Upcoming Appointments - Spans 6 cols */}
            <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col">
              <Card className="h-full shadow-soft border-slate-200 overflow-hidden">
                <Card.Header className="bg-primary/5">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-primary w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Upcoming Appointments</h2>
                  </div>
                </Card.Header>
                <Card.Body noPadding>
                  <div className="flex flex-col divide-y divide-slate-100">
                    {upcomingAppointments.map((apt, idx) => (
                        <motion.div
                            key={apt.id}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (idx * 0.1) }}
                            whileHover={{ backgroundColor: '#f8fafc' }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-black text-slate-400">
                              {apt.doctor.charAt(4)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base font-black text-slate-800">{apt.doctor}</span>
                              <span className="text-xs font-bold text-slate-500">{apt.specialty}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="primary" soft>Confirmed</Badge>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-slate-500 bg-white border border-slate-100 shadow-sm px-3 py-1.5 rounded-lg">
                              <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3 text-primary" /> {apt.date}</span>
                              <span className="flex items-center gap-1"><FiClock className="w-3 h-3 text-orange-500" /> {apt.time}</span>
                            </div>
                          </div>
                        </motion.div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Emergency Contacts - Spans 6 cols */}
            <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col">
              <Card className="h-full shadow-soft border-slate-200">
                <Card.Header>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-orange-500 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Emergency Contacts</h2>
                  </div>
                </Card.Header>
                <Card.Body padding="p-6">
                  <div className="flex flex-col gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-[20px] hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-lg">
                          J
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-black text-slate-800">Jane Doe</span>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Spouse</span>
                        </div>
                      </div>
                      <motion.a
                          whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
                          href="tel:+15550198"
                          className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-colors"
                      >
                        <FiPhone className="w-5 h-5" />
                      </motion.a>
                    </motion.div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

          </div>
        </motion.div>

        {/* Emergency Profile Modal */}
        <Modal
            isOpen={isEmergencyModalOpen}
            onClose={() => setIsEmergencyModalOpen(false)}
            title="Emergency Profile Overview"
            size="md"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-600">This is the critical information first responders will see when scanning your QR code.</p>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-red-100 pb-2">
                <span className="font-bold text-slate-700">Blood Type</span>
                <span className="text-xl font-black text-red-600">B+</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-red-100 pb-2">
                <span className="font-bold text-slate-700">Severe Allergies</span>
                <span className="text-sm text-slate-600">Peanuts, Penicillin</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-700">Emergency Contact</span>
                <span className="text-sm text-slate-600">Jane Doe (Spouse) - +1 555-0198</span>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="primary" onClick={() => setIsEmergencyModalOpen(false)}>Close Overview</Button>
            </div>
          </div>
        </Modal>
      </div>
  );
}

// Subcomponents for internal layout consistency

function QuickActionButton({ icon, label, color, onClick }) {
  return (
      <motion.button
          onClick={onClick}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-3 p-4 min-w-[120px] bg-white/90 backdrop-blur-md rounded-[20px] border border-slate-100 shadow-soft hover:shadow-premium hover:border-primary/30 transition-all snap-start group relative overflow-hidden"
      >
        <div className={`absolute -top-10 -right-10 w-24 h-24 ${color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
        <div className={`w-14 h-14 rounded-2xl ${color} bg-gradient-to-tr text-white flex items-center justify-center shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-300`}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
        <span className="text-xs font-black text-slate-700 text-center">{label}</span>
      </motion.button>
  );
}

function MetricCard({ title, value, subtitle, icon, color, bgColor, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
      <motion.div
          onClick={onClick}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          className={`bg-white/90 backdrop-blur-sm rounded-[20px] p-6 border border-slate-100 shadow-soft hover:shadow-premium transition-all flex flex-col gap-3 group ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div style={{ transform: "translateZ(20px)" }} className="flex justify-between items-start">
          <span className="text-sm font-black text-slate-500">{title}</span>
          <div className={`w-12 h-12 rounded-2xl ${bgColor} ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            {React.cloneElement(icon, { className: 'w-6 h-6' })}
          </div>
        </div>
        <div style={{ transform: "translateZ(30px)" }} className="flex flex-col">
          <span className="text-4xl font-black text-slate-800 tracking-tight">{value}</span>
          <span className="text-xs font-bold text-slate-400 mt-1">{subtitle}</span>
        </div>
      </motion.div>
  );
}
