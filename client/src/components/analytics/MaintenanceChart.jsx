import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { maintenanceCostData } from '../../data/analyticsData';
import { Fuel } from 'lucide-react';

// Repurpose maintenance data as fuel cost per vehicle (rename months to vehicles)
const fuelCostByVehicle = maintenanceCostData.map((d, i) => ({
  vehicle: ['VAN-05', 'TRUCK-11', 'MINI-03', 'VAN-09', 'TRUCK-02', 'VAN-07', 'MINI-01'][i] || d.name,
  cost: d.cost,
}));

const COLORS = ['#5D3F58', '#7B5EA7', '#9B8CC4', '#B8A8D8', '#C4B5D4', '#D4CAE8', '#E8E2F0'];

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
        <div style={{ fontSize: '10px', color: '#9B8FA8', marginTop: '2px' }}>Fuel Cost</div>
      </div>
    );
  }
  return null;
};

export default function MaintenanceChart() {
  const maxCost = Math.max(...fuelCostByVehicle.map(d => d.cost));

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
              background: 'linear-gradient(135deg, #5D3F58, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Fuel size={14} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              Fuel Cost by Vehicle
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>Monthly fuel expenditure per vehicle</p>
        </div>
        <div style={{
          padding: '4px 10px',
          borderRadius: '999px',
          background: 'rgba(93,63,88,0.08)',
          border: '1px solid rgba(93,63,88,0.15)',
          fontSize: '11px',
          fontWeight: '700',
          color: '#5D3F58',
          fontFamily: 'Inter, sans-serif',
        }}>
          ₹{(fuelCostByVehicle.reduce((s, d) => s + d.cost, 0) / 1000).toFixed(0)}k Total
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fuelCostByVehicle} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3EEF8" vertical={false} />
            <XAxis
              dataKey="vehicle"
              stroke="#C4B5D4"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
              fontWeight={600}
            />
            <YAxis
              stroke="#C4B5D4"
              fontSize={10}
              tickFormatter={(v) => `₹${v / 1000}k`}
              tickLine={false}
              axisLine={false}
              fontFamily="Inter, sans-serif"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(93,63,88,0.04)', radius: 8 }} />
            <Bar dataKey="cost" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {fuelCostByVehicle.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.cost === maxCost ? '#5D3F58' : COLORS[index] || '#C4B5D4'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
