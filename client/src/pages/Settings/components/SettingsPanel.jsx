import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsPanel({ title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-[#E9E2EC] bg-[#FCFAFD] p-4"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#2E2331]">{title}</h3>
        {description ? <p className="mt-1 text-sm text-[#6F6873]">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}
