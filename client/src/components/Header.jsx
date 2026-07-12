import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';

export default function Header({ activeTab }) {
  const getPageTitle = (tab) => {
    if (!tab) return 'Dashboard';
    return tab
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#ece7ef] bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-purple-200">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Operations</p>
          <h2 className="text-base font-semibold text-slate-900">{getPageTitle(activeTab)}</h2>
        </div>
      </div>

      <div className="hidden flex-1 max-w-xl items-center justify-center md:flex">
        <label className="flex w-full max-w-lg items-center gap-3 rounded-full border border-[#ece7ef] bg-[#f9f7fb] px-4 py-2.5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search operations, drivers, vehicles"
            className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="relative rounded-full border border-[#ece7ef] bg-white p-2.5 text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-[#6d28d9]">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 rounded-full border border-[#ece7ef] bg-white px-2 py-2 pr-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ede9fe] to-[#f5f3ff] text-sm font-semibold text-[#6d28d9]">
            RK
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Raven K.</p>
            <p className="text-xs text-slate-500">Dispatcher</p>
          </div>
        </div>
      </div>
    </header>
  );
}
