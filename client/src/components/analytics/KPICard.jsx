import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KPICard({ title, value, change, isPositive, icon: Icon }) {
  return (
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] p-4.5 rounded-[24px] text-left shadow-[0_16px_40px_-24px_rgba(76,54,97,0.28)] backdrop-blur">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-1.5 rounded-2xl bg-[#f4ecf8] border border-[#e7d9e8] text-[#7c5a9f]">
            <Icon size={14} />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold text-slate-800 tracking-tight">
          {value}
        </span>

        {change && (
          <div className="flex items-center space-x-1 mt-1.5">
            <span className={`inline-flex items-center text-[10px] font-semibold ${
              isPositive ? 'text-emerald-600' : 'text-rose-500'
            }`}>
              {isPositive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
              {change}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
