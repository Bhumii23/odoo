import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { fuelEfficiencyData } from '../../data/analyticsData';
import { Gauge } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1A1024',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ fontSize: '10px', color: '#A99BB8', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </div>
        <div style={{ fontSize: '18px', fontWeight: '800', color: '#F59E0B', letterSpacing: '-0.3px' }}>
          {payload[0].value} <span style={{ fontSize: '12px', fontWeight: '500', color: '#C4B5D4' }}>km/L</span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, value } = props;
  return (
    <circle cx={cx} cy={cy} r={4} fill="#F59E0B" stroke="#FFFFFF" strokeWidth={2} />
  );
};

export default function FuelEfficiencyChart() {
  const latest = fuelEfficiencyData[fuelEfficiencyData.length - 1]?.efficiency;
  const first = fuelEfficiencyData[0]?.efficiency;
  const change = ((latest - first) / first * 100).toFixed(1);

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EFE8F4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      padding: '24px',
      height: '320px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #D97706, #F59E0B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Gauge size={14} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              Fleet Utilization
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>Fuel efficiency trend (km/L)</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#1A1024', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>
            {latest} <span style={{ fontSize: '13px', color: '#9B8FA8', fontWeight: '500' }}>km/L</span>
          </div>
          <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>
            ↑ +{change}% since Jan
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fuelEfficiencyData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <defs>
              <linearGradient id="fuelLineGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FCD34D" />
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
              domain={[7, 9.5]}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={8} stroke="#EFE8F4" strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#F59E0B"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 7, fill: '#F59E0B', stroke: '#FFFFFF', strokeWidth: 2.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
