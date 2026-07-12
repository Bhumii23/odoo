import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Plus, Search, Edit2, Trash2, FileSpreadsheet, X } from 'lucide-react';

// 1. ExpenseHeader Component
function ExpenseHeader({ onAddClick, onExportClick }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] text-left">
      <div>
        <h1 className="text-sm font-bold text-slate-800 tracking-tight">Operational Expenses</h1>
        <p className="text-xs text-slate-450 mt-1 font-semibold">
          Manage operational costs, highway tolls, penalties, and driver allowances.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onExportClick}
          className="flex items-center space-x-1.5 bg-white border border-slate-100 text-slate-500 hover:text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
        >
          <FileSpreadsheet size={13} />
          <span>Export CSV</span>
        </button>
        <button
          onClick={onAddClick}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-100 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus size={13} />
          <span>Add Expense</span>
        </button>
      </div>
    </div>
  );
}

// 2. ExpenseSearch Component
function ExpenseSearch({ value, onChange }) {
  return (
    <div className="bg-white p-4 border border-slate-100 rounded-[20px] flex items-center justify-between mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="relative w-full max-w-xs text-left">
        <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search expenses..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all placeholder-slate-400 font-semibold"
        />
      </div>
    </div>
  );
}

// 3. ExpenseTable Component (with nested row renderer)
function ExpenseTable({ expenses, onDelete }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
              <th className="px-5 py-3">Trip ID</th>
              <th className="px-5 py-3">Vehicle</th>
              <th className="px-5 py-3">Expense Type</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Remarks</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 text-xs text-slate-650">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr 
                  key={expense.id} 
                  className="hover:bg-slate-50/50 transition-colors duration-100"
                >
                  <td className="px-5 py-3.5 font-mono text-slate-500 font-medium">{expense.tripId}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-800 font-bold">{expense.vehicle}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-750">{expense.type}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-slate-850">{expense.amount}</td>
                  <td className="px-5 py-3.5 text-slate-500 font-medium">{expense.date}</td>
                  <td className="px-5 py-3.5 text-slate-450 max-w-xs truncate font-medium">{expense.remarks}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 text-[9px] font-bold border rounded-full uppercase tracking-wider ${getStatusClass(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex items-center justify-center space-x-2.5">
                      <button 
                        onClick={() => alert(`Edit Expense details for ${expense.type}`)}
                        className="p-1 text-slate-400 hover:text-[#7c5a9f] transition-colors cursor-pointer"
                        title="Edit Expense"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button 
                        onClick={() => onDelete(expense.id)}
                        className="p-1 text-slate-400 hover:text-rose-550 transition-colors cursor-pointer"
                        title="Delete Expense"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-5 py-8 text-center text-slate-450 font-semibold">
                  No expense records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dummy Pagination */}
      <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
        <span>Showing 1-{expenses.length} of {expenses.length} entries</span>
        <div className="flex items-center space-x-1.5">
          <button 
            disabled 
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-100 text-slate-350 cursor-not-allowed text-[10px] font-bold"
          >
            Prev
          </button>
          <button 
            disabled 
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-100 text-slate-355 cursor-not-allowed text-[10px] font-bold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. Main Page Component: Expenses
export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      const formatted = res.data.map(exp => ({
        id: exp.id,
        tripId: exp.tripId ? String(exp.tripId) : '-',
        vehicle: exp.vehicle?.registrationNumber || String(exp.vehicleId),
        type: exp.type,
        amount: `₹ ${Number(exp.amount).toLocaleString('en-IN')}`,
        date: new Date(exp.date).toISOString().split('T')[0],
        remarks: '-',
        status: 'Approved'
      }));
      setExpenses(formatted);
    } catch(err) {
      console.error(err);
    }
  };

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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this expense record?")) {
      try {
        await api.delete(`/expenses/${id}`);
        setExpenses((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Failed to delete expense');
      }
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.vehicle || !form.amount) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await api.post('/expenses', {
        vehicleId: parseInt(form.vehicle),
        tripId: form.tripId ? parseInt(form.tripId) : undefined,
        type: form.type,
        amount: Number(form.amount),
        date: form.date ? new Date(form.date).toISOString() : undefined,
      });

      const newExpense = {
        id: res.data.id,
        tripId: res.data.tripId ? String(res.data.tripId) : '-',
        vehicle: res.data.vehicle?.registrationNumber || String(res.data.vehicleId),
        type: res.data.type,
        amount: `₹ ${Number(res.data.amount).toLocaleString('en-IN')}`,
        date: new Date(res.data.date).toISOString().split('T')[0],
        remarks: '-',
        status: 'Approved',
      };

      setExpenses((prev) => [newExpense, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error adding expense.");
    }
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
      />

      <ExpenseSearch 
        value={searchQuery} 
        onChange={setSearchQuery} 
      />

      <ExpenseTable 
        expenses={filteredExpenses} 
        onDelete={handleDelete}
      />
      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-100 rounded-[24px] max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Finance</p>
                <h3 className="text-xs font-bold text-slate-800">Add Operational Expense</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
 
            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Vehicle ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1"
                    value={form.vehicle}
                    onChange={(e) => setForm({...form, vehicle: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Trip ID</label>
                  <input
                    type="text"
                    placeholder="e.g. TRIP-102"
                    value={form.tripId}
                    onChange={(e) => setForm({...form, tripId: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Expense Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({...form, type: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
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
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 350"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({...form, status: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
 
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Remarks</label>
                <textarea
                  rows="2"
                  placeholder="Expense description details..."
                  value={form.remarks}
                  onChange={(e) => setForm({...form, remarks: e.target.value})}
                  className="bg-slate-50 border border-slate-100 text-slate-750 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all resize-none font-semibold"
                />
              </div>
 
              {/* Modal Actions */}
              <div className="pt-3.5 border-t border-slate-100 flex justify-end space-x-2 bg-slate-50/50 p-4 -mx-5 -mb-5 rounded-b-[24px]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-purple-100 transition-all hover:-translate-y-0.5 cursor-pointer"
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
