import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';

export default function Header({ activeTab }) {
  const getPageTitle = (tab) => {
    if (!tab) return 'Dashboard';
    if (tab === 'fuel-expenses') return 'Fuel & Expenses';
    return tab
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="z-20 flex items-center justify-between gap-4 border border-slate-100/80 bg-white/95 px-6 py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c5a9f] to-[#5e3d75] text-white shadow-md shadow-purple-100">
          <Sparkles size={14} />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Operations</p>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">{getPageTitle(activeTab)}</h2>
        </div>
      </div>

      <div className="hidden flex-1 max-w-md items-center justify-center md:flex mx-auto">
        <label className="flex w-full items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-1.5 focus-within:border-slate-350 focus-within:bg-white transition-all duration-200">
          <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search operations, drivers, vehicles..."
            className="w-full border-none bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-xl border border-slate-100 bg-slate-50/30 p-2 text-slate-450 hover:text-[#7c5a9f] transition-all hover:bg-slate-50">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/20 px-2.5 py-1.5 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#f4eaff] to-[#efe7ff] text-[10px] font-bold text-[#7c5a9f]">
            RK
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[11px] font-bold text-slate-700 leading-none">Raven K.</p>
            <p className="text-[9px] text-slate-400 mt-0.5 leading-none">Dispatcher</p>
          </div>
        </div>
      </div>
    </header>
  );
}
