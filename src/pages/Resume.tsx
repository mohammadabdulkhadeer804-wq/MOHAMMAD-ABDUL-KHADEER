import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Target, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { resumeService } from '@/src/services/gemini';

export function Resume() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
      });
      reader.readAsDataURL(file);
      const base64 = await base64Promise;

      const parseResponse = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64 })
      });
      
      const { text } = await parseResponse.json();
      const analysis = await resumeService.analyzeResume(text, jd);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
        <div className="flex justify-between items-end border-b border-slate-200 pb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 serif">Analysis Results</h1>
            <p className="text-slate-500 mt-2 font-medium">Resume Forensic Report • Case ID: {Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          </div>
          <button 
            onClick={() => { setResult(null); setFile(null); setJd(''); }}
            className="px-6 py-2.5 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-full hover:bg-slate-100 transition-colors"
          >
            New Analysis
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 serif mb-8 flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Target className="text-green-600 h-5 w-5" />
                </div>
                Foundational Strengths
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {result.strengths.map((s: string, i: number) => (
                  <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-green-200 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 serif mb-8 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <AlertCircle className="text-indigo-600 h-5 w-5" />
                </div>
                Strategic Suggestions
              </h3>
              <div className="space-y-4">
                {result.suggestions.map((s: string, i: number) => (
                  <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                     <ArrowRight className="h-4 w-4 text-slate-300 mt-1 shrink-0 group-hover:text-indigo-500 transition-colors" />
                     <p className="text-slate-600 text-sm leading-relaxed serif italic">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl shadow-slate-900/10 text-center relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">ATS Compatibility</p>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={452.4} strokeDashoffset={452.4 - (452.4 * (result.atsScore || result.score)) / 100} strokeLinecap="round" className="text-indigo-500" />
                  </svg>
                  <span className="absolute text-5xl font-bold text-white tracking-tighter">{(result.atsScore || result.score)}<span className="text-xl">%</span></span>
                </div>
                <p className="mt-8 text-sm text-slate-400 leading-relaxed serif italic border-t border-slate-800 pt-6">
                  {result.score > 80 ? "Optimized for modern enterprise parsing engines." : "Structural changes required for baseline visibility."}
                </p>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileText size={16} className="text-slate-400" />
                Contextual Gaps
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.weaknesses.map((w: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-full">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <div className="h-16 w-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
           <FileText className="text-indigo-600 h-8 w-8" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 serif">Resume Matrix</h1>
        <p className="text-slate-500 max-w-xl mx-auto serif text-lg leading-relaxed">
          Upload your document to evaluate matching patterns, ATS visibility, and strategic impact via AI forensics.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Job Description</label>
          <textarea 
            placeholder="Paste description for contextual matching..." 
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="w-full h-80 bg-white border border-slate-200 rounded-3xl p-8 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all font-sans text-sm resize-none shadow-inner"
          />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Profile</label>
            <div className={cn(
              "h-48 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all group relative overflow-hidden",
              file ? "border-indigo-600 bg-indigo-50/50" : "border-slate-200 bg-white hover:border-indigo-200"
            )}>
              {file ? (
                <>
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
                    <CheckCircle2 className="text-white" />
                  </div>
                  <div className="text-center px-6">
                    <p className="text-slate-900 font-bold text-xs truncate max-w-[150px]">{file.name}</p>
                    <button onClick={() => setFile(null)} className="text-[10px] text-slate-400 hover:text-red-500 uppercase font-bold tracking-widest mt-2">Replace File</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 font-bold text-xs">Drop or <span className="text-indigo-600 underline">browse</span></p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mt-1 tracking-widest">PDF • MAX 5MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          <button 
            onClick={analyze}
            disabled={!file || loading}
            className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
              <>
                <BarChart3 className="w-5 h-5" />
                Run Analysis Scan
              </>
            )}
          </button>
          
          {error && <div className="p-4 bg-red-50 border border-red-100 rounded-2xl"><p className="text-red-500 text-[10px] text-center font-bold uppercase tracking-widest leading-relaxed">{error}</p></div>}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Target, title: 'Context Indexing', desc: 'Symmetric evaluation of your professional trajectory against jd specifications.' },
            { icon: BarChart3, title: 'Parsing Simulation', desc: 'Reverse-engineered ATS behavior to predict high-volume application success.' },
            { icon: ChevronRight, title: 'Strategic Edits', desc: 'Hyper-specific modifications for experience blocks to amplify perceived impact.' },
          ].map((feat, i) => (
            <div key={i} className="space-y-4">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center">
                <feat.icon className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-slate-900 text-sm font-bold uppercase tracking-tight mb-2">{feat.title}</h4>
                <p className="text-slate-500 text-xs serif italic leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
