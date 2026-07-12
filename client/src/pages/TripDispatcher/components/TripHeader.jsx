import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function TripHeader({ onCreateTrip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.012)] text-left"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">TransitOps</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">Trip Dispatcher</h1>
          <p className="mt-1.5 max-w-2xl text-xs text-slate-450 leading-relaxed font-semibold">
            Create, assign and monitor transport operations with clarity and control.
          </p>
        </div>
        <button
          onClick={onCreateTrip}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-100 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus size={14} />
          Create Trip
        </button>
      </div>
    </motion.div>
  );
}
