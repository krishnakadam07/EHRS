import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiList, FiFilter, FiDownload, FiShare2, FiEye,
  FiFileText, FiActivity, FiImage, FiShield, FiScissors, FiUploadCloud
} from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import DataTable from '../../components/common/DataTable';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';

// --- MOCK DATA ---
const CATEGORIES = ['All', 'Prescriptions', 'Lab Reports', 'Scans', 'Vaccinations', 'Surgeries'];
const SORT_OPTIONS = ['Newest First', 'Oldest First', 'A-Z', 'Z-A'];

const MOCK_RECORDS = [
  { id: 'REC-001', title: 'Complete Blood Count', category: 'Lab Reports', date: '2026-10-15', doctor: 'Dr. Sarah Jenkins', hospital: 'City General', size: '2.4 MB', status: 'Verified', notes: 'All levels within normal ranges. Slight vitamin D deficiency noted.' },
  { id: 'REC-002', title: 'Chest X-Ray', category: 'Scans', date: '2026-09-22', doctor: 'Dr. Emily Chen', hospital: 'Metro Radiology', size: '15.8 MB', status: 'Verified', notes: 'Clear lungs. No abnormalities detected.' },
  { id: 'REC-003', title: 'Amoxicillin 500mg', category: 'Prescriptions', date: '2026-10-01', doctor: 'Dr. Michael Roberts', hospital: 'City General', size: '120 KB', status: 'Active', notes: 'Take 1 tablet every 8 hours for 7 days with food.' },
  { id: 'REC-004', title: 'COVID-19 Booster', category: 'Vaccinations', date: '2025-11-10', doctor: 'Nurse A. Smith', hospital: 'Westside Clinic', size: '450 KB', status: 'Verified', notes: 'Moderna Bivalent booster administered.' },
  { id: 'REC-005', title: 'Appendectomy Report', category: 'Surgeries', date: '2023-04-14', doctor: 'Dr. James Wilson', hospital: 'Memorial Hospital', size: '4.1 MB', status: 'Verified', notes: 'Routine laparoscopic appendectomy. Recovery without complications.' },
  { id: 'REC-006', title: 'Lipid Panel', category: 'Lab Reports', date: '2026-05-10', doctor: 'Dr. Sarah Jenkins', hospital: 'City General', size: '1.8 MB', status: 'Verified', notes: 'LDL elevated. Recommended dietary changes.' },
  { id: 'REC-007', title: 'MRI Brain', category: 'Scans', date: '2024-08-05', doctor: 'Dr. R. House', hospital: 'Princeton-Plainsboro', size: '124.5 MB', status: 'Verified', notes: 'No acute intracranial pathology.' },
  { id: 'REC-008', title: 'Lisinopril 10mg', category: 'Prescriptions', date: '2026-08-20', doctor: 'Dr. Sarah Jenkins', hospital: 'City General', size: '110 KB', status: 'Active', notes: 'Take 1 tablet daily for hypertension.' },
];

