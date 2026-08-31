import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiCpu, FiFileText, FiCheckCircle, FiAlertCircle, FiX, FiActivity, FiZap } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function AIAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
    }
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setResult(null);

    // Simulate Deep Learning processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        diagnosis: "Mild Iron Deficiency Anemia",
        summary: "Your blood report indicates slightly lower than normal hemoglobin levels and low ferritin. This suggests a mild iron deficiency.",
        recommendations: [
          "Increase intake of iron-rich foods (spinach, red meat, lentils).",
          "Consider a Vitamin C supplement to boost iron absorption.",
          "Consult with your primary care physician to discuss a potential iron supplement."
        ],
        confidence: "94.2%"
      });
    }, 3500);
  };

  return (
      <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-12">
        <PageHeader
            title="AI Lab Report Analyzer"
            subtitle="Upload your lab results to receive an AI-generated, easy-to-understand summary and diagnosis."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">

          {/* LEFT PANEL: UPLOAD */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 h-full flex flex-col relative overflow-hidden group">

              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><FiUploadCloud className="w-5 h-5" /></div>
                Document Upload
              </h3>

              <div
                  onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                  className={`flex-1 relative border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center p-8 transition-all duration-300 z-10 ${
                      isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' :
                          selectedFile ? 'border-emerald-300 bg-emerald-50/50' :
                              'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 cursor-pointer'
                  }`}
              >
                <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />

                <AnimatePresence mode="wait">
                  {selectedFile ? (
                      <motion.div key="file" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100 relative">
                          <FiFileText className="w-8 h-8" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white"><FiCheckCircle className="w-3 h-3" /></div>
                        </div>
                        <p className="text-emerald-700 font-black text-center px-4 truncate w-full max-w-[200px]">{selectedFile.name}</p>
                        <p className="text-emerald-600/70 font-bold text-sm mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button type="button" onClick={(e) => { e.preventDefault(); setSelectedFile(null); setResult(null); }} className="mt-4 px-4 py-2 bg-white rounded-lg text-slate-500 text-sm font-bold shadow-sm border border-slate-200 hover:text-red-500 hover:border-red-200 relative z-30 transition-colors flex items-center gap-1"><FiX /> Remove</button>
                      </motion.div>
                  ) : (
                      <motion.div key="empty" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center pointer-events-none">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                          <FiUploadCloud className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-black text-slate-800">Drag & Drop Report</span>
                        <span className="text-sm font-bold text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</span>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                  variant="primary" size="lg" onClick={handleAnalyze} disabled={!selectedFile || isAnalyzing}
                  className={`w-full mt-6 justify-center relative z-10 ${isAnalyzing ? 'bg-slate-800 border-slate-800 hover:bg-slate-900 shadow-xl shadow-slate-900/20' : 'shadow-lg shadow-blue-600/20'}`}
              >
                {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-2"><FiCpu className="animate-spin" /> Neural Network Processing...</span>
                ) : (
                    <span className="flex items-center justify-center gap-2"><FiZap className="text-yellow-300" /> Run AI Analysis</span>
                )}
              </Button>
            </div>
          </motion.div>

          {/* RIGHT PANEL: RESULTS */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }} className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden relative">

              <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between relative z-10">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><FiCpu className="w-5 h-5" /></div>
                  Diagnostic Insights
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
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center opacity-60">
                        <FiActivity className="w-20 h-20 text-slate-200 mb-6" />
                        <h3 className="text-xl font-black text-slate-800 mb-2">Ready for Analysis</h3>
                        <p className="text-slate-500 font-medium max-w-sm">Upload a medical report and our diagnostic model will extract key biomarkers instantly.</p>
                      </motion.div>
                  )}

                  {/* STATE: ANALYZING (SCANNER ANIMATION) */}
                  {isAnalyzing && (
                      <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-slate-900 z-20 overflow-hidden">
                        <motion.div animate={{ y: [-100, 100, -100] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute w-full h-1 bg-sky-400 shadow-[0_0_20px_10px_rgba(56,189,248,0.4)]" />
                        <div className="w-24 h-24 rounded-full border-4 border-slate-700 border-t-sky-400 animate-spin mb-8 flex items-center justify-center bg-slate-800">
                          <FiCpu className="w-10 h-10 text-sky-400" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-widest uppercase">Analyzing Data</h3>
                        <p className="text-sky-400/80 font-bold text-sm tracking-wider animate-pulse">Running diagnostic models...</p>
                      </motion.div>
                  )}

                  {/* STATE: RESULTS */}
                  {result && !isAnalyzing && (
                      <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 custom-scrollbar">

                        <div className="flex flex-col gap-2">
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg w-max border border-emerald-200">Primary Finding</span>
                          <h2 className="text-3xl font-black text-slate-800 leading-tight">{result.diagnosis}</h2>
                        </div>

                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiFileText /> Clinical Summary</span>
                          <p className="text-base text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-inner">
                            {result.summary}
                          </p>
                        </div>

                        <div className="flex flex-col gap-4">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiCheckCircle /> Actionable Recommendations</span>
                          <div className="flex flex-col gap-3">
                            {result.recommendations.map((rec, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group">
                                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">{idx + 1}</div>
                                  <span className="text-slate-700 font-bold mt-1 leading-snug">{rec}</span>
                                </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100">
                          <div className="flex items-start gap-3 text-orange-600 bg-orange-50/50 border border-orange-100 p-4 rounded-xl text-xs font-bold leading-relaxed">
                            <FiAlertCircle className="w-5 h-5 shrink-0" />
                            <p>This is an AI-generated analysis intended for informational purposes only. Do not use this as a substitute for professional medical advice, diagnosis, or treatment.</p>
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