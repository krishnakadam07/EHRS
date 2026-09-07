import React, { useState } from 'react';
import {
  FiActivity, FiHeart, FiThermometer, FiWind,
  FiCpu, FiAlertTriangle, FiCheckCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { doctorService } from '../../services/doctorService';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

// Reusable Interactive Input Component
const Input = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative flex items-center group">
        {icon && <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300">{icon}</div>}
        <input
            className={`w-full bg-slate-50 border border-slate-200 rounded-2xl h-14 font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all ${icon ? 'pl-11 pr-4' : 'px-4'}`}
            {...props}
        />
      </div>
    </div>
);

export default function AITriage() {
  const [vitals, setVitals] = useState({
    age: '', temperature: '', systolicBP: '', diastolicBP: '', heartRate: '', spo2: ''
  });
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsPredicting(true);
    setResult(null);

    try {
      // 🌟 Clean Service Call via Spring AI
      const jsonResult = await doctorService.analyzeTriageVitals(vitals);

      let color = "text-emerald-500", bgColor = "bg-emerald-500/10", border = "border-emerald-500/30";

      if (jsonResult.score === "Critical") {
        color = "text-red-500"; bgColor = "bg-red-500/10"; border = "border-red-500/30";
      }
      else if (jsonResult.score === "Warning") {
        color = "text-orange-500"; bgColor = "bg-orange-500/10"; border = "border-orange-500/30";
      }

      setResult({ ...jsonResult, color, bgColor, border });

    } catch (error) {
      alert("AI Analysis Failed. Please ensure your backend is running. Details: " + (error.message || JSON.stringify(error)));
    } finally {
      setIsPredicting(false);
    }
  };

  return (
      <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-16 px-6 pt-4 font-sans">
        <PageHeader title="Gemini Triage AI" subtitle="Neural network inference for emergency vital analysis." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* VITALS HUD FORM */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><FiActivity className="w-6 h-6"/></div>
                <h3 className="text-2xl font-black text-slate-800">Biometric Input</h3>
              </div>

              <form onSubmit={handlePredict} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Patient Age" type="number" onChange={(e) => setVitals({...vitals, age: e.target.value})} required />
                  <Input label="Temp (°C)" type="number" step="0.1" icon={<FiThermometer/>} onChange={(e) => setVitals({...vitals, temperature: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Heart Rate (BPM)" type="number" icon={<FiHeart/>} onChange={(e) => setVitals({...vitals, heartRate: e.target.value})} required />
                  <Input label="SpO2 (%)" type="number" icon={<FiWind/>} onChange={(e) => setVitals({...vitals, spo2: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="col-span-2 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Blood Pressure</div>
                  <Input label="Systolic" type="number" onChange={(e) => setVitals({...vitals, systolicBP: e.target.value})} required />
                  <Input label="Diastolic" type="number" onChange={(e) => setVitals({...vitals, diastolicBP: e.target.value})} required />
                </div>
                <Button type="submit" variant="primary" size="lg" className="mt-4 py-5 shadow-xl shadow-primary/30 flex items-center justify-center gap-3 text-lg transition-transform active:scale-95" disabled={isPredicting}>
                  {isPredicting ? <span className="flex items-center gap-2"><FiCpu className="animate-spin" /> Compiling Tensor Graph...</span> : <span className="flex items-center gap-2"><FiCpu /> Initialize Neural Triage</span>}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* NEURAL NETWORK TERMINAL */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="h-full bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl border border-slate-700 w-full min-h-[500px]">

              {/* Matrix Background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiLz48L3N2Zz4=')] opacity-50" />

              <AnimatePresence mode="wait">
                {/* IDLE */}
                {!isPredicting && !result && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center z-10">
                      <div className="w-24 h-24 rounded-[2rem] bg-slate-800/80 backdrop-blur border border-slate-700 flex items-center justify-center text-slate-500 mb-6 shadow-inner"><FiCpu className="w-10 h-10" /></div>
                      <h3 className="text-2xl font-black text-white mb-2">Awaiting Telemetry</h3>
                      <p className="text-slate-400 font-medium">Input vitals to generate a triage probability score.</p>
                    </motion.div>
                )}

                {/* PREDICTING MATRIX ANIMATION */}
                {isPredicting && (
                    <motion.div key="predicting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center z-10">
                      <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <div className="absolute inset-4 rounded-full border-4 border-sky-400 border-b-transparent animate-spin-slow reverse" />
                        <FiActivity className="w-12 h-12 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300 mb-2 tracking-tight">Synthesizing Data...</h3>
                      <p className="text-slate-400 font-mono text-sm opacity-70">Running deep learning models</p>
                    </motion.div>
                )}

                {/* RESULT HUD */}
                {result && !isPredicting && (
                    <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center z-10 w-full relative">
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none ${result.bgColor} transition-colors duration-1000`} />

                      <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-slate-300 mb-8 z-10 shadow-lg">
                        <FiCheckCircle className="text-primary"/> Model Confidence: {result.confidence}
                      </div>

                      <div className={`w-48 h-48 rounded-full ${result.bgColor} border-4 ${result.border} flex items-center justify-center mb-10 ring-[12px] ring-slate-900/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 backdrop-blur-md transition-colors duration-1000`}>
                        <h1 className={`text-5xl font-black tracking-tighter ${result.color} drop-shadow-md`}>{result.score}</h1>
                      </div>

                      <div className="bg-black/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 w-full text-left flex gap-5 shadow-xl z-10">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${result.bgColor} ${result.color}`}>
                          <FiAlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">AI Recommendation</span>
                          <span className="text-lg text-white font-medium leading-snug">{result.recommendation}</span>
                        </div>
                      </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
  );
}