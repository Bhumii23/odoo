import React from 'react';

export default function DriverStatusBadge({ status }) {
  const getBadgeClass = (statusState) => {
    switch (statusState) {
      case 'Available':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
      case 'On Trip':
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/25';
      case 'Off Duty':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
      case 'Suspended':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/25';
    }
  };

  return (
    <span className={`inline-flex px-2.5 py-0.5 text-[9px] font-semibold rounded uppercase tracking-wider ${getBadgeClass(status)}`}>
      {status}
    </span>
  );
}
