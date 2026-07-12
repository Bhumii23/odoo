import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { maintenanceCostData } from '../../data/analyticsData';

export default function MaintenanceChart() {
  const formatYAxis = (tick) => {
    return `₹${tick / 1000}k`;
  };

  return (
    <div className="bg-[#1E293B] border border-slate-800/80 p-5 rounded-lg text-left h-[320px] flex flex-col">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 shrink-0">
        Maintenance Cost Trend
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={maintenanceCostData}
            margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
          >
            {/* Gradient definition for filled Area */}
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#714B67" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#714B67" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Cost']}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '6px',
                color: '#F8FAFC',
                fontSize: '11px',
              }}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#714B67" // TransitOps primary brand color
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
