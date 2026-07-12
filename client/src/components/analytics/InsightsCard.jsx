import React from 'react';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const insights = [
  {
    type: 'positive',
    icon: TrendingUp,
    title: 'Revenue up 7.5% this month',
    desc: 'July revenue hit ₹7.2L — highest in Q3 so far. Driven by peak Surat–Mumbai route demand.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.07)',
    border: 'rgba(5,150,105,0.15)',
  },
  {
    type: 'positive',
    icon: CheckCircle,
    title: 'Fleet utilization improved',
    desc: 'Utilization climbed to 82.5%, exceeding the 80% target set for Q3 operations.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.07)',
    border: 'rgba(37,99,235,0.15)',
  },
  {
    type: 'warning',
    icon: AlertCircle,
    title: '6 vehicles under maintenance',
    desc: 'VAN-05, TRUCK-11, and 4 others are currently off-road. Expected back by July 15.',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.07)',
    border: 'rgba(217,119,6,0.15)',
  },
  {
    type: 'negative',
    icon: TrendingDown,
    title: 'Operational cost spike in April',
    desc: 'April recorded a ₹72k maintenance peak — 40% above the monthly average.',
    color: '#E11D48',
    bg: 'rgba(225,29,72,0.07)',
    border: 'rgba(225,29,72,0.15)',
  },
];

export default function InsightsCard() {
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
          background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Lightbulb size={16} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
            Recent Insights
          </div>
          <div style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>
            Auto-generated from this period's data
          </div>
        </div>
      </div>

      {/* Insight Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '14px',
                borderRadius: '14px',
                background: item.bg,
                border: `1px solid ${item.border}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${item.border}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '9px',
                background: item.bg,
                border: `1px solid ${item.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={15} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12px', color: '#6B5F78', fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
