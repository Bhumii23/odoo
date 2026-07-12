import React from 'react';
import DriverRow from './DriverRow';

export default function DriverTable({ drivers, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">Driver Name</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">Emp ID</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">License No.</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">Category</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">Phone Number</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">Assigned Vehicle</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4 text-right">Safety Score</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4">License Expiry</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4 text-center">Status</th>
              <th className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/50 px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-650 divide-y divide-slate-100/60">
            {drivers.length > 0 ? (
              drivers.map((driver, index) => (
                <DriverRow
                  key={driver.id}
                  driver={driver}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isEven={index % 2 === 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-5 py-16 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center justify-center rounded-[16px] border border-dashed border-slate-100 bg-slate-50/30 px-6 py-8">
                    <div className="mb-3 rounded-full bg-purple-50 p-2.5 text-[#7c5a9f] border border-purple-100/50">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM6 20a6 6 0 1112 0" />
                      </svg>
                    </div>
                    <p className="text-xs font-bold text-slate-700">No drivers found</p>
                    <p className="mt-1 text-[10px] text-slate-400 font-semibold">Try adjusting filters or create a new driver entry.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
 
      <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1-{drivers.length} of {drivers.length} entries</span>
        <div className="flex items-center gap-2">
          <button disabled className="px-3 py-1.5 rounded-lg bg-white border border-slate-100 text-slate-350 cursor-not-allowed text-[10px] font-bold">
            Prev
          </button>
          <button disabled className="px-3 py-1.5 rounded-lg bg-white border border-slate-100 text-slate-355 cursor-not-allowed text-[10px] font-bold">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
