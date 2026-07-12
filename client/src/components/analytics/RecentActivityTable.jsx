import React, { useState } from 'react';
import { recentActivityData } from '../../data/analyticsData';
import { Clock, CheckCircle, XCircle, FileText, Navigation } from 'lucide-react';

const statusConfig = {
  Completed: { bg: 'rgba(5,150,105,0.08)', color: '#059669', border: 'rgba(5,150,105,0.2)', icon: CheckCircle },
  Dispatched: { bg: 'rgba(37,99,235,0.08)', color: '#2563EB', border: 'rgba(37,99,235,0.2)', icon: Navigation },
  Draft: { bg: 'rgba(107,114,128,0.08)', color: '#6B7280', border: 'rgba(107,114,128,0.2)', icon: FileText },
  Cancelled: { bg: 'rgba(225,29,72,0.08)', color: '#E11D48', border: 'rgba(225,29,72,0.2)', icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.Draft;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 10px',
      borderRadius: '999px',
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      color: cfg.color,
      fontSize: '11px',
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      whiteSpace: 'nowrap',
    }}>
      <Icon size={10} strokeWidth={2.5} />
      {status}
    </span>
  );
}

export default function RecentActivityTable() {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EFE8F4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      {/* Table Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #F3EEF8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0891B2, #22D3EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Clock size={14} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              Recent Trip Activity
            </div>
            <div style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>
              Latest {recentActivityData.length} trips across all routes
            </div>
          </div>
        </div>
        <div style={{
          padding: '5px 12px',
          borderRadius: '999px',
          background: 'rgba(8,145,178,0.07)',
          border: '1px solid rgba(8,145,178,0.15)',
          fontSize: '11px',
          fontWeight: '700',
          color: '#0891B2',
          fontFamily: 'Inter, sans-serif',
        }}>
          Live
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{
              background: '#FDFAFFF',
              borderBottom: '1px solid #F3EEF8',
            }}>
              {['Vehicle', 'Driver', 'Route', 'Distance', 'Fuel', 'Cost', 'Status', 'Date'].map((col, i) => (
                <th key={col} style={{
                  padding: '10px 20px',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#A99BB8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  textAlign: i >= 3 && i <= 5 ? 'right' : i === 6 ? 'center' : 'left',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                  background: '#FAFAFE',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentActivityData.map((activity, idx) => (
              <tr
                key={activity.id}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  borderBottom: idx < recentActivityData.length - 1 ? '1px solid #F8F4FC' : 'none',
                  background: hoveredRow === idx ? '#FDFBFF' : 'transparent',
                  transition: 'background 0.15s ease',
                  cursor: 'default',
                }}
              >
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontFamily: '"JetBrains Mono", "Courier New", monospace',
                    fontWeight: '600',
                    color: '#2E1F38',
                    background: 'rgba(93,63,88,0.06)',
                    padding: '2px 7px',
                    borderRadius: '6px',
                  }}>
                    {activity.vehicle}
                  </span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#2E1F38', fontFamily: 'Inter, sans-serif' }}>
                    {activity.driver}
                  </div>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontSize: '12px', color: '#6B5F78', fontFamily: 'Inter, sans-serif' }}>
                    {activity.trip}
                  </div>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', fontFamily: 'Inter, sans-serif' }}>
                    {activity.distance}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
                    {activity.fuel}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
                    {activity.cost}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                  <StatusBadge status={activity.status} />
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '11px', color: '#A99BB8', fontFamily: 'Inter, sans-serif' }}>
                    {activity.date}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