export default function MedicalRecords() {
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Derived Data (Filtering & Sorting)
  const filteredRecords = useMemo(() => {
    let result = [...MOCK_RECORDS];

    // 1. Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(rec => rec.category === activeCategory);
    }

    // 2. Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(rec =>
          rec.title.toLowerCase().includes(lowerQuery) ||
          rec.doctor.toLowerCase().includes(lowerQuery) ||
          rec.hospital.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'Newest First': return new Date(b.date) - new Date(a.date);
        case 'Oldest First': return new Date(a.date) - new Date(b.date);
        case 'A-Z': return a.title.localeCompare(b.title);
        case 'Z-A': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });

    return result;
  }, [searchQuery, activeCategory, sortOrder]);

  // Table Columns config
  const tableColumns = [
    { key: 'title', label: 'Document Name' },
    { key: 'category', label: 'Category', render: (val) => <CategoryBadge category={val} /> },
    { key: 'date', label: 'Date Issued' },
    { key: 'doctor', label: 'Issuer / Doctor' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'warning' : 'success'} soft>{val}</Badge> }
  ];

  return (
      <div className="flex flex-col gap-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PageHeader
              title="Medical Records"
              subtitle="View, download, and manage your complete medical history securely."
          />
          <Button
              variant="primary"
              icon={<FiUploadCloud />}
              onClick={() => navigate(ROUTES.PATIENT.UPLOAD)}
              className="shrink-0"
          >
            Upload Record
          </Button>
        </div>

        {/* Control Bar */}
        <Card className="bg-white/80 backdrop-blur-md sticky top-20 z-20 shadow-sm border-slate-200/60">
          <Card.Body padding="p-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">

              {/* Left: Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="w-full sm:w-72 shrink-0">
                  <SearchBar
                      placeholder="Search records, doctors..."
                      onSearch={setSearchQuery}
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 custom-scrollbar hide-scrollbar-on-mobile">
                  <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shrink-0"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>

                  <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shrink-0"
                  >
                    {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              {/* Right: View Toggles */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end lg:self-center">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    aria-label="Grid view"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    aria-label="Table view"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {filteredRecords.length === 0 ? (
              <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              >
                <EmptyState
                    title="No records found"
                    description={searchQuery || activeCategory !== 'All'
                        ? "We couldn't find any records matching your current filters. Try adjusting them."
                        : "You don't have any medical records uploaded yet."}
                    icon={<FiFileText />}
                    actionLabel={searchQuery || activeCategory !== 'All' ? "Clear Filters" : "Upload Your First Record"}
                    onAction={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                />
              </motion.div>
          ) : (
              <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
              >
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredRecords.map(record => (
                          <RecordCard
                              key={record.id}
                              record={record}
                              onClick={() => setSelectedRecord(record)}
                          />
                      ))}
                    </div>
                ) : (
                    <Card>
                      <DataTable
                          columns={tableColumns}
                          data={filteredRecords}
                          keyExtractor={(item) => item.id}
                          onRowClick={(record) => setSelectedRecord(record)}
                      />
                    </Card>
                )}
              </motion.div>
          )}
        </AnimatePresence>

        {/* Record Details Modal */}
        <Modal
            isOpen={!!selectedRecord}
            onClose={() => setSelectedRecord(null)}
            title="Record Details"
            size="lg"
        >
          {selectedRecord && (
              <div className="flex flex-col gap-6">
                {/* Modal Header */}
                <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <CategoryIcon category={selectedRecord.category} size="w-8 h-8" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h2 className="text-xl font-black text-slate-800 leading-tight mb-1">{selectedRecord.title}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-slate-500">{selectedRecord.id}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <CategoryBadge category={selectedRecord.category} />
                    </div>
                  </div>
                  <Badge variant={selectedRecord.status === 'Active' ? 'warning' : 'success'}>
                    {selectedRecord.status}
                  </Badge>
                </div>

                {/* Modal Body: Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date Issued</span>
                    <span className="text-sm font-bold text-slate-800">{selectedRecord.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Issuer</span>
                    <span className="text-sm font-bold text-slate-800">{selectedRecord.doctor}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Facility</span>
                    <span className="text-sm font-bold text-slate-800">{selectedRecord.hospital}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">File Size</span>
                    <span className="text-sm font-bold text-slate-800">{selectedRecord.size}</span>
                  </div>
                </div>

                {/* Modal Body: Notes */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Clinical Notes</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedRecord.notes}</p>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
                  <Button variant="outline" icon={<FiShare2 />}>Share</Button>
                  <Button variant="primary" icon={<FiDownload />}>Download PDF</Button>
                </div>
              </div>
          )}
        </Modal>
      </div>
  );
}

// --- SUBCOMPONENTS ---

function CategoryIcon({ category, size = "w-6 h-6" }) {
  switch (category) {
    case 'Lab Reports': return <FiActivity className={size} />;
    case 'Scans': return <FiImage className={size} />;
    case 'Prescriptions': return <FiFileText className={size} />;
    case 'Vaccinations': return <FiShield className={size} />;
    case 'Surgeries': return <FiScissors className={size} />;
    default: return <FiFileText className={size} />;
  }
}

function CategoryBadge({ category }) {
  let variant = 'info';
  switch (category) {
    case 'Lab Reports': variant = 'primary'; break;
    case 'Scans': variant = 'secondary'; break;
    case 'Prescriptions': variant = 'warning'; break;
    case 'Vaccinations': variant = 'success'; break;
    case 'Surgeries': variant = 'danger'; break;
  }
  return <Badge variant={variant} soft>{category}</Badge>;
}

function RecordCard({ record, onClick }) {
  return (
      <motion.div whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
        <Card
            className="group hover:border-primary/30 hover:shadow-premium cursor-pointer transition-all duration-300 h-full"
            onClick={onClick}
        >
          <Card.Body padding="p-5">
            <div className="flex flex-col h-full">
              {/* Top Row: Icon & Status */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-primary/30 group-hover:-translate-y-1">
                  <CategoryIcon category={record.category} />
                </div>
                <CategoryBadge category={record.category} />
              </div>

              {/* Title & Meta */}
              <h3 className="text-lg font-black text-slate-800 leading-tight mb-1 line-clamp-2">{record.title}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-4">{record.doctor}</p>

              {/* Spacer to push footer to bottom */}
              <div className="flex-grow"></div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400">{record.date}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                View Details <FiEye />
              </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
  );
}
