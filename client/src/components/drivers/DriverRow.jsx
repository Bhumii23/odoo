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
    <tr className={`transition-all duration-200 hover:bg-[#F8F2F8] ${isEven ? 'bg-[#FCFAFD]' : 'bg-white'}`}>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4EAF5] to-[#E9DFF1] text-sm font-semibold text-[#5D3F58]">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-[#2E2331]">{driver.name}</p>
            <p className="text-xs text-[#7A7180]">{driver.phoneNumber || 'No number provided'}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 font-mono text-sm text-[#7A7180]">{driver.employeeId}</td>
      <td className="px-5 py-3.5 font-mono text-sm text-[#7A7180]">{driver.licenseNumber}</td>
      <td className="px-5 py-3.5 font-medium text-[#4B3348]">{driver.licenseCategory}</td>
      <td className="px-5 py-3.5 text-sm text-[#7A7180]">{driver.phoneNumber}</td>
      <td className="px-5 py-3.5 text-sm text-[#7A7180]">{driver.assignedVehicle || 'None'}</td>
      <td className={`px-5 py-3.5 text-right text-sm font-semibold ${getSafetyScoreColor(driver.safetyScore)}`}>
        {driver.safetyScore}
      </td>
      <td className="px-5 py-3.5 text-sm text-[#7A7180]">{driver.licenseExpiry}</td>
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
