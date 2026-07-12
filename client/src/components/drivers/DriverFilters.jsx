import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { DRIVER_FILTER_OPTIONS } from '../../data/driversData';

export default function DriverFilters({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-[220px] flex-1 flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Search Driver
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID or license"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all placeholder-slate-400 font-semibold"
            />
          </div>
        </div>

        <div className="flex min-w-[150px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
          >
            {DRIVER_FILTER_OPTIONS.statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[180px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            License Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
          >
            {DRIVER_FILTER_OPTIONS.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[180px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Assigned Vehicle
          </label>
          <select
            value={filters.assignedVehicle}
            onChange={(e) => handleFilterChange('assignedVehicle', e.target.value)}
            className="bg-slate-50 border border-slate-100 text-slate-650 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
          >
            {DRIVER_FILTER_OPTIONS.vehicles.map((v) => (
              <option key={v} value={v}>
                {v === 'All' ? 'All Vehicles' : v === 'None' ? 'No Assigned Vehicle' : v}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            setFilters({
              searchQuery: '',
              status: 'All',
              category: 'All',
              assignedVehicle: 'All',
            })
          }
          className="ml-auto flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-500 transition duration-200 hover:-translate-y-0.5 cursor-pointer"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
    </div>
  );
}
