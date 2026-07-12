import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header({ activeTab }) {
  const getPageTitle = (tab) => {
    if (!tab) return 'Dashboard';
    return tab
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
  };

  return (
    <header className="h-16 sticky top-0 bg-[#fcf8f3]/80 backdrop-blur-xl border-b border-[#e9dfd7] px-6 flex items-center justify-between z-20 shadow-[0_12px_28px_-18px_rgba(31,41,55,0.3)]">
      <div className="flex items-center space-x-2 text-sm text-slate-500">
        <span>Home</span>
        <span className="text-slate-400">/</span>
        <span className="text-slate-800 font-semibold">{getPageTitle(activeTab)}</span>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/80 text-slate-700 placeholder-slate-400 text-sm pl-10 pr-4 py-2 rounded-2xl border border-[#e7d9e8] focus:outline-none focus:border-[#c7abda] transition-colors duration-200 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="relative p-2 rounded-2xl text-slate-500 hover:text-[#5e3d75] hover:bg-[#f4ecf8] transition-colors duration-200 shadow-sm border border-transparent hover:border-[#e7d9e8]">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full ring-2 ring-[#fcf8f3] animate-pulse"></span>
        </button>

        <div className="flex items-center space-x-3 pl-3 border-l border-[#e7d9e8]">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-800">Raven K.</p>
          </div>

          <span className="text-[11px] bg-[#7c5a9f] text-white px-2.5 py-1 rounded-full font-semibold tracking-wide shadow-sm">
            Dispatcher
          </span>

          <div className="h-9 w-9 rounded-full bg-[#efe4f7] border border-[#d7c0e4] flex items-center justify-center text-sm font-bold text-[#5e3d75] tracking-wider">
            RK
          </div>
        </div>
      </div>
    </header>
  );
}
