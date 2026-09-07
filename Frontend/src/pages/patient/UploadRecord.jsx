import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUploadCloud, FiFileText, FiImage, FiX, FiCheckCircle,
  FiAlertCircle, FiArrowLeft
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ROUTES } from '../../routes/routeConstants';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const CATEGORIES = ['Prescriptions', 'Lab Reports', 'Scans', 'Vaccinations', 'Surgeries'];

export default function UploadRecord() {
  const navigate = useNavigate();

  // File State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Form State
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      dateIssued: new Date().toISOString().split('T')[0], // Default to today
      notes: ''
    }
  });

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (filePreview && !filePreview.startsWith('data:')) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  // --- Drag and Drop Handlers ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Validate type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Only PDF, JPG, and PNG are supported.');
      return;
    }

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File exceeds 10MB limit.');
      return;
    }

    setSelectedFile(file);

    // Create preview
    if (file.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview('PDF_ICON');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  // --- Submit Handler ---
  const onSubmit = async (data) => {
    if (!selectedFile) {
      toast.error('Please select a document to upload.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const duration = 2000; // 2 seconds mock upload
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      setUploadProgress(Math.min((stepCount / steps) * 100, 100));

      if (stepCount >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setIsSuccess(true);
        }, 300); // slight delay after hitting 100%
      }
    }, intervalTime);
  };

  const resetForm = () => {
    reset();
    removeFile();
    setUploadProgress(0);
    setIsSuccess(false);
  };

  // --- Render ---

  if (isSuccess) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"
          >
            <FiCheckCircle className="w-12 h-12" />
          </motion.div>
          <motion.h2
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-3xl font-black text-slate-800 mb-2"
          >
            Upload Successful!
          </motion.h2>
          <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-slate-500 font-medium mb-8 max-w-md"
          >
            Your medical record has been securely encrypted and added to your vault. It is now accessible in your history.
          </motion.p>
          <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="outline" onClick={resetForm}>
              Upload Another Document
            </Button>
            <Button variant="primary" onClick={() => navigate(ROUTES.PATIENT.RECORDS)}>
              Go to Medical Records
            </Button>
          </motion.div>
        </div>
    );
  }

  return (
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
        <div className="flex items-center gap-4">
          <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Go back"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <PageHeader
              title="Upload Medical Record"
              subtitle="Securely add new documents to your personal health vault."
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Column: Drag & Drop Zone */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">1. Select Document</h3>

            <AnimatePresence mode="wait">
              {!selectedFile ? (
                  <motion.div
                      key="dropzone"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                  >
                    <motion.div
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                    w-full h-80 rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 ease-in-out cursor-pointer group shadow-soft
                    ${dragActive
                            ? 'border-primary bg-primary/10 scale-100'
                            : 'border-slate-300 bg-white hover:border-primary/50 hover:bg-slate-50 hover:shadow-premium'
                        }
                    ${errors.file ? 'border-danger bg-danger/5' : ''}
                  `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept=".pdf, image/jpeg, image/png, image/jpg"
                          onChange={handleChange}
                      />

                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-200 ${dragActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                        <FiUploadCloud className="w-8 h-8" />
                      </div>

                      <h4 className="text-lg font-bold text-slate-800 mb-1">
                        Click or drag file here
                      </h4>
                      <p className="text-sm font-medium text-slate-400 max-w-xs">
                        Upload medical scans, lab results, or prescriptions.
                      </p>

                      <div className="flex gap-2 mt-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">PDF</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">JPG</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">PNG</span>
                      </div>
                    </motion.div>
                  </motion.div>
              ) : (
                  <motion.div
                      key="preview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    {/* Preview Image or Icon */}
                    <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                      {filePreview === 'PDF_ICON' ? (
                          <FiFileText className="w-20 h-20 text-slate-300" />
                      ) : (
                          <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                      )}

                      {/* Remove Overlay */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile();
                            }}
                            className="w-12 h-12 rounded-full bg-danger text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none"
                        >
                          <FiX className="w-6 h-6" />
                        </button>
                      </div>
                    </div>

                    {/* File Details */}
                    <div className="p-4 border-t border-slate-100 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {filePreview === 'PDF_ICON' ? <FiFileText className="w-5 h-5" /> : <FiImage className="w-5 h-5" />}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-bold text-slate-800 truncate">{selectedFile.name}</span>
                        <span className="text-xs font-semibold text-slate-400">{formatBytes(selectedFile.size)}</span>
                      </div>
                      <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 text-slate-400 hover:text-danger rounded-lg transition-colors focus:outline-none"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Upload Progress Bar (Visible only when uploading) */}
                    <AnimatePresence>
                      {isUploading && (
                          <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              className="bg-slate-50 border-t border-slate-100 p-4"
                          >
                            <div className="flex justify-between text-xs font-bold mb-2">
                              <span className="text-slate-600">Encrypting & Uploading...</span>
                              <span className="text-primary">{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                              <motion.div
                                  className="h-full bg-primary"
                                  initial={{ width: '0%' }}
                                  animate={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Metadata Form */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">2. Document Details</h3>

            <Card className="shadow-sm">
              <Card.Body padding="p-6">
                <div className="flex flex-col gap-5">
                  <Input
                      label="Document Title"
                      placeholder="e.g., Annual Blood Test Results"
                      disabled={isUploading}
                      error={errors.title?.message}
                      {...register('title', { required: 'Document title is required' })}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 text-xs font-black uppercase tracking-wider">Category</label>
                    <select
                        disabled={isUploading}
                        className={`w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-colors font-medium
                      ${errors.category ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-slate-300 focus:border-primary focus:ring-primary/10 focus:ring-4'}
                    `}
                        {...register('category', { required: 'Please select a category' })}
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    {errors.category && <span className="text-danger text-xs font-semibold">{errors.category.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 text-xs font-black uppercase tracking-wider">Date Issued</label>
                    <input
                        type="date"
                        disabled={isUploading}
                        className={`w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-colors font-medium
                      ${errors.dateIssued ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-slate-300 focus:border-primary focus:ring-primary/10 focus:ring-4'}
                    `}
                        {...register('dateIssued', { required: 'Date issued is required' })}
                    />
                    {errors.dateIssued && <span className="text-danger text-xs font-semibold">{errors.dateIssued.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-700 text-xs font-black uppercase tracking-wider">Clinical Notes</label>
                      <span className="text-[10px] font-bold text-slate-400">Optional</span>
                    </div>
                    <textarea
                        rows="3"
                        disabled={isUploading}
                        placeholder="Add any relevant context for your doctor..."
                        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none transition-colors font-medium focus:border-primary focus:ring-primary/10 focus:ring-4 resize-none custom-scrollbar"
                        {...register('notes')}
                    ></textarea>
                  </div>

                  <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-3 mt-2">
                    <FiAlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-sky-700 font-medium leading-relaxed">
                      By uploading this document, you confirm that it belongs to you and you consent to it being encrypted and stored within your EHRS profile for medical access.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                className="mt-2 shadow-xl shadow-primary/20"
                isLoading={isUploading}
                disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Encrypting & Uploading...' : 'Securely Upload Record'}
            </Button>
          </div>
        </form>
      </div>
  );
}
