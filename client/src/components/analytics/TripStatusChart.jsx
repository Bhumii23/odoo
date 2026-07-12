import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { tripStatusData } from '../../data/analyticsData';

export default function TripStatusChart() {
  return (
    <div className="bg-[#1E293B] border border-slate-800/80 p-5 rounded-lg text-left h-[320px] flex flex-col">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 shrink-0">
        Trip Status Distribution
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={tripStatusData}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {tripStatusData.map((entry, index) => (
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
