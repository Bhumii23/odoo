import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, XCircle, CheckCircle2 } from 'lucide-react';

const statusClasses = {
  Draft: 'bg-[#F4EAF5] text-[#5D3F58]',
  Dispatched: 'bg-[#EAF7EF] text-[#2F6F4B]',
  Completed: 'bg-[#EEF4FF] text-[#3D5DAA]',
  Cancelled: 'bg-[#FDECEC] text-[#B65055]',
};

export default function TripCard({ trip, onEdit, onCancel, onComplete }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-[24px] border border-[#E9E2EC] bg-white/90 p-5 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.25)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#2E2331]">{trip.id}</p>
          <p className="mt-1 text-sm text-[#6F6873]">{trip.source} → {trip.destination}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[trip.status]}`}>
          {trip.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-[#4B3348] sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Vehicle</p>
          <p className="mt-1 font-semibold">{trip.vehicleName}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Driver</p>
          <p className="mt-1 font-semibold">{trip.driverName}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">Route</p>
          <p className="mt-1 font-semibold">{trip.distance} km</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">ETA</p>
          <p className="mt-1 font-semibold">{trip.duration}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2 text-sm font-medium text-[#4B3348] transition hover:border-[#DCCFD9]"
        >
          <Edit3 size={14} />
          Edit
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-full border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2 text-sm font-medium text-[#4B3348] transition hover:border-[#DCCFD9]"
        >
          <XCircle size={14} />
          Cancel
        </button>
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 rounded-full bg-[#5D3F58] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#4B3348]"
        >
          <CheckCircle2 size={14} />
          Complete
        </button>
      </div>
    </motion.article>
  );
}
