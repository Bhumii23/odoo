import React from 'react';
import { Search } from 'lucide-react';

export default function TripFilters({ filters, setFilters, drivers, vehicles }) {
  return (
    <div className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-4 shadow-[0_18px_48px_-28px_rgba(93,63,88,0.24)]">
      <div className="grid gap-4 lg:grid-cols-5">
        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Search</span>
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7180]" />
            <input
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              placeholder="Trip, route, crew"
              className="w-full rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] py-2.5 pl-9 pr-3 text-sm text-[#2E2331] outline-none ring-0 transition focus:border-[#DCCFD9]"
            />
          </div>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Status</span>
          <select
            value={filters.status}
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Driver</span>
          <select
            value={filters.driver}
            onChange={(event) => setFilters((current) => ({ ...current, driver: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="All">All</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.name}>
                {driver.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Vehicle</span>
          <select
            value={filters.vehicle}
            onChange={(event) => setFilters((current) => ({ ...current, vehicle: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="All">All</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.name}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Date</span>
          <input
            type="date"
            value={filters.date}
            onChange={(event) => setFilters((current) => ({ ...current, date: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          />
        </label>
      </div>
    </div>
  );
}
