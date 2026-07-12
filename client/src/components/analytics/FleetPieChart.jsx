import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fleetStatusData } from '../../data/analyticsData';

export default function FleetPieChart() {
  return (
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] p-5 rounded-[24px] text-left h-[320px] flex flex-col shadow-[0_16px_44px_-24px_rgba(76,54,97,0.28)] backdrop-blur">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 shrink-0">
        Fleet Status Distribution
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={fleetStatusData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {fleetStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '6px',
                color: '#F8FAFC',
                fontSize: '11px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={10}
              iconType="circle"
              wrapperStyle={{
                fontSize: '11px',
                color: '#94A3B8',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
