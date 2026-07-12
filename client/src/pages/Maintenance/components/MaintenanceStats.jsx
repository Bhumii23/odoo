import React from 'react';
import { motion } from 'framer-motion';

export default function MaintenanceStats({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-4 md:grid-cols-3 text-left"
    >
      {[
        { title: 'In Shop Currently', value: stats.inShop, color: 'text-rose-600' },
        { title: 'Completed Services', value: stats.completed, color: 'text-emerald-600' },
        { title: 'Total Expenses', value: `₹ ${stats.totalExpenses.toLocaleString('en-IN')}`, color: 'text-slate-800' }
      ].map((card, i) => (
        <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-shadow duration-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">{card.title}</span>
          <span className={`text-2xl font-bold ${card.color} block`}>{card.value}</span>
        </div>
      ))}
    </motion.div>
  );
}
