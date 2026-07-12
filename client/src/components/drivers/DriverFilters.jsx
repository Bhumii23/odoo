import React from 'react';
import { Search } from 'lucide-react';
import { DRIVER_FILTER_OPTIONS } from '../../data/driversData';

export default function DriverFilters({ filters, setFilters }) {
  // Update a single filter field state dynamically
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-[#1E293B] p-4 border border-slate-800/80 rounded-lg flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Search Driver
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search Driver..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded pl-8 pr-3 py-2 focus:outline-none placeholder-slate-600 focus:border-slate-700 transition-colors w-48"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {DRIVER_FILTER_OPTIONS.statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* License Category Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          License Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {DRIVER_FILTER_OPTIONS.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Assigned Vehicle Filter */}
      <div className="flex flex-col text-left">
        <label className="text-[10px] text-slate-500 mb-1 font-semibold uppercase tracking-wider pl-0.5">
          Assigned Vehicle
        </label>
        <select
          value={filters.assignedVehicle}
          onChange={(e) => handleFilterChange('assignedVehicle', e.target.value)}
          className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-slate-700 transition-colors"
        >
          {DRIVER_FILTER_OPTIONS.vehicles.map((v) => (
            <option key={v} value={v}>
              {v === 'None' ? 'No Assigned Vehicle' : v}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          setFilters({
            searchQuery: '',
            status: 'All',
            category: 'All',
            assignedVehicle: 'All',
          })
        }
        className="ml-auto mt-4 sm:mt-0 bg-slate-850 border border-slate-750 text-slate-400 hover:text-slate-200 hover:bg-slate-800 hover:border-slate-700 text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}
