import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiHeart, FiCpu, FiAlertTriangle } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function AITriage() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [vitals, setVitals] = useState({ age: '', systolicBP: '', diastolicBP: '', heartRate: '', spo2: '', temperature: '' });

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsPredicting(true);
    setResult(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key is missing from your .env file!");

      const promptText = `
        You are an expert emergency triage AI. Analyze these patient vitals:
        - Age: ${vitals.age}
        - Temperature: ${vitals.temperature} °C
        - Blood Pressure: ${vitals.systolicBP} / ${vitals.diastolicBP}
        - Heart Rate: ${vitals.heartRate} BPM
        - Oxygen Saturation (SpO2): ${vitals.spo2} %
        
        Determine the urgency level.
        Return ONLY a valid JSON object matching this exact structure: 
        { 
          "score": "String (Exactly one of: 'Stable', 'Warning', 'Critical')", 
          "recommendation": "String (Brief clinical recommendation)", 
          "confidence": "String (e.g. 96%)" 
        }
        Do NOT include markdown formatting or backticks, just the raw JSON.
      `;

      const payload = { contents: [{ parts: [{ text: promptText }] }] };

      // OPTIMIZED SERVER HOPPING (No slow pre-check, just rapid firing until one works!)
      const preferredModels = ["gemini-flash-latest", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-2.5-flash"];

      let data = null;
      let success = false;
      let lastError = null;

      for (const model of preferredModels) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          data = await response.json();
          if (!data.error) {
            success = true;
            break;
          } else {
            lastError = data.error.message;
          }
        } catch (error) {
          lastError = error.message;
        }
      }

      if (!success) throw new Error(lastError || "All AI servers failed.");

      // Parse Google's AI Response
      let textResponse = data.candidates[0].content.parts[0].text;
      textResponse = textResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
      const jsonResult = JSON.parse(textResponse);

      // Map dynamic colors based on the AI's score decision!
      let color = "text-emerald-500"; let bgColor = "bg-emerald-500/10";
      if (jsonResult.score === "Critical") { color = "text-red-500"; bgColor = "bg-red-500/10"; }
      else if (jsonResult.score === "Warning") { color = "text-orange-500"; bgColor = "bg-orange-500/10"; }

      setResult({ ...jsonResult, color, bgColor });

    } catch (error) {
      console.error(error);
      alert("AI Triage Failed: " + error.message);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
        <PageHeader title="AI Triage Predictor" subtitle="Predict patient urgency based on critical vitals." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT PANEL: VITALS INPUT */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="h-full border-primary/20 shadow-lg shadow-primary/5">
              <Card.Header><h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><FiActivity className="text-primary" /> Input Vitals</h3></Card.Header>
              <Card.Body>
                <form onSubmit={handlePredict} className="flex flex-col gap-5">

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Age" type="number" onChange={(e) => setVitals({...vitals, age: e.target.value})} required />
                    <Input label="Temp (°C)" type="number" step="0.1" onChange={(e) => setVitals({...vitals, temperature: e.target.value})} required />
                  </div>

                  {/* ADDED HEART RATE & SPO2 INPUTS */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Heart Rate (BPM)" type="number" onChange={(e) => setVitals({...vitals, heartRate: e.target.value})} required />
                    <Input label="SpO2 (%)" type="number" onChange={(e) => setVitals({...vitals, spo2: e.target.value})} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
                    <div className="col-span-2 flex items-center gap-2 text-sm font-bold text-slate-600 mb-1"><FiHeart className="text-red-500" /> Blood Pressure</div>
                    <Input label="Systolic" type="number" onChange={(e) => setVitals({...vitals, systolicBP: e.target.value})} required />
                    <Input label="Diastolic" type="number" onChange={(e) => setVitals({...vitals, diastolicBP: e.target.value})} required />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth className="mt-4" disabled={isPredicting}>
                    {isPredicting ? <span className="flex items-center gap-2"><FiCpu className="animate-spin" /> Neural Network Processing...</span> : <span className="flex items-center gap-2"><FiCpu /> Predict Score</span>}
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </motion.div>

          {/* RIGHT PANEL: AI RESULTS */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="h-full bg-slate-900 rounded-[32px] p-8 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl">
              <AnimatePresence mode="wait">

                {/* IDLE */}
                {!isPredicting && !result && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center z-10">
                      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mb-6"><FiCpu className="w-10 h-10" /></div>
                      <h3 className="text-xl font-black text-white mb-2">Awaiting Input</h3>
                    </motion.div>
                )}

                {/* PREDICTING */}
                {isPredicting && (
                    <motion.div key="predicting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center z-10">
                      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                        <div className="absolute inset-2 rounded-full border-4 border-primary/40 animate-pulse" />
                        <FiActivity className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Analyzing Data...</h3>
                    </motion.div>
                )}

                {/* RESULT */}
                {result && !isPredicting && (
                    <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center z-10 w-full">

                      <div className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4`}>
                        Confidence: {result.confidence}
                      </div>

                      <div className={`w-40 h-40 rounded-full ${result.bgColor} flex items-center justify-center mb-6 ring-8 ring-slate-800`}>
                        <h1 className={`text-4xl font-black ${result.color}`}>{result.score}</h1>
                      </div>

                      <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700 max-w-sm w-full text-left flex gap-3 mt-2">
                        <FiAlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${result.color}`} />
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white">AI Recommendation</span>
                          <span className="text-sm text-slate-300 font-medium">{result.recommendation}</span>
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