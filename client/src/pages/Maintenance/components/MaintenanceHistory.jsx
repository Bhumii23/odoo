import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, Search } from 'lucide-react';

const statusStyles = {
  Scheduled: 'bg-[#F4EAF5] text-[#5D3F58]',
  Completed: 'bg-[#EAF7EF] text-[#2F6F4B]',
};

export default function MaintenanceHistory({ history, filters, setFilters, onComplete }) {
  return (
    <div className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#2E2331]">Service history</h2>
          <p className="mt-1 text-sm text-[#6F6873]">Search, filter and follow every maintenance record.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2 text-sm text-[#4B3348]">
            <Search size={15} />
            <input
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              placeholder="Search"
              className="w-32 bg-transparent outline-none"
            />
          </label>
          <select
            value={filters.status}
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2 text-sm text-[#2E2331] outline-none"
          >
            <option value="All">All statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={filters.vehicle}
            onChange={(event) => setFilters((current) => ({ ...current, vehicle: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2 text-sm text-[#2E2331] outline-none"
          >
            <option value="All">All vehicles</option>
            <option value="VR-12">VR-12</option>
            <option value="TR-04">TR-04</option>
            <option value="EV-09">EV-09</option>
            <option value="TR-07">TR-07</option>
          </select>
          <select
            value={filters.priority}
            onChange={(event) => setFilters((current) => ({ ...current, priority: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2 text-sm text-[#2E2331] outline-none"
          >
            <option value="All">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {history.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="rounded-[24px] border border-[#E9E2EC] bg-[#FCFAFD] p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EAF5] text-[#5D3F58]">
                  <Wrench size={18} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-[#2E2331]">{record.vehicleName}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[record.status]}`}>
                      {record.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#6F6873]">{record.serviceType} · {record.workshop}</p>
                  <p className="mt-1 text-sm text-[#4B3348]">{record.description}</p>
                </div>
              </div>

              <div className="text-sm text-[#4B3348]">
                <p>Mechanic: {record.mechanic}</p>
                <p>Scheduled: {record.scheduledDate}</p>
                <p>Priority: {record.priority}</p>
                <p>Cost: ₹{record.estimatedCost.toLocaleString()}</p>
                {record.completedAt ? <p>Completed: {record.completedAt}</p> : null}
              </div>
            </div>

            {record.status === 'Scheduled' ? (
              <button
                onClick={() => onComplete(record.id)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#5D3F58] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#4B3348]"
              >
                <CheckCircle2 size={14} />
                Mark Complete
              </button>
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
