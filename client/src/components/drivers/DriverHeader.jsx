import React from 'react';
import { Plus, FileSpreadsheet, Sparkles } from 'lucide-react';

export default function DriverHeader({ onAddDriver, onExportCSV }) {
  return (
    <div className="rounded-[32px] border border-[#ece7ef] bg-white/80 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] backdrop-blur md:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ece7ef] bg-[#f9f7fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6d28d9] shadow-sm">
            <Sparkles size={12} />
            Driver Operations
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Driver management
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Keep licenses, assignments, and safety readiness in sync with a calm operational workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 rounded-2xl border border-[#ece7ef] bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9cceb] hover:bg-[#f8f6f9]"
          >
            <FileSpreadsheet size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onAddDriver}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_15px_34px_-18px_rgba(109,40,217,0.65)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <Plus size={14} />
            <span>Add Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
}
