import React, { useState } from 'react';
import { initialFuelLogs } from '../../data/operationsData';
import { Plus, Search, Edit2, Trash2, FileSpreadsheet, X } from 'lucide-react';

// 1. FuelHeader Component
function FuelHeader({ onLogClick, onExportClick, permission }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] text-left">
      <div>
        <h1 className="text-sm font-bold text-slate-800 tracking-tight">Fuel Logs</h1>
        <p className="text-xs text-slate-450 mt-1 font-semibold">
          Record, track, and monitor refueling entries for your transit fleet.
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
        {permission === 'edit' && (
          <button
            onClick={onLogClick}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-100 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus size={13} />
            <span>Log Fuel</span>
          </button>
        )}
      </div>
    </div>
  );
}

// 2. FuelSearch Component
function FuelSearch({ value, onChange }) {
  return (
    <div className="bg-white p-4 border border-slate-100 rounded-[20px] flex items-center justify-between mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="relative w-full max-w-xs text-left">
        <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search fuel logs..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all placeholder-slate-400 font-semibold"
        />
      </div>
    </div>
  );
}

// 3. FuelTableRow Component
function FuelTableRow({ log, onDelete, permission }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors duration-100">
      <td className="px-5 py-3.5 font-mono text-slate-800 font-bold">{log.vehicle}</td>
      <td className="px-5 py-3.5 font-mono text-slate-500 font-medium">{log.tripId}</td>
      <td className="px-5 py-3.5 text-slate-750 font-bold">{log.driver}</td>
      <td className="px-5 py-3.5 text-slate-500 font-medium">{log.date}</td>
      <td className="px-5 py-3.5 text-right font-semibold text-slate-600">{log.odometer}</td>
      <td className="px-5 py-3.5 text-right font-semibold text-slate-600">{log.quantity} L</td>
      <td className="px-5 py-3.5 text-right font-bold text-slate-800">{log.cost}</td>
      <td className="px-5 py-3.5 text-slate-500 font-medium text-xs">{log.station}</td>
      <td className="px-5 py-3.5 text-slate-450 font-medium max-w-xs truncate">{log.remarks || '-'}</td>
      {permission === 'edit' && (
        <td className="px-5 py-3.5 text-center">
          <div className="flex items-center justify-center space-x-2.5">
            <button 
              onClick={() => alert(`Edit Fuel Entry for ${log.vehicle}`)}
              className="p-1 text-slate-400 hover:text-[#7c5a9f] transition-colors cursor-pointer"
              title="Edit Log"
            >
              <Edit2 size={12} />
            </button>
            <button 
              onClick={() => onDelete(log.id)}
              className="p-1 text-slate-400 hover:text-rose-550 transition-colors cursor-pointer"
              title="Delete Log"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

// 4. FuelTable Component
function FuelTable({ logs, onDelete, permission }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
              <th className="px-5 py-3">Vehicle</th>
              <th className="px-5 py-3">Trip ID</th>
              <th className="px-5 py-3">Driver</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Odometer</th>
              <th className="px-5 py-3 text-right">Fuel Qty (L)</th>
              <th className="px-5 py-3 text-right">Fuel Cost</th>
              <th className="px-5 py-3">Fuel Station</th>
              <th className="px-5 py-3">Remarks</th>
              {permission === 'edit' && <th className="px-5 py-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 text-xs text-slate-650">
            {logs.length > 0 ? (
              logs.map((log) => (
                <FuelTableRow key={log.id} log={log} onDelete={onDelete} permission={permission} />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-5 py-8 text-center text-slate-450 font-semibold">
                  No refueling entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dummy Pagination */}
      <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
        <span>Showing 1-{logs.length} of {logs.length} entries</span>
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

// 5. Main Page Component: FuelLogs
export default function FuelLogs({ permission }) {
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
        permission={permission}
      />

      <FuelSearch 
        value={searchQuery} 
        onChange={setSearchQuery} 
      />

      <FuelTable 
        logs={filteredLogs} 
        onDelete={handleDelete} 
        permission={permission}
      />
      {/* Log Fuel Modal (Hackathon Dialog Overlay) */}
      {isModalOpen && permission === 'edit' && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-100 rounded-[24px] max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Operations</p>
                <h3 className="text-xs font-bold text-slate-800">Log Refueling Entry</h3>
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
                    placeholder="e.g. GJ01AB4521"
                    value={form.vehicle}
                    onChange={(e) => setForm({...form, vehicle: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Driver Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John D."
                    value={form.driver}
                    onChange={(e) => setForm({...form, driver: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Trip ID</label>
                  <input
                    type="text"
                    placeholder="e.g. TRIP-102"
                    value={form.tripId}
                    onChange={(e) => setForm({...form, tripId: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-750 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Odometer (km)</label>
                  <input
                    type="text"
                    placeholder="e.g. 74120"
                    value={form.odometer}
                    onChange={(e) => setForm({...form, odometer: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-750 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Liters *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={form.quantity}
                    onChange={(e) => setForm({...form, quantity: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-755 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Cost (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4320"
                    value={form.cost}
                    onChange={(e) => setForm({...form, cost: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-755 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>
 
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Fuel Station</label>
                <input
                  type="text"
                  placeholder="e.g. HP Petrol Pump, NH48"
                  value={form.station}
                  onChange={(e) => setForm({...form, station: e.target.value})}
                  className="bg-slate-50 border border-slate-100 text-slate-750 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                />
              </div>
 
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider pl-0.5">Remarks</label>
                <textarea
                  rows="2"
                  placeholder="Additional refueling details..."
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
