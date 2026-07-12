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
    <div className="rounded-[28px] border border-[#ece7ef] bg-white/85 p-4 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.28)] backdrop-blur">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-[220px] flex-1 flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Search Driver
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID or license"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full rounded-2xl border border-[#ece7ef] bg-[#fcfbfe] py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-[#d9cceb] focus:outline-none focus:ring-4 focus:ring-[#f4eaff]"
            />
          </div>
        </div>

        <div className="flex min-w-[150px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="rounded-2xl border border-[#ece7ef] bg-[#fcfbfe] px-3 py-2.5 text-sm text-slate-900 transition-all duration-200 focus:border-[#d9cceb] focus:outline-none focus:ring-4 focus:ring-[#f4eaff]"
          >
            {DRIVER_FILTER_OPTIONS.statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[180px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            License Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="rounded-2xl border border-[#ece7ef] bg-[#fcfbfe] px-3 py-2.5 text-sm text-slate-900 transition-all duration-200 focus:border-[#d9cceb] focus:outline-none focus:ring-4 focus:ring-[#f4eaff]"
          >
            {DRIVER_FILTER_OPTIONS.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[180px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Assigned Vehicle
          </label>
          <select
            value={filters.assignedVehicle}
            onChange={(e) => handleFilterChange('assignedVehicle', e.target.value)}
            className="rounded-2xl border border-[#ece7ef] bg-[#fcfbfe] px-3 py-2.5 text-sm text-slate-900 transition-all duration-200 focus:border-[#d9cceb] focus:outline-none focus:ring-4 focus:ring-[#f4eaff]"
          >
            {DRIVER_FILTER_OPTIONS.vehicles.map((v) => (
              <option key={v} value={v}>
                {v === 'None' ? 'No Assigned Vehicle' : v}
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
          className="ml-auto flex items-center gap-2 rounded-2xl border border-[#ece7ef] bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9cceb] hover:bg-[#f8f6f9]"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
    </div>
  );
}
