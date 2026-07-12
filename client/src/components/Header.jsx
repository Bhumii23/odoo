import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export default function Header({ activeTab }) {
  // Simple helper to format the current page title
  const getPageTitle = (tab) => {
    if (!tab) return 'Dashboard';
    return tab
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
  };

  return (
    <header className="h-16 sticky top-0 bg-[#0F172A] border-b border-slate-800 px-6 flex items-center justify-between z-20">
      {/* Left Section: Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-slate-400">
        <span>Home</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-200 font-medium">{getPageTitle(activeTab)}</span>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 max-w-md mx-8 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#1E293B]/60 text-slate-100 placeholder-slate-500 text-sm pl-10 pr-4 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-slate-700 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors duration-200">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-[#0F172A] animate-pulse"></span>
        </button>

        {/* User Info (Raven K.) */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-200">Raven K.</p>
          </div>

          {/* Dispatcher Role Badge */}
          <span className="text-xs bg-[#714B67] text-white px-2.5 py-1 rounded-full font-semibold tracking-wide">
            Dispatcher
          </span>

          {/* User Avatar */}
          <div className="h-9 w-9 rounded-full bg-[#714B67]/30 border border-[#714B67]/60 flex items-center justify-center text-sm font-bold text-white tracking-wider">
            RK
          </div>
        </div>
      </div>
    </header>
  );
}
