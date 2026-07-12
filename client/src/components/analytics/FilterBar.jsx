import React from 'react';
import { FILTER_OPTIONS } from '../../data/analyticsData';

export default function FilterBar({ filters, setFilters }) {
  // Handler to update a single filter category state dynamically
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-[#1E293B] border border-slate-800/80 p-4 rounded-lg flex flex-wrap gap-4 items-center">
      {/* Month Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Month
        </label>
        <select
          value={filters.month}
          onChange={(e) => handleChange('month', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {FILTER_OPTIONS.months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Type Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Vehicle Type
        </label>
        <select
          value={filters.vehicleType}
          onChange={(e) => handleChange('vehicleType', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {FILTER_OPTIONS.vehicleTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Region Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Region
        </label>
        <select
          value={filters.region}
          onChange={(e) => handleChange('region', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {FILTER_OPTIONS.regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Driver Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Driver
        </label>
        <select
          value={filters.driver}
          onChange={(e) => handleChange('driver', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {FILTER_OPTIONS.drivers.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Trip Status Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Trip Status
        </label>
        <select
          value={filters.tripStatus}
          onChange={(e) => handleChange('tripStatus', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {FILTER_OPTIONS.tripStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters button */}
      <button
        onClick={() => setFilters({ month: 'All', vehicleType: 'All', region: 'All', driver: 'All', tripStatus: 'All' })}
        className="ml-auto mt-4 sm:mt-0 bg-slate-850 border border-slate-750 text-slate-400 hover:text-slate-200 hover:bg-slate-800 hover:border-slate-700 text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}
