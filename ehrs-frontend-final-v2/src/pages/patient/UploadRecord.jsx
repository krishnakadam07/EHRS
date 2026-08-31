import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiUploadCloud, FiFile, FiCheckCircle, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { recordService } from '../../services/recordService';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function UploadRecord() {
  const { currentUser } = useSelector(state => state.auth);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]);
  };

  const onSubmit = async (data) => {
    if (!selectedFile) return toast.error("Please select a file to upload.");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("dateIssued", data.dateIssued);
    formData.append("notes", data.notes || "");

    try {
      await recordService.uploadRecord(currentUser.email, formData);
      toast.success("Document uploaded securely to AWS S3!");
      reset();
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload document.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
      <div className="max-w-4xl mx-auto pb-12">
        <PageHeader title="Upload Medical Record" subtitle="Securely store your PDFs or images in your encrypted AWS S3 bucket." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-12 bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-200">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* INTERACTIVE DRAG & DROP ZONE */}
              <div
                  onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                  className={`relative border-2 border-dashed rounded-[24px] p-12 text-center transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : selectedFile ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 hover:bg-slate-50 hover:border-slate-400'}`}
              >
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" />
                <AnimatePresence mode="wait">
                  {selectedFile ? (
                      <motion.div key="file" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100 relative">
                          <FiFile className="w-8 h-8" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white"><FiCheckCircle className="w-3 h-3" /></div>
                        </div>
                        <p className="text-emerald-700 font-black text-lg">{selectedFile.name}</p>
                        <p className="text-emerald-600/70 font-bold text-sm mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button type="button" onClick={(e) => { e.preventDefault(); setSelectedFile(null); }} className="mt-4 px-4 py-2 bg-white rounded-lg text-slate-500 text-sm font-bold shadow-sm border border-slate-200 hover:text-red-500 relative z-20 transition-colors">Remove File</button>
                      </motion.div>
                  ) : (
                      <motion.div key="empty" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pointer-events-none">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-colors ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                          <FiUploadCloud className="w-10 h-10" />
                        </div>
                        <p className="text-xl font-black text-slate-800">Drag & Drop your record here</p>
                        <p className="text-slate-500 font-medium mt-2">Supports PDF, JPG, PNG up to 10MB.</p>
                        <div className="mt-6 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold shadow-sm">Browse Files</div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <hr className="border-slate-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Document Title" placeholder="e.g., Blood Test Results" error={errors.title?.message} {...register("title", { required: "Title is required" })} />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                  <div className="relative">
                    <select {...register("category")} className="w-full h-[52px] px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none">
                      <option value="Lab Report">Lab Report</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Scan/X-Ray">Scan/X-Ray</option>
                      <option value="Vaccination">Vaccination Record</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <Input label="Date Issued" type="date" error={errors.dateIssued?.message} {...register("dateIssued", { required: "Date is required" })} />

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Additional Notes (Optional)</label>
                  <textarea {...register("notes")} rows="3" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none" placeholder="Any additional context for doctors..."></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto px-12" isLoading={isUploading} icon={<FiUploadCloud />}>
                  {isUploading ? "Encrypting & Uploading..." : "Upload Document"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
  );
}