import React, { useState } from 'react';
import { initialExpenses } from '../../data/operationsData';
import { Plus, Search, Edit2, Trash2, FileSpreadsheet, X } from 'lucide-react';

// 1. ExpenseHeader Component
function ExpenseHeader({ onAddClick, onExportClick, permission }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 rounded-[28px] border border-[#e9dfd7] bg-[#fcf8f3]/90 p-5 shadow-[0_20px_60px_-30px_rgba(76,54,97,0.32)] backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-800">Expenses</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage operational costs, highway tolls, penalties, and driver allowances.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onExportClick}
          className="flex items-center space-x-1.5 bg-white/80 hover:bg-[#f4ecf8] text-slate-700 border border-[#e7d9e8] hover:text-[#5e3d75] px-3 py-1.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
        >
          <FileSpreadsheet size={13} />
          <span>Export CSV</span>
        </button>
        {permission === 'edit' && (
          <button
            onClick={onAddClick}
            className="flex items-center space-x-1.5 bg-[#7c5a9f] hover:bg-[#5e3d75] text-white px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Plus size={13} />
            <span>Add Expense</span>
          </button>
        )}
      </div>
    </div>
  );
}

// 2. ExpenseSearch Component
function ExpenseSearch({ value, onChange }) {
  return (
    <div className="bg-[#fcf8f3]/90 p-4 border border-[#e9dfd7] rounded-[22px] flex items-center justify-between mb-4 shadow-sm backdrop-blur">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search expenses..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl pl-8 pr-3 py-2 focus:outline-none placeholder-slate-400 focus:border-[#c7abda] transition-colors"
        />
      </div>
    </div>
  );
}

// 3. ExpenseTable Component (with nested row renderer)
function ExpenseTable({ expenses, onDelete, permission }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/25';
    }
  };

  return (
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] rounded-[24px] overflow-hidden shadow-[0_12px_40px_-20px_rgba(76,54,97,0.22)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/10">
              <th className="px-5 py-3">Trip ID</th>
              <th className="px-5 py-3">Vehicle</th>
              <th className="px-5 py-3">Expense Type</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Remarks</th>
              <th className="px-5 py-3 text-center">Status</th>
              {permission === 'edit' && <th className="px-5 py-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr 
                  key={expense.id} 
                  className="hover:bg-slate-800/30 transition-colors duration-100"
                >
                  <td className="px-5 py-3.5 font-mono text-slate-400">{expense.tripId}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-200 font-medium">{expense.vehicle}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-300">{expense.type}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-slate-200">{expense.amount}</td>
                  <td className="px-5 py-3.5 text-slate-400">{expense.date}</td>
                  <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate">{expense.remarks}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 text-[9px] font-semibold rounded uppercase tracking-wider ${getStatusClass(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  {permission === 'edit' && (
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => alert(`Edit Expense details for ${expense.type}`)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Edit Expense"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          onClick={() => onDelete(expense.id)}
                          className="p-1 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Expense"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-5 py-8 text-center text-slate-500">
                  No expense records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dummy Pagination */}
      <div className="px-5 py-4 border-t border-[#e9dfd7] flex items-center justify-between text-xs text-slate-500 bg-[#f7efe8]/70">
        <span>Showing 1-{expenses.length} of {expenses.length} entries</span>
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

// 5. Main Page Component: Expenses
export default function Expenses({ permission }) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for Add Expense
  const [form, setForm] = useState({
    tripId: '',
    vehicle: '',
    type: 'Toll Tax',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    remarks: '',
    status: 'Pending',
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this expense record?")) {
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Trip ID,Vehicle,Expense Type,Amount,Date,Remarks,Status\n"
      + expenses.map(e => `"${e.tripId}","${e.vehicle}","${e.type}","${e.amount}","${e.date}","${e.remarks}","${e.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transitops_expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.vehicle || !form.amount) {
      alert("Please fill in all required fields.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      tripId: form.tripId || 'TRIP-N/A',
      vehicle: form.vehicle,
      type: form.type,
      amount: `₹ ${Number(form.amount).toLocaleString('en-IN')}`,
      date: form.date,
      remarks: form.remarks || '-',
      status: form.status,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setForm({
      tripId: '',
      vehicle: '',
      type: 'Toll Tax',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      remarks: '',
      status: 'Pending',
    });
  };

  // Filter based on search query
  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tripId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ExpenseHeader 
        onAddClick={() => setIsModalOpen(true)} 
        onExportClick={handleExportCSV} 
        permission={permission}
      />

      <ExpenseSearch 
        value={searchQuery} 
        onChange={setSearchQuery} 
      />

      <ExpenseTable 
        expenses={filteredExpenses} 
        onDelete={handleDelete} 
        permission={permission}
      />

      {/* Add Expense Modal */}
      {isModalOpen && permission === 'edit' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E293B] border border-slate-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#e9dfd7] flex justify-between items-center bg-[#f7efe8]/70">
              <h3 className="text-sm font-semibold text-slate-800">Add Operational Expense</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Vehicle ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GJ01AB4521"
                    value={form.vehicle}
                    onChange={(e) => setForm({...form, vehicle: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Trip ID</label>
                  <input
                    type="text"
                    placeholder="e.g. TRIP-102"
                    value={form.tripId}
                    onChange={(e) => setForm({...form, tripId: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Expense Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({...form, type: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-205 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  >
                    <option value="Toll Tax">Toll Tax</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Driver Allowance">Driver Allowance</option>
                    <option value="Parking">Parking</option>
                    <option value="Fine / Penalty">Fine / Penalty</option>
                    <option value="Misc">Misc</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 350"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({...form, status: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-205 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Remarks</label>
                <textarea
                  rows="2"
                  placeholder="Expense description details..."
                  value={form.remarks}
                  onChange={(e) => setForm({...form, remarks: e.target.value})}
                  className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700 resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#e9dfd7] flex justify-end space-x-2 bg-[#f7efe8]/70">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#714B67] hover:bg-[#4a3048] text-white text-xs font-semibold px-4 py-2 rounded cursor-pointer"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
