import React from 'react';
import DriverRow from './DriverRow';

export default function DriverTable({ drivers, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#ece7ef] bg-white/90 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.28)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[#f9f7fb] text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            <tr>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">Driver Name</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">Emp ID</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">License No.</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">Category</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">Phone Number</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">Assigned Vehicle</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3 text-right">Safety Score</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3">License Expiry</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3 text-center">Status</th>
              <th className="sticky top-0 z-10 border-b border-[#ece7ef] bg-[#f9f7fb] px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
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
                  <div className="mx-auto flex max-w-sm flex-col items-center justify-center rounded-[24px] border border-dashed border-[#ece7ef] bg-[#fcfbfe] px-6 py-8">
                    <div className="mb-3 rounded-full bg-[#f4eaff] p-3 text-[#6d28d9]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM6 20a6 6 0 1112 0" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-slate-900">No drivers found</p>
                    <p className="mt-1 text-sm text-slate-500">Try adjusting filters or create a new driver entry.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#ece7ef] bg-[#fcfbfe]/80 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1-{drivers.length} of {drivers.length} entries</span>
        <div className="flex items-center gap-2">
          <button disabled className="rounded-2xl border border-[#ece7ef] bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-400 shadow-sm">
            Prev
          </button>
          <button disabled className="rounded-2xl border border-[#ece7ef] bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-400 shadow-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
