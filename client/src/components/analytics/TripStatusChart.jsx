import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { tripStatusData } from '../../data/analyticsData';
import { Map } from 'lucide-react';

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    const total = tripStatusData.reduce((s, d) => s + d.value, 0);
    return (
      <div style={{
        background: '#1A1024',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
          <span style={{ fontSize: '11px', color: '#A99BB8', fontWeight: '600' }}>{name}</span>
        </div>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#F0E8F8' }}>{value}</div>
        <div style={{ fontSize: '10px', color: '#9B8FA8' }}>{((value / total) * 100).toFixed(1)}% of total</div>
      </div>
    );
  }
  return null;
};

export default function TripStatusChart() {
  const total = tripStatusData.reduce((s, d) => s + d.value, 0);
  const completed = tripStatusData.find(d => d.name === 'Completed');

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
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px', flexShrink: 0 }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #059669, #10B981)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Map size={14} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
            Trip Status
          </div>
          <p style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>Distribution across {total} total trips</p>
        </div>
      </div>

      {/* Chart + Center Label */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={tripStatusData}
              cx="50%"
              cy="48%"
              innerRadius={52}
              outerRadius={74}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {tripStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#1A1024', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>
            {total}
          </div>
          <div style={{ fontSize: '9px', color: '#9B8FA8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Trips
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', flexShrink: 0, marginTop: '4px' }}>
        {tripStatusData.map((d) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: '#6B5F78', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              {d.name} <span style={{ color: '#9B8FA8' }}>({d.value})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
