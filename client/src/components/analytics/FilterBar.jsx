import React, { useState } from 'react';
import { FILTER_OPTIONS } from '../../data/analyticsData';
import { Filter, X, RotateCcw } from 'lucide-react';

const selectStyle = (focused) => ({
  background: focused ? '#FFFFFF' : '#F9F6FB',
  border: `1.5px solid ${focused ? '#5D3F58' : '#E8DFF0'}`,
  color: '#2E1F38',
  borderRadius: '12px',
  padding: '8px 12px',
  fontSize: '13px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: '500',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxShadow: focused ? '0 0 0 3px rgba(93,63,88,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
  appearance: 'none',
  paddingRight: '32px',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239B8FA8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
});

function SelectFilter({ label, filterKey, value, options, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{
        fontSize: '10px',
        fontWeight: '700',
        color: '#9B8FA8',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontFamily: 'Inter, sans-serif',
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(filterKey, e.target.value)}
        style={selectStyle(focused)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'All');

  const filterDefs = [
    { key: 'vehicleType', label: 'Vehicle', options: FILTER_OPTIONS.vehicleTypes },
    { key: 'driver', label: 'Driver', options: FILTER_OPTIONS.drivers },
    { key: 'region', label: 'Route / Region', options: FILTER_OPTIONS.regions },
    { key: 'tripStatus', label: 'Trip Status', options: FILTER_OPTIONS.tripStatuses },
  ];

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EFE8F4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      padding: '16px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'flex-end',
    }}>
      {/* Filter label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '2px', flexShrink: 0 }}>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '9px',
          background: 'linear-gradient(135deg, #5D3F58, #8B5CF6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Filter size={14} color="#FFFFFF" />
        </div>
        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          color: '#2E1F38',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}>Filters</span>
      </div>

      {/* Divider */}
      <div style={{
        width: '1px',
        height: '36px',
        background: '#EFE8F4',
        flexShrink: 0,
        alignSelf: 'center',
      }} />

      {/* Filters */}
      {filterDefs.map(({ key, label, options }) => (
        <SelectFilter
          key={key}
          label={label}
          filterKey={key}
          value={filters[key]}
          options={options}
          onChange={handleChange}
        />
      ))}

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={() => setFilters({ month: 'All', vehicleType: 'All', region: 'All', driver: 'All', tripStatus: 'All' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 14px',
            borderRadius: '12px',
            background: 'rgba(93,63,88,0.06)',
            border: '1.5px solid rgba(93,63,88,0.15)',
            color: '#5D3F58',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            alignSelf: 'flex-end',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(93,63,88,0.12)';
            e.currentTarget.style.borderColor = 'rgba(93,63,88,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(93,63,88,0.06)';
            e.currentTarget.style.borderColor = 'rgba(93,63,88,0.15)';
          }}
        >
          <RotateCcw size={12} />
          Reset
        </button>
      )}
    </div>
  );
}
