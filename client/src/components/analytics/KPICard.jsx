import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function KPICard({ title, value, change, isPositive, icon: Icon, accent, subtitle }) {
  const [hovered, setHovered] = useState(false);

  // Accent color presets
  const accents = {
    purple: {
      iconBg: 'linear-gradient(135deg, #5D3F58 0%, #8B5CF6 100%)',
      iconShadow: '0 8px 20px rgba(93,63,88,0.35)',
      badgeBg: 'rgba(93,63,88,0.08)',
      badgeColor: '#5D3F58',
      glow: 'rgba(93,63,88,0.12)',
    },
    emerald: {
      iconBg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      iconShadow: '0 8px 20px rgba(5,150,105,0.3)',
      badgeBg: 'rgba(5,150,105,0.08)',
      badgeColor: '#059669',
      glow: 'rgba(5,150,105,0.1)',
    },
    blue: {
      iconBg: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
      iconShadow: '0 8px 20px rgba(37,99,235,0.3)',
      badgeBg: 'rgba(37,99,235,0.08)',
      badgeColor: '#2563EB',
      glow: 'rgba(37,99,235,0.1)',
    },
    amber: {
      iconBg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      iconShadow: '0 8px 20px rgba(217,119,6,0.3)',
      badgeBg: 'rgba(217,119,6,0.08)',
      badgeColor: '#D97706',
      glow: 'rgba(217,119,6,0.1)',
    },
    rose: {
      iconBg: 'linear-gradient(135deg, #E11D48 0%, #FB7185 100%)',
      iconShadow: '0 8px 20px rgba(225,29,72,0.3)',
      badgeBg: 'rgba(225,29,72,0.08)',
      badgeColor: '#E11D48',
      glow: 'rgba(225,29,72,0.1)',
    },
    cyan: {
      iconBg: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
      iconShadow: '0 8px 20px rgba(8,145,178,0.3)',
      badgeBg: 'rgba(8,145,178,0.08)',
      badgeColor: '#0891B2',
      glow: 'rgba(8,145,178,0.1)',
    },
  };

  const theme = accents[accent] || accents.purple;

  const changeIsNA = change === 'N/A';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid',
        borderColor: hovered ? 'rgba(93,63,88,0.18)' : 'rgba(239,232,246,0.8)',
        boxShadow: hovered
          ? `0 20px 60px -10px ${theme.glow}, 0 4px 20px rgba(0,0,0,0.06)`
          : '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        padding: '20px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top-right glow orb */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: theme.iconBg,
        opacity: hovered ? 0.08 : 0.04,
        filter: 'blur(20px)',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />

      {/* Header: Icon + Change Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        {/* Icon */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: theme.iconBg,
          boxShadow: theme.iconShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {Icon && <Icon size={18} color="#FFFFFF" strokeWidth={2} />}
        </div>

        {/* Change badge */}
        {!changeIsNA && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            padding: '3px 8px',
            borderRadius: '999px',
            background: isPositive ? 'rgba(5,150,105,0.08)' : 'rgba(225,29,72,0.08)',
            border: `1px solid ${isPositive ? 'rgba(5,150,105,0.15)' : 'rgba(225,29,72,0.15)'}`,
          }}>
            {isPositive
              ? <ArrowUpRight size={11} color="#059669" strokeWidth={2.5} />
              : <ArrowDownRight size={11} color="#E11D48" strokeWidth={2.5} />
            }
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              color: isPositive ? '#059669' : '#E11D48',
              fontFamily: 'Inter, sans-serif',
            }}>{change}</span>
          </div>
        )}
        {changeIsNA && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            padding: '3px 8px',
            borderRadius: '999px',
            background: 'rgba(107,114,128,0.06)',
            border: '1px solid rgba(107,114,128,0.12)',
          }}>
            <Minus size={10} color="#9CA3AF" />
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>N/A</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{
        fontSize: '26px',
        fontWeight: '800',
        color: '#1A1024',
        letterSpacing: '-0.5px',
        lineHeight: '1',
        marginBottom: '6px',
        fontFamily: 'Inter, sans-serif',
      }}>
        {value}
      </div>

      {/* Title */}
      <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: '#6B5F78',
        letterSpacing: '0.02em',
        fontFamily: 'Inter, sans-serif',
      }}>
        {title}
      </div>

      {/* Subtitle / vs label */}
      {subtitle && (
        <div style={{
          fontSize: '10.5px',
          color: '#A99BB8',
          marginTop: '4px',
          fontFamily: 'Inter, sans-serif',
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
