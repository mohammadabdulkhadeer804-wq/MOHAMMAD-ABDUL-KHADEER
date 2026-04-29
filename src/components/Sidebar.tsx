import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageSquare, FileText, BookOpen, Database, Code, Settings, LogOut, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "./AuthProvider";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'AI Mock Interview', href: '/interview', icon: MessageSquare },
  { name: 'Resume Analyzer', href: '/resume', icon: FileText },
  { name: 'Topic Resources', href: '/resources', icon: BookOpen },
  { name: 'Question Bank', href: '/questions', icon: Database },
  { name: 'Coding Practice', href: '/coding', icon: Code },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white shrink-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-500 font-bold text-white italic">AI</div>
          <span className="font-bold tracking-tight text-xl text-indigo-400">InterviewPro</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 mb-6">
          <img src={user?.photoURL || ''} className="h-10 w-10 rounded-full bg-slate-700 border border-slate-700" alt="Profile" />
          <div className="flex-1 min-w-0">
             <p className="text-xs font-semibold text-white truncate">{user?.displayName}</p>
             <p className="text-[10px] text-slate-500 truncate font-medium">Free Plan User</p>
          </div>
        </div>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button 
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
