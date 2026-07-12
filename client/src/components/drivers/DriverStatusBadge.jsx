import React from 'react';

export default function DriverStatusBadge({ status, licenseExpiry }) {
  const getBadgeClass = (statusState, expiryDate) => {
    const parsedExpiry = new Date(expiryDate);
    const isExpired = !Number.isNaN(parsedExpiry.getTime()) && parsedExpiry < new Date(new Date().setHours(0, 0, 0, 0));

    if (isExpired) {
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    }

    switch (statusState) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'On Trip':
        return 'bg-sky-100 text-sky-700 border border-sky-200';
      case 'Off Duty':
        return 'bg-slate-100 text-slate-700 border border-slate-200';
      case 'Suspended':
        return 'bg-rose-100 text-rose-700 border border-rose-200';
      default:
        return 'bg-[#F4EAF5] text-[#5D3F58] border border-[#E9E2EC]';
    }
  };

  const label = licenseExpiry && new Date(licenseExpiry) < new Date(new Date().setHours(0, 0, 0, 0)) ? 'Expired License' : status;

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${getBadgeClass(status, licenseExpiry)}`}>
      {label}
    </span>
  );
}
