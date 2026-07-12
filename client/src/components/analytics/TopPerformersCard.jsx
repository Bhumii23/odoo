import React from 'react';
import { Award, User, Star, MapPin, Zap } from 'lucide-react';

export default function TopPerformersCard() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EFE8F4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #D97706, #F59E0B)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Award size={16} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
            Top Performers
          </div>
          <div style={{ fontSize: '11px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif' }}>This month's best performers</div>
        </div>
      </div>

      {/* Top Vehicle */}
      <div style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(93,63,88,0.06) 0%, rgba(139,92,246,0.06) 100%)',
        border: '1px solid rgba(93,63,88,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #5D3F58, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={16} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#9B8FA8', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Inter, sans-serif' }}>
              Top Vehicle
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              TRUCK-11
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={11} color="#F59E0B" fill={s <= 5 ? '#F59E0B' : 'none'} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: 'Total Trips', value: '42' },
            { label: 'Avg Efficiency', value: '9.1 km/L' },
            { label: 'Revenue', value: '₹2.8L' },
            { label: 'Uptime', value: '96.4%' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: '8px 10px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(93,63,88,0.08)',
            }}>
              <div style={{ fontSize: '10px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Active Driver */}
      <div style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(16,185,129,0.06) 100%)',
        border: '1px solid rgba(5,150,105,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #059669, #10B981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={16} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#9B8FA8', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Inter, sans-serif' }}>
              Most Active Driver
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>
              Sarah M.
            </div>
          </div>
          <div style={{
            marginLeft: 'auto',
            padding: '3px 9px',
            borderRadius: '999px',
            background: 'rgba(5,150,105,0.1)',
            border: '1px solid rgba(5,150,105,0.2)',
            fontSize: '11px',
            fontWeight: '700',
            color: '#059669',
            fontFamily: 'Inter, sans-serif',
          }}>
            #1 Rank
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: 'Trips Completed', value: '38' },
            { label: 'Distance Covered', value: '4,200 km' },
            { label: 'On-Time Rate', value: '97.3%' },
            { label: 'Rating', value: '4.9 / 5' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: '8px 10px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(5,150,105,0.08)',
            }}>
              <div style={{ fontSize: '10px', color: '#9B8FA8', fontFamily: 'Inter, sans-serif', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1024', fontFamily: 'Inter, sans-serif' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
