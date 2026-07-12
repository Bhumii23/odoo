import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { revenueExpenseData } from '../../data/analyticsData';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1A1024',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '12px 16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        fontFamily: 'Inter, sans-serif',
        minWidth: '160px',
      }}>
        <div style={{ fontSize: '11px', color: '#A99BB8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </div>
        {payload.map((p) => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
              <span style={{ fontSize: '12px', color: '#C4B5D4', fontWeight: '500' }}>{p.name}</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#F0E8F8' }}>
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const totalRevenue = revenueExpenseData.reduce((s, d) => s + d.revenue, 0);

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EFE8F4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      padding: '24px',
      height: '340px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #5D3F58, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={14} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              Revenue Trend
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>Monthly revenue vs expense overview</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#1A1024', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0, notation: 'compact' }).format(totalRevenue)}
          </div>
          <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>↑ Total YTD Revenue</div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueExpenseData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5D3F58" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#5D3F58" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E11D48" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3EEF8" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#C4B5D4"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
              fontWeight={600}
            />
            <YAxis
              stroke="#C4B5D4"
              fontSize={10}
              tickFormatter={(v) => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${v / 1000}k`}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#5D3F58"
              strokeWidth={2.5}
              fill="url(#revGrad)"
              dot={false}
              activeDot={{ r: 6, fill: '#5D3F58', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#E11D48"
              strokeWidth={2}
              fill="url(#expGrad)"
              dot={false}
              activeDot={{ r: 5, fill: '#E11D48', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '12px', flexShrink: 0 }}>
        {[{ color: '#5D3F58', label: 'Revenue' }, { color: '#E11D48', label: 'Expense' }].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '3px', borderRadius: '2px', background: color }} />
            <span style={{ fontSize: '11px', color: '#9B8FA8', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
