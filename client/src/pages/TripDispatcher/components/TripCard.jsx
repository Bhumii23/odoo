import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, XCircle, CheckCircle2 } from 'lucide-react';

const statusClasses = {
  Draft: 'bg-slate-50 text-slate-600 border border-slate-100',
  Dispatched: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Completed: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  Cancelled: 'bg-rose-50 text-rose-700 border border-rose-100',
};

export default function TripCard({ trip, onEdit, onCancel, onComplete, permission }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] text-left"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-400 font-mono">{trip.id}</p>
          <p className="mt-1 text-sm font-bold text-slate-800">{trip.source} → {trip.destination}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClasses[trip.status]}`}>
          {trip.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-xs text-slate-600 sm:grid-cols-2">
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">Vehicle</p>
          <p className="mt-1 font-bold text-slate-700">{trip.vehicleName}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">Driver</p>
          <p className="mt-1 font-bold text-slate-700">{trip.driverName}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">Route</p>
          <p className="mt-1 font-bold text-slate-700">{trip.distance} km</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">ETA</p>
          <p className="mt-1 font-bold text-slate-700">{trip.duration}</p>
        </div>
      </div>

      {permission === 'edit' && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
          >
            <Edit3 size={12} />
            Edit
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2 text-xs font-bold text-slate-650 transition hover:bg-slate-50 hover:text-rose-600 hover:border-rose-100 cursor-pointer"
          >
            <XCircle size={12} />
            Cancel
          </button>
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#7c5a9f] hover:opacity-95 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5 cursor-pointer"
          >
            <CheckCircle2 size={12} />
            Complete
          </button>
        </div>
      )}
    </motion.article>
  );
}
