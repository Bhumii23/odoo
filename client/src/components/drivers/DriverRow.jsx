import React from 'react';
import DriverStatusBadge from './DriverStatusBadge';
import DriverActions from './DriverActions';

export default function DriverRow({ driver, onEdit, onDelete, isEven }) {
  const getSafetyScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-amber-600';
    return 'text-rose-500';
  };

  const initials = driver.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr className={`transition-all duration-200 hover:bg-[#f8f6f9] ${isEven ? 'bg-[#fcfbfe]' : 'bg-white'}`}>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#efe7ff] to-[#f5f3ff] text-sm font-semibold text-[#6d28d9]">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{driver.name}</p>
            <p className="text-xs text-slate-500">{driver.phoneNumber || 'No number provided'}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 font-mono text-sm text-slate-500">{driver.employeeId}</td>
      <td className="px-5 py-3.5 font-mono text-sm text-slate-500">{driver.licenseNumber}</td>
      <td className="px-5 py-3.5 font-medium text-slate-700">{driver.licenseCategory}</td>
      <td className="px-5 py-3.5 text-sm text-slate-500">{driver.phoneNumber}</td>
      <td className="px-5 py-3.5 text-sm text-slate-500">{driver.assignedVehicle || 'None'}</td>
      <td className={`px-5 py-3.5 text-right text-sm font-semibold ${getSafetyScoreColor(driver.safetyScore)}`}>
        {driver.safetyScore}
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500">{driver.licenseExpiry}</td>
      <td className="px-5 py-3.5 text-center">
        <DriverStatusBadge status={driver.status} licenseExpiry={driver.licenseExpiry} />
      </td>
      <td className="px-5 py-3.5 text-center">
        <DriverActions
          onEdit={() => onEdit(driver.id)}
          onDelete={() => onDelete(driver.id)}
        />
      </td>
    </tr>
  );
}
