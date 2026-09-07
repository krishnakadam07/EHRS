import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiActivity, FiCpu, FiAlertCircle, FiImage, FiZap } from 'react-icons/fi';
import { MdRestaurantMenu, MdDirectionsRun } from 'react-icons/md';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import { patientService } from '../../services/patientService';

export default function AIAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // 🌟 FIX: Stop users from selecting PDFs!
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        alert("🚨 AI Vision requires an Image file! Please take a screenshot of your PDF and upload a .png or .jpg instead.");
        return;
      }

      setSelectedFile(file);
      setResult(null);
    }
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert("🚨 AI Vision requires an Image file! Please upload a .png or .jpg instead.");
        return;
      }
      setSelectedFile(file);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject(new Error("Failed to read the file."));
      });

      // Secure Call via Spring AI backend
      const parsedData = await patientService.analyzeMedicalReport(base64Image, selectedFile.type);
      setResult(parsedData);

    } catch (error) {
      console.error("Analysis Failed:", error);
      alert("Error: Please make sure your Spring Boot backend is running and you updated AiAnalysisController.java!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
      <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col pb-6">
        <PageHeader title="Ai Analysis" subtitle="Upload medical records for holistic dietary and physical insights." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 flex-1 min-h-0">

          {/* UPLOAD PANEL */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200 flex-1 flex flex-col">

              <div
                  onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                  className={`flex-1 relative border-2 border-dashed rounded-[24px] p-8 text-center transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                  ${isDragging ? 'border-sky-500 bg-sky-50/50 scale-[1.02]' : selectedFile ? 'border-sky-200 bg-sky-50/30' : 'border-slate-300 hover:bg-slate-50 hover:border-slate-400'}`}
              >
                {/* 🌟 FIX: Strict accept attribute */}
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" />

                <AnimatePresence mode="wait">
                  {selectedFile ? (
                      <motion.div key="image" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center w-full h-full justify-center">
                        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-md border-4 border-white">
                          <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm truncate">{selectedFile.name}</span>
                          </div>
                        </div>
                        <button type="button" onClick={(e) => { e.preventDefault(); setSelectedFile(null); setResult(null); }} className="mt-6 px-6 py-2.5 bg-white rounded-xl text-slate-500 text-sm font-bold shadow-sm border border-slate-200 hover:text-red-500 hover:border-red-200 relative z-20 transition-all">
                          Remove Image
                        </button>
                      </motion.div>
                  ) : (
                      <motion.div key="empty" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pointer-events-none">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-colors ${isDragging ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
                          <FiImage className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Select Image</h3>
                        <p className="text-slate-500 font-medium px-4">Upload a clear photo or screenshot of your lab results (.png or .jpg).</p>
                        <div className="mt-8 px-8 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold shadow-sm">
                          Browse Gallery
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button onClick={analyzeImage} disabled={!selectedFile || isAnalyzing} variant="primary" size="lg" className="w-full mt-6 h-14 text-lg">
                {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-3">
                      <FiCpu className="animate-spin text-xl text-sky-200" /> Processing...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2"><FiZap className="text-yellow-300" /> Run AI Triage</span>
                )}
              </Button>
            </div>
          </motion.div>

          {/* RESULTS PANEL */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden relative">

              <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between relative z-10">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><FiCpu className="w-5 h-5" /></div>
                  Holistic Recovery Protocol
                </h3>
                {result && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence Score</span>
                      <span className="text-lg font-black text-purple-600">{result.confidence}</span>
                    </div>
                )}
              </div>

              <div className="flex-1 relative bg-white">
                <AnimatePresence mode="wait">

                  {/* STATE: EMPTY */}
                  {!isAnalyzing && !result && (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center opacity-60">
                        <FiActivity className="w-20 h-20 text-slate-200 mb-6" />
                        <h3 className="text-xl font-black text-slate-800 mb-2">Ready for Analysis</h3>
                        <p className="text-slate-500 font-medium max-w-sm">Upload a medical report image and our model will extract key biomarkers instantly.</p>
                      </motion.div>
                  )}

                  {/* STATE: ANALYZING */}
                  {isAnalyzing && (
                      <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-slate-900 z-20">
                        <div className="w-24 h-24 rounded-full border-4 border-slate-700 border-t-sky-400 animate-spin mb-8 flex items-center justify-center bg-slate-800">
                          <FiCpu className="w-10 h-10 text-sky-400" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-widest uppercase">Analyzing Data</h3>
                        <p className="text-sky-400/80 font-bold text-sm tracking-wider animate-pulse">Running Gemini Vision diagnostics...</p>
                      </motion.div>
                  )}

                  {/* STATE: RESULTS */}
                  {result && !isAnalyzing && (
                      <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 custom-scrollbar">

                        <div className="flex flex-col gap-2">
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg w-max">Primary Finding</span>
                          <h2 className="text-3xl font-black text-slate-800 leading-tight">{result.diagnosis}</h2>
                        </div>

                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiFileText /> Clinical Summary</span>
                          <p className="text-base text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-inner">
                            {result.summary}
                          </p>
                        </div>

                        {/* DIET PLAN */}
                        <div className="flex flex-col gap-4">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MdRestaurantMenu className="text-lg text-emerald-500" /> Recommended Dietary Protocol</span>
                          <div className="flex flex-col gap-3">
                            {result.dietPlan && result.dietPlan.map((rec, idx) => (
                                <motion.div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black shrink-0">{idx + 1}</div>
                                  <span className="text-slate-700 font-bold mt-1 leading-snug">{rec}</span>
                                </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* PHYSICAL PLAN */}
                        <div className="flex flex-col gap-4">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MdDirectionsRun className="text-lg text-orange-500" /> Recommended Physical Conditioning</span>
                          <div className="flex flex-col gap-3">
                            {result.physicalPlan && result.physicalPlan.map((rec, idx) => (
                                <motion.div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black shrink-0">{idx + 1}</div>
                                  <span className="text-slate-700 font-bold mt-1 leading-snug">{rec}</span>
                                </motion.div>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  );
}