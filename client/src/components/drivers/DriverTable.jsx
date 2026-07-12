import React from 'react';
import DriverRow from './DriverRow';

export default function DriverTable({ drivers, onEdit, onDelete }) {
  return (
    <div className="bg-[#1E293B] border border-slate-800/80 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/10">
              <th className="px-5 py-3">Driver Name</th>
              <th className="px-5 py-3">Emp ID</th>
              <th className="px-5 py-3">License No.</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Phone Number</th>
              <th className="px-5 py-3">Assigned Vehicle</th>
              <th className="px-5 py-3 text-right">Safety Score</th>
              <th className="px-5 py-3">License Expiry</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <DriverRow
                  key={driver.id}
                  driver={driver}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-5 py-8 text-center text-slate-500">
                  No driver records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dummy Pagination */}
      <div className="px-5 py-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-550 bg-slate-900/10">
        <span>Showing 1-{drivers.length} of {drivers.length} entries</span>
        <div className="flex items-center space-x-1.5">
          <button 
            disabled 
            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-800/50 text-slate-500 cursor-not-allowed text-[10px] font-semibold"
          >
            Prev
          </button>
          <button 
            disabled 
            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-800/50 text-slate-500 cursor-not-allowed text-[10px] font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
