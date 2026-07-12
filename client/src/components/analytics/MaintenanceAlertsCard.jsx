import React from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

const alerts = [
  {
    vehicle: 'VAN-05',
    issue: 'Oil change overdue — 12,400 km logged since last service',
    urgency: 'critical',
    eta: 'Overdue',
  },
  {
    vehicle: 'TRUCK-11',
    issue: 'Brake pads inspection required at next scheduled stop',
    urgency: 'warning',
    eta: 'Due in 3 days',
  },
  {
    vehicle: 'MINI-03',
    issue: 'Tire pressure below optimal — recommended check before dispatch',
    urgency: 'warning',
    eta: 'Due today',
  },
  {
    vehicle: 'VAN-09',
    issue: 'Scheduled quarterly service completed successfully',
    urgency: 'ok',
    eta: 'Completed',
  },
];

const urgencyConfig = {
  critical: { color: '#E11D48', bg: 'rgba(225,29,72,0.07)', border: 'rgba(225,29,72,0.15)', icon: AlertTriangle },
  warning: { color: '#D97706', bg: 'rgba(217,119,6,0.07)', border: 'rgba(217,119,6,0.15)', icon: Clock },
  ok: { color: '#059669', bg: 'rgba(5,150,105,0.07)', border: 'rgba(5,150,105,0.15)', icon: CheckCircle2 },
};

export default function MaintenanceAlertsCard() {
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
          background: 'linear-gradient(135deg, #E11D48, #FB7185)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Wrench size={16} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
            Maintenance Alerts
          </div>
          <div style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>
            {alerts.filter(a => a.urgency !== 'ok').length} vehicles need attention
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          width: '22px', height: '22px',
          borderRadius: '50%',
          background: 'rgba(225,29,72,0.12)',
          border: '1px solid rgba(225,29,72,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px',
          fontWeight: '800',
          color: '#E11D48',
          fontFamily: 'Inter, sans-serif',
        }}>
          {alerts.filter(a => a.urgency !== 'ok').length}
        </div>
      </div>

      {/* Alert Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map((alert, i) => {
          const cfg = urgencyConfig[alert.urgency];
          const Icon = cfg.icon;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '13px',
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                transition: 'transform 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={14} color={cfg.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{
                    fontSize: '12px', fontWeight: '700', color: '#1A1024',
                    fontFamily: 'Inter, sans-serif',
                    background: 'rgba(93,63,88,0.06)',
                    padding: '1px 7px', borderRadius: '5px',
                  }}>
                    {alert.vehicle}
                  </span>
                  <span style={{
                    fontSize: '10px', fontWeight: '700', color: cfg.color,
                    fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {alert.eta}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#6B5F78', fontFamily: 'Inter, sans-serif', lineHeight: '1.45' }}>
                  {alert.issue}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
