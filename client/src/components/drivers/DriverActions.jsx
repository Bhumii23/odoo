import React from 'react';
import { Eye, PencilLine, Trash2 } from 'lucide-react';

export default function DriverActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={onEdit}
        className="rounded-lg border border-slate-100 bg-white p-2 text-slate-450 transition-all hover:bg-slate-50 hover:text-[#7c5a9f] cursor-pointer"
        title="View Driver"
      >
        <Eye size={13} />
      </button>
      <button
        onClick={onEdit}
        className="rounded-lg border border-slate-100 bg-white p-2 text-slate-450 transition-all hover:bg-slate-50 hover:text-[#7c5a9f] cursor-pointer"
        title="Edit Driver"
      >
        <PencilLine size={13} />
      </button>
      <button
        onClick={onDelete}
        className="rounded-lg border border-slate-100 bg-white p-2 text-slate-455 transition-all hover:bg-slate-50 hover:text-rose-500 cursor-pointer"
        title="Delete Driver"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
