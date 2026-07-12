import React from 'react';
import { Plus, FileSpreadsheet, Sparkles } from 'lucide-react';

export default function DriverHeader({ onAddDriver, onExportCSV }) {
  return (
    <div className="rounded-[32px] border border-[#E9E2EC] bg-gradient-to-br from-[#FCFAFD] via-white to-[#F6EEF6] p-6 md:p-7 shadow-[0_24px_70px_-32px_rgba(93,63,88,0.35)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9E2EC] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5D3F58] shadow-sm">
            <Sparkles size={12} />
            Driver Operations
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#2E2331] sm:text-3xl">
            Driver Management
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#7A7180]">
            Manage drivers, licenses, safety scores and trip assignments efficiently with a calm, modern workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 rounded-2xl border border-[#E9E2EC] bg-white/90 px-3.5 py-2 text-sm font-semibold text-[#4B3348] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DCCFD9] hover:bg-[#F8F2F8]"
          >
            <FileSpreadsheet size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onAddDriver}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5D3F58] to-[#4B3348] px-3.5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(93,63,88,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#4B3348] hover:to-[#3D263A]"
          >
            <Plus size={14} />
            <span>Add Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
}
