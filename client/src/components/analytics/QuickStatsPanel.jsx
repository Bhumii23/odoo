import React from 'react';
import { BarChart2, Route, Clock, Fuel, MapPin, Users } from 'lucide-react';

const stats = [
  { icon: Route, label: 'Total Distance', value: '48,240 km', sub: 'This month', color: '#5D3F58', bg: 'rgba(93,63,88,0.08)' },
  { icon: Clock, label: 'Avg Trip Duration', value: '3h 42m', sub: 'Per trip', color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
  { icon: Fuel, label: 'Total Fuel Used', value: '5,820 L', sub: 'Across all vehicles', color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  { icon: MapPin, label: 'Routes Covered', value: '24', sub: 'Active corridors', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  { icon: Users, label: 'Drivers Active', value: '15', sub: 'On duty now', color: '#0891B2', bg: 'rgba(8,145,178,0.08)' },
  { icon: BarChart2, label: 'Avg Daily Trips', value: '6.2', sub: 'Per active vehicle', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
];

export default function QuickStatsPanel() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EFE8F4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #5D3F58, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BarChart2 size={16} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
            Quick Statistics
          </div>
          <div style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>
            Snapshot of fleet operations
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
      }}>
        {stats.map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div
            key={label}
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: bg,
              border: `1px solid ${bg.replace('0.08)', '0.18)')}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${bg.replace('0.08)', '0.2)')}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
              <Icon size={13} color={color} strokeWidth={2} />
              <span style={{
                fontSize: '10px', fontWeight: '700', color: color,
                fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {label}
              </span>
            </div>
            <div style={{
              fontSize: '20px', fontWeight: '800', color: '#1A1024',
              fontFamily: 'Inter, sans-serif', letterSpacing: '-0.4px', lineHeight: 1,
            }}>
              {value}
            </div>
            <div style={{ fontSize: '10px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif', marginTop: '4px' }}>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
