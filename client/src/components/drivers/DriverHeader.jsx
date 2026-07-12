import React from 'react';
import { Plus, FileSpreadsheet, Sparkles } from 'lucide-react';

export default function DriverHeader({ onAddDriver, onExportCSV }) {
  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.012)] text-left">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-550 shadow-sm">
            <Sparkles size={11} />
            Driver Operations
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
            Driver Registry
          </h1>
          <p className="mt-1.5 text-xs text-slate-450 leading-relaxed font-semibold">
            Keep licenses, assignments, and safety readiness in sync with a calm operational workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer hover:bg-slate-50"
          >
            <FileSpreadsheet size={13} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onAddDriver}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-100 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus size={13} />
            <span>Add Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
}
