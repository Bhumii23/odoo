import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fleetStatusData } from '../../data/analyticsData';
import { Car } from 'lucide-react';

// Transform fleet data for a horizontal "top costliest vehicles" bar chart
const topVehiclesData = [
  { vehicle: 'TRUCK-11', cost: 72000 },
  { vehicle: 'TRUCK-02', cost: 65000 },
  { vehicle: 'VAN-05', cost: 58000 },
  { vehicle: 'VAN-09', cost: 51000 },
  { vehicle: 'MINI-03', cost: 48000 },
].sort((a, b) => b.cost - a.cost);

const COLORS = ['#5D3F58', '#7B5EA7', '#9B8CC4', '#B8A8D8', '#D4CAE8'];

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
        <div style={{ fontSize: '11px', color: '#A99BB8', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '16px', fontWeight: '800', color: '#F0E8F8' }}>
          ₹{payload[0].value.toLocaleString('en-IN')}
        </div>
      </div>
    );
  }
  return null;
};

export default function FleetPieChart() {
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
              background: 'linear-gradient(135deg, #E11D48, #FB7185)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Car size={14} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              Top Costliest Vehicles
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>Ranked by total operational cost</p>
        </div>
        <div style={{
          padding: '4px 10px',
          borderRadius: '999px',
          background: 'rgba(225,29,72,0.07)',
          border: '1px solid rgba(225,29,72,0.15)',
          fontSize: '11px',
          fontWeight: '700',
          color: '#E11D48',
          fontFamily: 'Inter, sans-serif',
        }}>
          Top 5
        </div>
      </div>

      {/* Horizontal Bar Chart rendered as vertical BarChart with layout="vertical" */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={topVehiclesData}
            margin={{ top: 0, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F3EEF8" horizontal={false} />
            <XAxis
              type="number"
              stroke="#C4B5D4"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <YAxis
              type="category"
              dataKey="vehicle"
              stroke="#C4B5D4"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(93,63,88,0.04)' }} />
            <Bar dataKey="cost" radius={[0, 6, 6, 0]} maxBarSize={20}>
              {topVehiclesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index] || '#C4B5D4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
