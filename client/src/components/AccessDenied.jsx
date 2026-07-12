import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-[#fffaf5]/95 border border-[#ebe0d4] rounded-[28px] shadow-[0_20px_50px_-30px_rgba(124,90,159,0.2)] max-w-lg mx-auto mt-12 backdrop-blur">
      <div className="p-4 bg-rose-500/10 rounded-full text-rose-500 mb-5 border border-rose-500/20">
        <ShieldAlert size={36} />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">403</h1>
      <h2 className="text-lg font-bold text-slate-700 mt-2">Access Denied</h2>
      <p className="text-sm text-slate-500 mt-3 max-w-sm leading-relaxed">
        You don't have permission to access this module.
      </p>
    </div>
  );
}
