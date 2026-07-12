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
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] p-4 rounded-[24px] flex flex-wrap gap-4 items-center shadow-[0_16px_44px_-24px_rgba(76,54,97,0.28)] backdrop-blur">
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Month
        </label>
        <select
          value={filters.month}
          onChange={(e) => handleChange('month', e.target.value)}
          className="bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-[#c7abda] transition-colors"
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
          className="bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-[#c7abda] transition-colors"
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
          className="bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-[#c7abda] transition-colors"
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
          className="bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-[#c7abda] transition-colors"
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
          className="bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-[#c7abda] transition-colors"
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
        className="ml-auto mt-4 sm:mt-0 bg-white/80 border border-[#e7d9e8] text-slate-600 hover:text-[#5e3d75] hover:bg-[#f4ecf8] hover:border-[#c7abda] text-xs font-semibold px-3 py-1.5 rounded-2xl transition-all cursor-pointer shadow-sm"
      >
        Reset Filters
      </button>
    </div>
  );
}
