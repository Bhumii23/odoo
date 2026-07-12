import React from 'react';
import { Plus, FileSpreadsheet } from 'lucide-react';

export default function DriverHeader({ onAddDriver, onExportCSV }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-100">Drivers</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage, assign, and track driver licenses and safety scores.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onExportCSV}
          className="flex items-center space-x-1.5 bg-[#1E293B] hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
        >
          <FileSpreadsheet size={13} />
          <span>Export CSV</span>
        </button>
        <button
          onClick={onAddDriver}
          className="flex items-center space-x-1.5 bg-[#714B67] hover:bg-[#4a3048] text-white px-3.5 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
        >
          <Plus size={13} />
          <span>Add Driver</span>
        </button>
      </div>
    </div>
  );
}
