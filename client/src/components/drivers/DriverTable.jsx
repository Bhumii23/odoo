import React from 'react';
import DriverRow from './DriverRow';

export default function DriverTable({ drivers, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E9E2EC] bg-white/90 shadow-[0_18px_50px_-28px_rgba(93,63,88,0.24)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[#F8F6F9] text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">
            <tr>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">Driver Name</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">Emp ID</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">License No.</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">Category</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">Phone Number</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">Assigned Vehicle</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3 text-right">Safety Score</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3">License Expiry</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3 text-center">Status</th>
              <th className="sticky top-0 z-10 border-b border-[#E9E2EC] bg-[#F8F6F9] px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#2E2331]">
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
                  <div className="mx-auto flex max-w-sm flex-col items-center justify-center rounded-[24px] border border-dashed border-[#E9E2EC] bg-[#FCFAFD] px-6 py-8">
                    <div className="mb-3 rounded-full bg-[#F4EAF5] p-3 text-[#5D3F58]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM6 20a6 6 0 1112 0" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-[#2E2331]">No drivers found</p>
                    <p className="mt-1 text-sm text-[#7A7180]">Try adjusting filters or create a new driver entry.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#E9E2EC] bg-[#F8F6F9]/80 px-5 py-4 text-sm text-[#7A7180] sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1-{drivers.length} of {drivers.length} entries</span>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#7A7180] shadow-sm"
          >
            Prev
          </button>
          <button
            disabled
            className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#7A7180] shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
