import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fuelEfficiencyData } from '../../data/analyticsData';

export default function FuelEfficiencyChart() {
  return (
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] p-5 rounded-[24px] text-left h-[320px] flex flex-col shadow-[0_16px_44px_-24px_rgba(76,54,97,0.28)] backdrop-blur">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 shrink-0">
        Fuel Efficiency Trend (km/L)
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={fuelEfficiencyData}
            margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
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
              domain={[6, 10]}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value} km/L`, 'Efficiency']}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '6px',
                color: '#F8FAFC',
                fontSize: '11px',
              }}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#F59E0B" // amber-500
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1, fill: '#0F172A' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
