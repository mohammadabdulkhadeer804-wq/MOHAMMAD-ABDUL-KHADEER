import { ArrowUpRight, CheckCircle2, Clock, FileText, Layout, Play, Trophy } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 serif">Candidate Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back. Your preparedness index is <span className="text-indigo-600 font-bold">84%</span> this week.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Ready</span>
        </div>
      </div>
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[ 
          { label: 'Mock Interviews', value: '12', sub: '+3 this week', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Play },
          { label: 'Avg. Score', value: '84%', sub: 'Top 15% rank', color: 'text-green-600', bg: 'bg-green-50', icon: Trophy },
          { label: 'Resume Score', value: '78/100', sub: 'Needs optimization', color: 'text-amber-500', bg: 'bg-amber-50', icon: FileText },
          { label: 'Practice Hours', value: '24.5', sub: 'Goal reached', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
               <div className={stat.bg + " p-2 rounded-lg transition-colors group-hover:scale-110 duration-300"}>
                 <stat.icon className={"h-4 w-4 " + stat.color} />
               </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <span className={"text-[10px] font-bold " + stat.color}>{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Hero Card: AI Interview Simulator */}
        <div className="col-span-12 lg:col-span-8 bg-slate-900 rounded-3xl p-10 relative overflow-hidden shadow-2xl shadow-slate-900/10">
          <div className="relative z-10 max-w-lg">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase rounded-full border border-indigo-400/20 tracking-widest">
              Live Simulation Active
            </span>
            <h2 className="text-4xl font-bold text-white mt-6 serif leading-tight">Master your next tech interview with AI.</h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Experience realistic interview environments tailored for roles at Big Tech firms. Current focus: <span className="text-white font-medium">Distributed Systems & Behavioral.</span>
            </p>
            <div className="flex items-center gap-4 mt-8">
              <button className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5">
                Launch Simulation
              </button>
              <button className="px-6 py-3.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-sm hover:bg-slate-700 transition-all">
                Review History
              </button>
            </div>
          </div>
          
          {/* Decorative element from theme */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl invisible md:visible"></div>
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-48 h-48 border-8 border-slate-800/50 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 border-8 border-slate-800 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full animate-pulse border border-indigo-500/40"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Insights Card */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 text-sm">Resume Analysis</h3>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-20 bg-slate-50 rounded-lg border border-slate-200 flex flex-col p-2 shadow-inner">
               <div className="h-1.5 w-full bg-slate-200 rounded-full mb-1.5"></div>
               <div className="h-1.5 w-2/3 bg-slate-200 rounded-full mb-1.5"></div>
               <div className="h-1.5 w-full bg-slate-100 rounded-full mb-1.5"></div>
               <div className="h-1.5 w-1/2 bg-slate-100 rounded-full"></div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">software_eng_v4.pdf</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Last indexed 4h ago</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500 uppercase tracking-wider">ATS Keyword Match</span>
                <span className="text-indigo-600">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[82%] rounded-full"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Impact</p>
                  <p className="text-xs font-bold text-slate-900">High</p>
               </div>
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Layout</p>
                  <p className="text-xs font-bold text-slate-900">Clean</p>
               </div>
            </div>
          </div>
          
          <button className="w-full mt-8 py-3 bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            Optimize Resume
          </button>
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-slate-900 text-sm">Targeted Practice Areas</h3>
          <button className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:underline">View Roadmap</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Dynamic Programming Patterns", meta: "High Priority • 12 Questions", progress: 65 },
            { title: "System Design: Microservices", meta: "Expert Level • 5 Workbooks", progress: 30 },
            { title: "Behavioral: Leadership", meta: "Standard • 20 Scenarios", progress: 90 },
          ].map((topic, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                 <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{topic.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{topic.meta}</p>
                 </div>
                 <ArrowUpRight className="h-3 w-3 text-slate-300 group-hover:text-indigo-400" />
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-indigo-600/40 h-full rounded-full transition-all duration-500 group-hover:bg-indigo-600" style={{width: `${topic.progress}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
