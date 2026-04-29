import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User as UserIcon, Bot, Loader2, Trophy, RefreshCw, Mic, Volume2, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { interviewService } from '@/src/services/gemini';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function Interview() {
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('Entry');
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async () => {
    if (!role) return;
    setLoading(true);
    try {
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are an expert interviewer. Conduct a professional technical interview for a ${level} level ${role} position. Ask one question at a time. Evaluate the candidate's responses. Be realistic, slightly challenging, but encouraging.`,
        }
      });

      const result = await chatRef.current.sendMessage("Hi, I'm ready to start the interview.");
      setMessages([{ role: 'model', text: result.text }]);
      setStarted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessage(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const endInterview = async () => {
    setLoading(true);
    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const analysis = await interviewService.getFeedback(history);
      setFeedback(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (feedback) {
    return (
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100">
            <Trophy className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 serif">Interview Scorecard</h1>
          <p className="text-slate-500 max-w-md mx-auto">Simulation complete. Your performance has been analyzed against industry benchmarks.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: 'Communication', score: feedback.communication, color: 'bg-indigo-600' },
            { label: 'Technical Depth', score: feedback.technical, color: 'bg-indigo-600' },
            { label: 'Confidence', score: feedback.confidence, color: 'bg-indigo-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-3xl text-center shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{stat.label}</p>
              <p className="text-4xl font-bold text-slate-900">{stat.score}/10</p>
              <div className="mt-6 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", stat.color)} 
                  style={{ width: `${stat.score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 p-10 rounded-3xl space-y-8 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-slate-900 serif mb-4 underline decoration-indigo-200 decoration-4 underline-offset-4">Comprehensive Assessment</h3>
            <p className="text-slate-600 leading-relaxed italic serif text-lg">{feedback.feedback}</p>
          </div>
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Strategic Improvements</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {feedback.improvements.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-indigo-600" />
                  </div>
                  <p className="text-slate-600 text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => { setFeedback(null); setStarted(false); setMessages([]); }}
          className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <RefreshCw className="w-5 h-5" />
          Retake Simulation
        </button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-10 py-12 animate-in fade-in duration-700">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <MessageSquare className="text-indigo-600 h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 serif">AI Simulation Lab</h1>
          <p className="text-slate-500 max-w-sm mx-auto">Configure your scenario to engage with our high-fidelity interview engine.</p>
        </div>

        <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-xl shadow-slate-200/50 space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Target Discipline</label>
            <div className="relative group">
               <input 
                 type="text" 
                 placeholder="e.g. Staff Product Designer, Lead Engineer..." 
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                 className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all text-sm font-medium placeholder:text-slate-300 shadow-inner"
               />
               <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-400 transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience Level Selection</label>
            <div className="grid grid-cols-3 gap-4">
              {['Entry', 'Intermediate', 'Senior'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "py-4 px-6 rounded-2xl border text-xs font-bold transition-all tracking-widest uppercase shadow-sm",
                    level === l 
                      ? "bg-slate-900 border-slate-950 text-white" 
                      : "bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-600"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={startInterview}
            disabled={!role || loading}
            className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Initiate Simulation Protocol"}
          </button>
        </div>
        
        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-medium">Verified Enterprise AI • Secure Cloud Isolation</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-5xl mx-auto border border-slate-200 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
      <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Simulation Environment</span>
            <span className="text-sm font-bold text-slate-900 mt-1">{role} Session</span>
          </div>
        </div>
        <button 
          onClick={endInterview}
          className="px-4 py-2 text-[10px] font-bold text-red-500 hover:bg-red-50 rounded-full transition-colors uppercase tracking-widest border border-red-100"
        >
          Terminate Early
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-5 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse text-right" : "mr-auto"
              )}
            >
              <div className={cn(
                "h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center shadow-sm",
                m.role === 'user' ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-400"
              )}>
                {m.role === 'user' ? <UserIcon size={18} /> : <Bot size={18} />}
              </div>
              <div className={cn(
                "p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm",
                m.role === 'user' 
                  ? "bg-slate-900 text-white rounded-tr-sm" 
                  : "bg-white text-slate-700 border border-slate-200 rounded-tl-sm italic serif"
              )}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex gap-5 mr-auto max-w-[85%] animate-pulse">
            <div className="h-10 w-10 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
              <Bot size={18} className="text-slate-300" />
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 rounded-tl-sm">
              <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-4 max-w-4xl mx-auto shadow-sm rounded-2xl border border-slate-200 p-2 focus-within:ring-4 focus-within:ring-indigo-600/5 transition-all">
          <button className="p-3 text-slate-300 hover:text-indigo-600 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Formulate your response..."
            className="flex-1 bg-transparent border-none px-2 py-3 text-slate-900 focus:outline-none text-[15px] font-medium placeholder:text-slate-300"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-center">
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold">Encrypted Session Data • Low Latency Streaming</p>
        </div>
      </div>
    </div>
  );
}
