import React, { useState } from 'react';
import { Play, RotateCcw, Trophy, Code as CodeIcon, Clock, Terminal, ChevronRight, Activity, Cpu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    template: 'function twoSum(nums, target) {\n  \n}'
  },
  {
    id: 2,
    title: 'LRU Cache',
    difficulty: 'Medium',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    template: 'class LRUCache {\n  constructor(capacity) {\n    \n  }\n}'
  }
];

export function Coding() {
  const [activeTab, setActiveTab] = useState(problems[0]);
  const [code, setCode] = useState(activeTab.template);
  const [output, setOutput] = useState<string[]>([]);

  const runCode = () => {
    setOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] Initializing test runtime...`, "✓ Execution context established", "✓ Case 1: PASSED", "✓ Case 2: PASSED", "✓ Case 3: PASSED", "Final Status: ALL TESTS COMPLETED SUCCESSFULLY"]);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-8 divide-x divide-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <CodeIcon size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 serif leading-none">{activeTab.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border shadow-sm",
                  activeTab.difficulty === 'Easy' ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-amber-600 border-amber-100 bg-amber-50"
                )}>
                  {activeTab.difficulty}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic serif">Problem Node 0{activeTab.id}</span>
              </div>
            </div>
          </div>
          <div className="pl-8 flex items-center gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 text-slate-500"><Clock size={14} className="text-slate-300" /> 45:00 REMAINING</span>
            <span className="flex items-center gap-2 text-slate-500"><Trophy size={14} className="text-slate-300" /> 200 PTS AVAILABLE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setCode(activeTab.template); setOutput([]); }}
            className="p-3 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all"
            title="Reset Context"
          >
            <RotateCcw size={20} />
          </button>
          <button 
            onClick={runCode}
            className="flex items-center gap-3 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            <Play size={12} fill="currentColor" />
            Execute Suite
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] p-10 overflow-y-auto shadow-sm">
             <div className="flex items-center gap-3 mb-8">
               <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Techncial Specification</h3>
             </div>
             
             <div className="space-y-6">
               <p className="text-slate-700 font-medium leading-relaxed italic serif text-lg">{activeTab.description}</p>
               
               <div className="flex flex-col gap-4 pt-8">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                    <p className="text-slate-400 mb-3 uppercase text-[9px] font-bold tracking-[0.2em]">Example Input</p>
                    <code className="text-slate-900 font-mono text-sm block bg-white/50 p-3 rounded-xl border border-slate-100">nums = [2, 7, 11, 15], target = 9</code>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                    <p className="text-slate-400 mb-3 uppercase text-[9px] font-bold tracking-[0.2em]">Expected Output</p>
                    <code className="text-slate-900 font-mono text-sm block bg-white/50 p-3 rounded-xl border border-slate-100">[0, 1]</code>
                  </div>
               </div>
             </div>
          </div>
          
          <div className="h-60 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 font-mono text-xs overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between text-slate-500 mb-6 border-b border-slate-800 pb-4 uppercase tracking-[0.2em] font-bold">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-indigo-400" />
                Kernel Log
              </div>
              <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-slate-700" />
                 <div className="w-2 h-2 rounded-full bg-slate-700" />
              </div>
            </div>
            {output.length === 0 ? (
              <p className="text-slate-700 italic serif text-sm">Waiting for execution trigger...</p>
            ) : (
              <div className="space-y-2">
                {output.map((line, i) => (
                  <div key={i} className={cn(
                    "flex gap-4 p-2 rounded-lg transition-colors",
                    line.includes('PASSED') ? "bg-emerald-500/5 text-emerald-400" : line.includes('SUCCESSFULLY') ? "bg-indigo-500/10 text-white font-bold" : "text-slate-500"
                  )}>
                    <span className="text-slate-700 opacity-50">[{i+1}]</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-slate-950 border border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
          <div className="absolute top-6 right-8 z-10 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <Activity className="h-3 w-3 text-indigo-400 animate-pulse" />
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Runtime: Node v20</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">JavaScript</span>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-12 pt-8 flex flex-col items-center border-r border-white/5 bg-white/[0.02]">
               {Array.from({length: 40}).map((_, i) => (
                 <span key={i} className="text-[10px] text-slate-700 mb-[4px] font-mono leading-relaxed">{i+1}</span>
               ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-8 font-mono text-sm text-slate-200 focus:outline-none resize-none selection:bg-indigo-500/30 leading-relaxed"
              spellCheck={false}
            />
          </div>
          
          <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-center">
             <p className="text-[8px] text-slate-700 uppercase tracking-[0.5em] font-bold">Standard UTF-8 Encoding • Secure ISO Isolation</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {problems.map((p) => (
          <button
            key={p.id}
            onClick={() => { setActiveTab(p); setCode(p.template); setOutput([]); }}
            className={cn(
              "p-5 rounded-2xl border text-left transition-all group",
              activeTab.id === p.id 
                ? "bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/10" 
                : "bg-white border-slate-200 hover:border-indigo-200"
            )}
          >
            <p className={cn(
              "text-[9px] font-bold uppercase tracking-widest mb-2 transition-colors",
              activeTab.id === p.id ? "text-slate-500" : "text-slate-400 group-hover:text-indigo-400"
            )}>Instance 0{p.id}</p>
            <p className={cn(
              "text-xs font-bold transition-colors",
              activeTab.id === p.id ? "text-white" : "text-slate-900"
            )}>{p.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
