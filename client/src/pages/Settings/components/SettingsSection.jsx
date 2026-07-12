import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function SettingsSection({ id, title, description, isOpen, onToggle, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[28px] border border-[#E9E2EC] bg-white/90 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]"
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div>
          <p className="text-lg font-semibold text-[#2E2331]">{title}</p>
          <p className="mt-1 text-sm text-[#6F6873]">{description}</p>
        </div>
        <div className={`rounded-full border border-[#E9E2EC] bg-[#FCFAFD] p-2 text-[#5D3F58] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#E9E2EC]"
          >
            <div className="space-y-5 px-5 py-5">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
