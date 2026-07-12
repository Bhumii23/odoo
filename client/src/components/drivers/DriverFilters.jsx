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
    <div className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-4 shadow-[0_16px_48px_-28px_rgba(93,63,88,0.24)] backdrop-blur">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-[220px] flex-1 flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">
            Search Driver
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#7A7180]" />
            <input
              type="text"
              placeholder="Search by name, ID or license"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] py-2.5 pl-9 pr-3 text-sm text-[#2E2331] placeholder:text-[#7A7180] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
            />
          </div>
        </div>

        <div className="flex min-w-[150px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
          >
            {DRIVER_FILTER_OPTIONS.statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[180px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">
            License Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
          >
            {DRIVER_FILTER_OPTIONS.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[180px] flex-col text-left">
          <label className="mb-1.5 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">
            Assigned Vehicle
          </label>
          <select
            value={filters.assignedVehicle}
            onChange={(e) => handleFilterChange('assignedVehicle', e.target.value)}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
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
          className="ml-auto flex items-center gap-2 rounded-2xl border border-[#E9E2EC] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#4B3348] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DCCFD9] hover:bg-[#F8F2F8]"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
    </div>
  );
}
