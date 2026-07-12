import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KPICard({ title, value, change, isPositive, icon: Icon }) {
  return (
    <div className="bg-[#1E293B] border border-slate-800/80 p-4.5 rounded-lg text-left">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-1 rounded-md bg-slate-900 border border-slate-800/50 text-slate-400">
            <Icon size={14} />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold text-slate-100 tracking-tight">
          {value}
        </span>
        
        {change && (
          <div className="flex items-center space-x-1 mt-1.5">
            <span className={`inline-flex items-center text-[10px] font-semibold ${
              isPositive ? 'text-emerald-500' : 'text-rose-500'
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
