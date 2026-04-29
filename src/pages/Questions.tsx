import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Briefcase, Globe, Database, Cpu, Shield, Code, BarChart3, HelpCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const roles = [
  { id: 'swe', name: 'Software Engineer', icon: Code },
  { id: 'ds', name: 'Data Scientist', icon: BarChart3 },
  { id: 'cyber', name: 'Cybersecurity', icon: Shield },
  { id: 'devops', name: 'DevOps', icon: Cpu },
  { id: 'product', name: 'Product Manager', icon: Briefcase },
];

const questionBank = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Google',
    question: "How would you implement a distributed cache system?",
    category: 'System Design',
    difficulty: 'Hard'
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'Meta',
    question: "Explain the difference between Prototypal and Classical inheritance in JS.",
    category: 'Languages',
    difficulty: 'Medium'
  },
  {
    id: 3,
    role: 'Data Scientist',
    company: 'Amazon',
    question: "What is the curse of dimensionality and how do you handle it?",
    category: 'ML Theory',
    difficulty: 'Medium'
  },
  {
    id: 4,
    role: 'Cybersecurity',
    company: 'Cloudflare',
    question: "Explain how a SQL injection attack works and how to prevent it.",
    category: 'Web Security',
    difficulty: 'Easy'
  },
  {
    id: 5,
    role: 'Software Engineer',
    company: 'Netflix',
    question: "Find the median of two sorted arrays of different sizes.",
    category: 'DSA',
    difficulty: 'Hard'
  }
];

export function Questions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRole, setActiveRole] = useState('All');

  const filtered = questionBank.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = activeRole === 'All' || q.role === activeRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between border-b border-slate-100 pb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 serif">Knowledge Base</h1>
          <p className="text-slate-500 mt-2 font-medium">Curated Technical Interview Repository</p>
        </div>
        <div className="relative group w-full md:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
           <input 
              type="text" 
              placeholder="Query questions, firms, or topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm placeholder:text-slate-300"
            />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
        {['All', 'Software Engineer', 'Data Scientist', 'Cybersecurity', 'DevOps'].map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={cn(
              "whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.1em] transition-all border shadow-sm",
              activeRole === role 
                ? "bg-slate-900 border-slate-950 text-white" 
                : "bg-white border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
            )}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((q) => (
          <div 
            key={q.id} 
            className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-600/5 transition-all cursor-pointer overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                    {q.category}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-slate-200" />
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    q.difficulty === 'Hard' ? "text-red-500" : q.difficulty === 'Medium' ? "text-amber-500" : "text-emerald-500"
                  )}>
                    {q.difficulty} Level
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 serif pr-12 leading-tight">
                  "{q.question}"
                </h3>
                <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                  <span className="flex items-center gap-2 group-hover:text-slate-600 transition-colors">
                    <Globe size={14} className="text-slate-300" />
                    {q.company}
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-slate-600 transition-colors">
                    <Briefcase size={14} className="text-slate-300" />
                    {q.role}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-4">
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  Analyze Solution
                </div>
                <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity rotate-12 -z-10">
               <HelpCircle size={120} strokeWidth={1} />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-slate-100 bg-slate-50/50 rounded-[40px]">
            <Database className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 serif mb-2">Null Set</h3>
            <p className="text-slate-400 serif italic">No records match your specific inquiry parameters.</p>
          </div>
        )}
      </div>
      
      <p className="text-center text-[9px] text-slate-300 uppercase tracking-[0.3em] font-bold py-10">Historical Data Indexed Weekly • Verified by Senior Staff</p>
    </div>
  );
}

// No custom icons needed, using Lucide
