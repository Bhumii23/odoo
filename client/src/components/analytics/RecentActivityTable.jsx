import React from 'react';
import { recentActivityData } from '../../data/analyticsData';

export default function RecentActivityTable() {
  // Helper mapping trip statuses to sleek badges matching tailwind classes
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
      case 'Dispatched':
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/25';
      case 'Draft':
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/25';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/25';
    }
  };

  return (
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] rounded-[24px] overflow-hidden shadow-[0_16px_44px_-24px_rgba(76,54,97,0.28)] backdrop-blur">
      <div className="px-5 py-4 border-b border-[#e9dfd7]">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
          Recent Trip Activity Log
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/10">
              <th className="px-5 py-3">Vehicle</th>
              <th className="px-5 py-3">Driver</th>
              <th className="px-5 py-3">Trip Route</th>
              <th className="px-5 py-3 text-right">Distance</th>
              <th className="px-5 py-3 text-right">Fuel Consumption</th>
              <th className="px-5 py-3 text-right">Expense Cost</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
            {recentActivityData.map((activity) => (
              <tr
                key={activity.id}
                className="hover:bg-slate-800/30 transition-colors duration-100"
              >
                <td className="px-5 py-3.5 font-mono text-slate-200">{activity.vehicle}</td>
                <td className="px-5 py-3.5 font-medium">{activity.driver}</td>
                <td className="px-5 py-3.5 text-slate-400">{activity.trip}</td>
                <td className="px-5 py-3.5 text-right font-medium text-slate-400">{activity.distance}</td>
                <td className="px-5 py-3.5 text-right font-medium text-slate-400">{activity.fuel}</td>
                <td className="px-5 py-3.5 text-right font-medium text-slate-200">{activity.cost}</td>
                <td className="px-5 py-3.5 text-center">
                  <span className={`inline-flex px-2.5 py-0.5 text-[9px] font-semibold rounded uppercase tracking-wider ${getStatusClass(activity.status)}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
