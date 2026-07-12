import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function DriverActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={onEdit}
        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        title="Edit Driver"
      >
        <Edit2 size={12} />
      </button>
      <button
        onClick={onDelete}
        className="p-1 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-450 transition-colors cursor-pointer"
        title="Delete Driver"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}
