import React, { useState } from 'react';
import { Search, Youtube, Newspaper, Book, ExternalLink, Loader2, Play, Code, LayoutGrid as Grid, Monitor, Server, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const categories = [
  { id: 'dsa', name: 'DSA', icon: Code },
  { id: 'system', name: 'System Design', icon: Grid },
  { id: 'frontend', name: 'Frontend', icon: Monitor },
  { id: 'backend', name: 'Backend', icon: Server },
  { id: 'hr', name: 'HR / Behavioral', icon: Users },
];

export function Resources() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<any[]>([]);

  const fetchResources = async (query?: string) => {
    const q = query || topic;
    if (!q) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find me high-quality learning resources for "${q}". Provide a list of YouTube videos, articles, and documentation links.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['video', 'article', 'book'] },
                author: { type: Type.STRING },
                link: { type: Type.STRING },
                desc: { type: Type.STRING }
              },
              required: ["title", "type", "link"]
            }
          }
        }
      });
      setResources(JSON.parse(response.text || "[]"));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <div className="h-16 w-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
           <Sparkles className="text-indigo-600 h-8 w-8" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 serif">Knowledge Network</h1>
        <p className="text-slate-500 max-w-xl mx-auto serif text-lg leading-relaxed">
          AI-driven aggregation of high-fidelity technical pedagogical materials, synthesized for professional advancement.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white border border-slate-200 p-2 rounded-[2rem] shadow-xl shadow-slate-200/50">
        <div className="flex-1 flex items-center gap-4 px-6 py-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search disciplines or emerging technologies..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchResources()}
            className="bg-transparent text-slate-900 focus:outline-none w-full font-medium text-sm placeholder:text-slate-300"
          />
        </div>
        <button 
          onClick={() => fetchResources()}
          disabled={loading || !topic}
          className="h-full px-12 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95 shrink-0"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Initiate Search"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setTopic(cat.name); fetchResources(cat.name); }}
            className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-600/5 transition-all group"
          >
            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
              <cat.icon size={26} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((res, i) => (
          <div key={i} className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-600/5 transition-all overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className={cn(
                "p-4 rounded-2xl shadow-sm",
                res.type === 'video' ? "bg-red-50 text-red-500" : res.type === 'article' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
              )}>
                {res.type === 'video' ? <Youtube size={20} /> : res.type === 'article' ? <Newspaper size={20} /> : <Book size={20} />}
              </div>
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                <ExternalLink size={16} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight serif pr-6 h-14 line-clamp-2">
              {res.title}
            </h3>
            <p className="text-sm text-slate-500 italic serif mb-8 line-clamp-3 leading-relaxed">
              {res.desc || "In-depth exposition of advanced methodologies and standardized implementations."}
            </p>
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate max-w-[120px]">{res.author || "Global Network"}</span>
              </div>
              {res.type === 'video' ? (
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                  <Play size={10} fill="currentColor" />
                  View Video
                </div>
              ) : (
                <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                  Read More
                  <ArrowUpRight size={12} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {resources.length === 0 && !loading && (
        <div className="text-center py-32 border-2 border-dashed border-slate-100 bg-slate-50/50 rounded-[3rem]">
          <Loader2 className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <p className="text-slate-400 serif italic text-xl px-20">The index is currenty empty. Initiate an aggregation scan to populate this node.</p>
        </div>
      )}
      
      <p className="text-center text-[9px] text-slate-300 uppercase tracking-[0.34em] font-bold pt-10">Cross-Referencing Global Repositories • Synced Real-Time</p>
    </div>
  );
}

// No custom icons needed, using Lucide
