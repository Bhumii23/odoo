import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = ['Draft', 'Dispatched', 'Completed', 'Cancelled'];

export default function TripStepper({ currentStatus }) {
  const activeIndex = steps.indexOf(currentStatus);

  return (
    <div className="rounded-[24px] border border-[#E9E2EC] bg-white/90 p-5 shadow-[0_16px_46px_-30px_rgba(93,63,88,0.24)]">
      <div className="flex flex-wrap items-center gap-3">
        {steps.map((step, index) => {
          const isComplete = index < activeIndex;
          const isActive = index === activeIndex;
          const isCancelled = step === 'Cancelled' && currentStatus === 'Cancelled';

          return (
            <div key={step} className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{ scale: isActive || isComplete ? 1 : 0.94 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                  isCancelled
                    ? 'border-[#C96F70] bg-[#FDECEC] text-[#B65055]'
                    : isComplete || isActive
                      ? 'border-[#5D3F58] bg-[#5D3F58] text-white'
                      : 'border-[#E9E2EC] bg-[#F8F4F8] text-[#7A7180]'
                }`}
              >
                {isComplete ? <Check size={16} /> : index + 1}
              </motion.div>
              <span className={`text-sm font-medium ${isActive ? 'text-[#2E2331]' : 'text-[#7A7180]'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <div className="ml-1 h-px w-6 bg-[#E9E2EC]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
