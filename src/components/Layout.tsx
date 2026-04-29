import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Search, Bell } from "lucide-react";

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-500/30 selection:text-indigo-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
              <Search className="h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search resources, questions..." 
                className="bg-transparent text-sm focus:outline-none text-slate-900 placeholder:text-slate-400"
              />
              <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">⌘K</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-4">
              <button className="px-4 py-1.5 text-xs font-semibold border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm">Notifications</button>
              <button className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-lg">Settings</button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
