import React from 'react';
import { Eye, PencilLine, Trash2 } from 'lucide-react';

export default function DriverActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onEdit}
        className="rounded-full border border-[#E9E2EC] bg-white p-2 text-[#7A7180] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DCCFD9] hover:bg-[#F8F2F8] hover:text-[#5D3F58]"
        title="View Driver"
      >
        <Eye size={13} />
      </button>
      <button
        onClick={onEdit}
        className="rounded-full border border-[#E9E2EC] bg-white p-2 text-[#7A7180] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DCCFD9] hover:bg-[#F8F2F8] hover:text-[#5D3F58]"
        title="Edit Driver"
      >
        <PencilLine size={13} />
      </button>
      <button
        onClick={onDelete}
        className="rounded-full border border-[#E9E2EC] bg-white p-2 text-[#7A7180] transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        title="Delete Driver"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
