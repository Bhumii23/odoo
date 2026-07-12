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
          className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]"
        >
          <h2 className="text-xl font-semibold text-[#2E2331]">Vehicle availability</h2>
          <p className="mt-1 text-sm text-[#6F6873]">Vehicles in shop are removed from dispatchable availability.</p>
          <div className="mt-5 space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-4 py-3">
                <div>
                  <p className="font-semibold text-[#2E2331]">{vehicle.name}</p>
                  <p className="text-sm text-[#6F6873]">{vehicle.type} · {vehicle.capacityKg} kg</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${vehicle.status === 'In Shop' ? 'bg-[#FDECEC] text-[#B65055]' : 'bg-[#EAF7EF] text-[#2F6F4B]'}`}>
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
