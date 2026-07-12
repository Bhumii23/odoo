import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

const recommendations = [
  {
    priority: 'high',
    title: 'Reassign 3 idle vans on North routes',
    desc: 'VAN-07, VAN-12, VAN-14 have been idle for >48 hrs. Reassigning to North corridor could improve utilization by ~6%.',
    tag: 'Fleet Optimization',
    tagColor: '#5D3F58',
    tagBg: 'rgba(93,63,88,0.08)',
  },
  {
    priority: 'medium',
    title: 'Schedule preventive maintenance for TRUCK-11',
    desc: 'TRUCK-11 has logged 8,200 km since last service. Preventive check before the 10,000 km mark is recommended.',
    tag: 'Maintenance',
    tagColor: '#D97706',
    tagBg: 'rgba(217,119,6,0.08)',
  },
  {
    priority: 'low',
    title: 'Review fuel card spending for Raven K.',
    desc: 'Fuel costs for Raven K. are 18% above the driver average. A route efficiency review could identify savings.',
    tag: 'Cost Savings',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
  },
];

const priorityDot = {
  high: '#E11D48',
  medium: '#D97706',
  low: '#059669',
};

export default function AIRecommendationsCard() {
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
          <Sparkles size={16} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
            AI Recommendations
          </div>
          <div style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>
            Actionable suggestions based on fleet data
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          padding: '3px 9px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, rgba(93,63,88,0.1), rgba(139,92,246,0.1))',
          border: '1px solid rgba(93,63,88,0.15)',
          fontSize: '10px',
          fontWeight: '700',
          color: '#5D3F58',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          {recommendations.length} actions
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recommendations.map((rec, i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              borderRadius: '14px',
              background: '#FAFAFE',
              border: '1px solid #EEE8F5',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#F8F4FD';
              e.currentTarget.style.borderColor = 'rgba(93,63,88,0.2)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(93,63,88,0.08)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FAFAFE';
              e.currentTarget.style.borderColor = '#EEE8F5';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Priority dot + tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: priorityDot[rec.priority],
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: rec.tagColor,
                fontFamily: 'Inter, sans-serif',
                background: rec.tagBg,
                padding: '2px 8px',
                borderRadius: '999px',
              }}>
                {rec.tag}
              </span>
              <ChevronRight
                size={14}
                color="#C4B5D4"
                style={{ marginLeft: 'auto' }}
              />
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif', marginBottom: '5px' }}>
              {rec.title}
            </div>
            <div style={{ fontSize: '12px', color: '#6B5F78', fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
              {rec.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
