import React from 'react';
import DriverStatusBadge from './DriverStatusBadge';
import DriverActions from './DriverActions';

export default function DriverRow({ driver, onEdit, onDelete }) {
  // Safety score color formatting
  const getSafetyScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-450';
    if (score >= 80) return 'text-amber-450';
    return 'text-rose-450';
  };

  return (
    <tr className="hover:bg-slate-800/30 transition-colors duration-100">
      <td className="px-5 py-3.5 font-semibold text-slate-200">{driver.name}</td>
      <td className="px-5 py-3.5 font-mono text-slate-400">{driver.employeeId}</td>
      <td className="px-5 py-3.5 font-mono text-slate-350">{driver.licenseNumber}</td>
      <td className="px-5 py-3.5 font-medium text-slate-300">{driver.licenseCategory}</td>
      <td className="px-5 py-3.5 text-slate-400">{driver.phoneNumber}</td>
      <td className="px-5 py-3.5 font-mono text-slate-400">{driver.assignedVehicle || 'None'}</td>
      <td className={`px-5 py-3.5 text-right font-bold ${getSafetyScoreColor(driver.safetyScore)}`}>
        {driver.safetyScore}
      </td>
      <td className="px-5 py-3.5 text-slate-400">{driver.licenseExpiry}</td>
      <td className="px-5 py-3.5 text-center">
        <DriverStatusBadge status={driver.status} />
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
