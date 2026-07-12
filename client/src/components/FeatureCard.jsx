import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex items-start p-5 rounded-2xl bg-white/75 border border-brand-border/60 shadow-[0_8px_24px_rgba(46,35,49,0.02)] backdrop-blur-md hover:border-brand-primary/20 hover:shadow-[0_12px_32px_rgba(93,63,88,0.06)] transition-all duration-300"
    >
      <div className="flex-shrink-0 p-3 rounded-2xl bg-brand-primary/10 text-brand-primary mr-4 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-brand-text mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-brand-muted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
