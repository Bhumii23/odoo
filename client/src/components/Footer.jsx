import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto flex flex-col items-center justify-between gap-2 border-t border-[#ece7ef] bg-white/70 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:px-6">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span>All systems operational</span>
      </div>
      <span>© {currentYear} TransitOps. All rights reserved.</span>
    </footer>
  );
}
