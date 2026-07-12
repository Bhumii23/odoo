import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { revenueExpenseData } from '../../data/analyticsData';

export default function RevenueChart() {
  // Formats currency numbers into clean shorthand (e.g. ₹4.5L or ₹450k)
  const formatYAxis = (tick) => {
    if (tick >= 100000) {
      return `₹${(tick / 100000).toFixed(1)}L`;
    }
    return `₹${tick / 1000}`;
  };

  // Formats currency inside tooltips
  const formatTooltip = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-[#1E293B] border border-slate-800/80 p-5 rounded-lg text-left h-[320px] flex flex-col">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 shrink-0">
        Revenue vs Expense Compare
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueExpenseData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748B" 
              fontSize={10}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={10} 
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '6px',
                color: '#F8FAFC',
                fontSize: '11px',
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              iconSize={8}
              iconType="square"
              wrapperStyle={{
                fontSize: '11px',
                paddingBottom: '10px',
              }}
            />
            <Bar dataKey="revenue" fill="#10B981" name="Revenue" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="expense" fill="#EF4444" name="Expense" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
