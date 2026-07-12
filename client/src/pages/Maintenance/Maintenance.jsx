import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MaintenanceHeader from './components/MaintenanceHeader';
import MaintenanceStats from './components/MaintenanceStats';
import MaintenanceForm from './components/MaintenanceForm';
import MaintenanceHistory from './components/MaintenanceHistory';
import { useMaintenance } from './hooks/useMaintenance';

export default function Maintenance() {
  const { vehicles, stats, filters, setFilters, filteredHistory, scheduleMaintenance, completeMaintenance } = useMaintenance();
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="space-y-6">
      <MaintenanceHeader onSchedule={() => setIsFormVisible((value) => !value)} />

      <MaintenanceStats stats={stats} />

      {isFormVisible ? <MaintenanceForm vehicles={vehicles} onSubmit={scheduleMaintenance} /> : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.012)] text-left"
        >
          <h2 className="text-base font-bold text-slate-800 tracking-tight">Vehicle Availability</h2>
          <p className="mt-1 text-xs text-slate-500 font-semibold leading-relaxed">Vehicles in shop are removed from dispatchable availability.</p>
          <div className="mt-5 space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
                <div>
                  <p className="font-bold text-slate-700 text-xs">{vehicle.name}</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{vehicle.type} · {vehicle.capacityKg} kg</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${vehicle.status === 'In Shop' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <MaintenanceHistory history={filteredHistory} filters={filters} setFilters={setFilters} onComplete={completeMaintenance} />
      </div>
    </div>
  );
}
