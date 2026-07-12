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
    <tr className="hover:bg-slate-50/50 transition-colors duration-100">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c5a9f]/10 to-[#5e3d75]/15 text-xs font-bold text-[#7c5a9f] shadow-sm">
            {initials}
          </div>
          <div>
            <p className="font-bold text-slate-800">{driver.name}</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{driver.phoneNumber || 'No number provided'}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 font-mono text-slate-500">{driver.employeeId}</td>
      <td className="px-5 py-4 font-mono text-slate-500">{driver.licenseNumber}</td>
      <td className="px-5 py-4 font-semibold text-slate-650">{driver.licenseCategory}</td>
      <td className="px-5 py-4 text-slate-500 font-medium">{driver.phoneNumber}</td>
      <td className="px-5 py-4 font-semibold text-slate-700">{driver.assignedVehicle || 'None'}</td>
      <td className={`px-5 py-4 text-right font-bold ${getSafetyScoreColor(driver.safetyScore)}`}>
        {driver.safetyScore}
      </td>
      <td className="px-5 py-4 text-slate-500 font-medium">{driver.licenseExpiry}</td>
      <td className="px-5 py-4 text-center">
        <DriverStatusBadge status={driver.status} licenseExpiry={driver.licenseExpiry} />
      </td>
      <td className="px-5 py-4 text-center">
        <DriverActions
          onEdit={() => onEdit(driver.id)}
          onDelete={() => onDelete(driver.id)}
        />
      </td>
    </tr>
  );
}
