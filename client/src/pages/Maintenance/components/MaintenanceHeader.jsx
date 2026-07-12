import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function MaintenanceHeader({ onSchedule }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_24px_70px_-34px_rgba(93,63,88,0.4)]"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7A7180]">TransitOps</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#2E2331]">Maintenance Center</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6F6873]">Track vehicle servicing, keep downtime controlled and restore availability quickly.</p>
        </div>
        <button
          onClick={onSchedule}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5D3F58] to-[#4B3348] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(93,63,88,0.75)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Schedule Maintenance
        </button>
      </div>
    </motion.div>
  );
}
