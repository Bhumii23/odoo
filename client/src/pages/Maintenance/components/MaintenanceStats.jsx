import React from 'react';
import { motion } from 'framer-motion';

export default function MaintenanceStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-[24px] border border-[#E9E2EC] bg-white/90 p-5 shadow-[0_18px_48px_-28px_rgba(93,63,88,0.28)]"
        >
          <p className="text-sm font-medium text-[#7A7180]">{card.title}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-3xl font-semibold text-[#2E2331]">{card.value}</span>
            <span className="text-xs font-semibold text-[#5D3F58]">{card.detail}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
