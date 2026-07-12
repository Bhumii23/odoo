import React, { useState } from 'react';
import { initialFuelLogs } from '../../data/operationsData';
import { Plus, Search, Edit2, Trash2, FileSpreadsheet, X } from 'lucide-react';

// 1. FuelHeader Component
function FuelHeader({ onLogClick, onExportClick }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 rounded-[28px] border border-[#e9dfd7] bg-[#fcf8f3]/90 p-5 shadow-[0_20px_60px_-30px_rgba(76,54,97,0.32)] backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-800">Fuel Logs</h1>
        <p className="text-xs text-slate-500 mt-1">
          Record, track, and monitor refueling entries for your transit fleet.
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
        <button
          onClick={onLogClick}
          className="flex items-center space-x-1.5 bg-[#7c5a9f] hover:bg-[#5e3d75] text-white px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
        >
          <Plus size={13} />
          <span>Log Fuel</span>
        </button>
      </div>
    </div>
  );
}

// 2. FuelSearch Component
function FuelSearch({ value, onChange }) {
  return (
    <div className="bg-[#fcf8f3]/90 p-4 border border-[#e9dfd7] rounded-[22px] flex items-center justify-between mb-4 shadow-sm backdrop-blur">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search fuel logs..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/80 border border-[#e7d9e8] text-slate-700 text-xs rounded-2xl pl-8 pr-3 py-2 focus:outline-none placeholder-slate-400 focus:border-[#c7abda] transition-colors"
        />
      </div>
    </div>
  );
}

// 3. FuelTableRow Component
function FuelTableRow({ log, onDelete }) {
  return (
    <tr className="hover:bg-slate-800/30 transition-colors duration-100">
      <td className="px-5 py-3.5 font-mono text-slate-200 font-medium">{log.vehicle}</td>
      <td className="px-5 py-3.5 font-mono text-slate-400">{log.tripId}</td>
      <td className="px-5 py-3.5 text-slate-300">{log.driver}</td>
      <td className="px-5 py-3.5 text-slate-400">{log.date}</td>
      <td className="px-5 py-3.5 text-right font-medium text-slate-450">{log.odometer}</td>
      <td className="px-5 py-3.5 text-right font-medium text-slate-300">{log.quantity} L</td>
      <td className="px-5 py-3.5 text-right font-semibold text-slate-200">{log.cost}</td>
      <td className="px-5 py-3.5 text-slate-400 text-sm">{log.station}</td>
      <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate">{log.remarks || '-'}</td>
      <td className="px-5 py-3.5 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button 
            onClick={() => alert(`Edit Fuel Entry for ${log.vehicle}`)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Edit Log"
          >
            <Edit2 size={12} />
          </button>
          <button 
            onClick={() => onDelete(log.id)}
            className="p-1 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete Log"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// 4. FuelTable Component
function FuelTable({ logs, onDelete }) {
  return (
    <div className="bg-[#fcf8f3]/90 border border-[#e9dfd7] rounded-[24px] overflow-hidden shadow-[0_12px_40px_-20px_rgba(76,54,97,0.22)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/10">
              <th className="px-5 py-3">Vehicle</th>
              <th className="px-5 py-3">Trip ID</th>
              <th className="px-5 py-3">Driver</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Odometer</th>
              <th className="px-5 py-3 text-right">Fuel Qty (L)</th>
              <th className="px-5 py-3 text-right">Fuel Cost</th>
              <th className="px-5 py-3">Fuel Station</th>
              <th className="px-5 py-3">Remarks</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
            {logs.length > 0 ? (
              logs.map((log) => (
                <FuelTableRow key={log.id} log={log} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-5 py-8 text-center text-slate-500">
                  No refueling entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dummy Pagination */}
      <div className="px-5 py-4 border-t border-[#e9dfd7] flex items-center justify-between text-xs text-slate-500 bg-[#f7efe8]/70">
        <span>Showing 1-{logs.length} of {logs.length} entries</span>
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

// 5. Main Page Component: FuelLogs
export default function FuelLogs() {
  const [logs, setLogs] = useState(initialFuelLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for Logging Fuel
  const [form, setForm] = useState({
    vehicle: '',
    tripId: '',
    driver: '',
    date: new Date().toISOString().split('T')[0],
    odometer: '',
    quantity: '',
    cost: '',
    station: '',
    remarks: '',
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this fuel log?")) {
      setLogs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleExportCSV = () => {
    // Generate dummy CSV
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Vehicle,Trip ID,Driver,Date,Odometer,Quantity,Cost,Station,Remarks\n"
      + logs.map(l => `"${l.vehicle}","${l.tripId}","${l.driver}","${l.date}","${l.odometer}","${l.quantity}","${l.cost}","${l.station}","${l.remarks}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transitops_fuel_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.vehicle || !form.driver || !form.quantity || !form.cost) {
      alert("Please fill in all required fields.");
      return;
    }

    const newLog = {
      id: Date.now(),
      vehicle: form.vehicle,
      tripId: form.tripId || 'TRIP-N/A',
      driver: form.driver,
      date: form.date,
      odometer: form.odometer || '-',
      quantity: form.quantity,
      cost: `₹ ${Number(form.cost).toLocaleString('en-IN')}`,
      station: form.station || '-',
      remarks: form.remarks,
    };

    setLogs((prev) => [newLog, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setForm({
      vehicle: '',
      tripId: '',
      driver: '',
      date: new Date().toISOString().split('T')[0],
      odometer: '',
      quantity: '',
      cost: '',
      station: '',
      remarks: '',
    });
  };

  // Filter logs based on search
  const filteredLogs = logs.filter(
    (log) =>
      log.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tripId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FuelHeader 
        onLogClick={() => setIsModalOpen(true)} 
        onExportClick={handleExportCSV} 
      />

      <FuelSearch 
        value={searchQuery} 
        onChange={setSearchQuery} 
      />

      <FuelTable 
        logs={filteredLogs} 
        onDelete={handleDelete} 
      />

      {/* Log Fuel Modal (Hackathon Dialog Overlay) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E293B] border border-slate-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#e9dfd7] flex justify-between items-center bg-[#f7efe8]/70">
              <h3 className="text-sm font-semibold text-slate-800">Log Refueling Entry</h3>
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
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Driver Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John D."
                    value={form.driver}
                    onChange={(e) => setForm({...form, driver: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Odometer (km)</label>
                  <input
                    type="text"
                    placeholder="e.g. 74120"
                    value={form.odometer}
                    onChange={(e) => setForm({...form, odometer: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Liters *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={form.quantity}
                    onChange={(e) => setForm({...form, quantity: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Cost (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4320"
                    value={form.cost}
                    onChange={(e) => setForm({...form, cost: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Fuel Station</label>
                <input
                  type="text"
                  placeholder="e.g. HP Petrol Pump, NH48"
                  value={form.station}
                  onChange={(e) => setForm({...form, station: e.target.value})}
                  className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Remarks</label>
                <textarea
                  rows="2"
                  placeholder="Additional refueling details..."
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
                  Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
