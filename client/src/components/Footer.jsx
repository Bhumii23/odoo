import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto flex flex-col items-center justify-between gap-2 border border-slate-100 bg-white/80 rounded-2xl px-6 py-3.5 text-xs text-slate-500 sm:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-semibold tracking-wide text-slate-450 uppercase text-[9px]">All systems operational</span>
      </div>
      <span className="text-[10px] font-medium text-slate-400">© {currentYear} TransitOps. All rights reserved.</span>
    </footer>
  );
}
