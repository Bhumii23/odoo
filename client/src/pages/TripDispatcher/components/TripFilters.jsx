import React from 'react';
import { Search } from 'lucide-react';

export default function TripFilters({ filters, setFilters, drivers, vehicles }) {
  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="grid gap-4 lg:grid-cols-5">
        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pl-0.5">Search</span>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              placeholder="Trip, route, crew"
              className="w-full rounded-xl border border-slate-100 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pl-0.5">Status</span>
          <select
            value={filters.status}
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-600 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pl-0.5">Driver</span>
          <select
            value={filters.driver}
            onChange={(event) => setFilters((current) => ({ ...current, driver: event.target.value }))}
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-650 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
          >
            <option value="All">All Drivers</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.name}>
                {driver.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pl-0.5">Vehicle</span>
          <select
            value={filters.vehicle}
            onChange={(event) => setFilters((current) => ({ ...current, vehicle: event.target.value }))}
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-650 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
          >
            <option value="All">All Vehicles</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.name}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pl-0.5">Date</span>
          <input
            type="date"
            value={filters.date}
            onChange={(event) => setFilters((current) => ({ ...current, date: event.target.value }))}
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
          />
        </label>
      </div>
    </div>
  );
}
