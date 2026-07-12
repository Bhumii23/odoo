import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-5 border-t border-slate-800/80 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 bg-[#0F172A]">
      <div className="flex items-center space-x-2.5 mb-2 sm:mb-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="tracking-wide">All Systems Operational</span>
      </div>

      <div className="flex items-center space-x-4">
        <span>© {currentYear} TransitOps. All rights reserved.</span>
      </div>
    </footer>
  );
}
