import React, { useState } from 'react';
import { initialDrivers } from '../../data/driversData';
import DriverHeader from '../../components/drivers/DriverHeader';
import DriverFilters from '../../components/drivers/DriverFilters';
import DriverTable from '../../components/drivers/DriverTable';
import { X } from 'lucide-react';

export default function DriverManagement() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Uplifted Filters State
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: 'All',
    category: 'All',
    assignedVehicle: 'All',
  });

  // Modal Form State
  const [form, setForm] = useState({
    name: '',
    employeeId: '',
    licenseNumber: '',
    licenseCategory: 'LMV',
    phoneNumber: '',
    assignedVehicle: 'None',
    safetyScore: '100',
    licenseExpiry: new Date().toISOString().split('T')[0],
    status: 'Available',
  });

  // Delete Driver action
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this driver from the registry?")) {
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Add Driver Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.employeeId || !form.licenseNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    const newDriver = {
      id: Date.now(),
      name: form.name,
      employeeId: form.employeeId,
      licenseNumber: form.licenseNumber,
      licenseCategory: form.licenseCategory,
      phoneNumber: form.phoneNumber || '-',
      assignedVehicle: form.assignedVehicle === 'None' ? 'None' : form.assignedVehicle,
      safetyScore: Number(form.safetyScore) || 100,
      licenseExpiry: form.licenseExpiry,
      status: form.status,
    };

    setDrivers((prev) => [newDriver, ...prev]);
    setIsModalOpen(false);

    // Reset Form
    setForm({
      name: '',
      employeeId: '',
      licenseNumber: '',
      licenseCategory: 'LMV',
      phoneNumber: '',
      assignedVehicle: 'None',
      safetyScore: '100',
      licenseExpiry: new Date().toISOString().split('T')[0],
      status: 'Available',
    });
  };

  // Export CSV mock trigger
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Driver Name,Employee ID,License Number,License Category,Phone Number,Assigned Vehicle,Safety Score,License Expiry,Status\n"
      + drivers.map(d => `"${d.name}","${d.employeeId}","${d.licenseNumber}","${d.licenseCategory}","${d.phoneNumber}","${d.assignedVehicle}","${d.safetyScore}","${d.licenseExpiry}","${d.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transitops_drivers_registry.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering calculations
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      driver.employeeId.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'All' || driver.status === filters.status;
    const matchesCategory = filters.category === 'All' || driver.licenseCategory === filters.category;
    const matchesVehicle =
      filters.assignedVehicle === 'All' ||
      driver.assignedVehicle === filters.assignedVehicle ||
      (filters.assignedVehicle === 'None' && (!driver.assignedVehicle || driver.assignedVehicle === 'None'));

    return matchesSearch && matchesStatus && matchesCategory && matchesVehicle;
  });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <DriverHeader
        onAddDriver={() => setIsModalOpen(true)}
        onExportCSV={handleExportCSV}
      />

      {/* Filters Panel */}
      <DriverFilters filters={filters} setFilters={setFilters} />

      {/* Driver Grid Table */}
      <DriverTable
        drivers={filteredDrivers}
        onEdit={(id) => alert(`Edit trigger for Driver ID: ${id}`)}
        onDelete={handleDelete}
      />

      {/* Add Driver Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E293B] border border-slate-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/10">
              <h3 className="text-sm font-semibold text-slate-200">Register New Driver</h3>
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
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Driver Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Employee ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DRV009"
                    value={form.employeeId}
                    onChange={(e) => setForm({...form, employeeId: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">License Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DL-12345"
                    value={form.licenseNumber}
                    onChange={(e) => setForm({...form, licenseNumber: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">License Category *</label>
                  <select
                    value={form.licenseCategory}
                    onChange={(e) => setForm({...form, licenseCategory: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-205 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700 cursor-pointer"
                  >
                    <option value="LMV">LMV (Light Motor)</option>
                    <option value="HMV">HMV (Heavy Motor)</option>
                    <option value="HGV">HGV (Heavy Goods)</option>
                    <option value="MCWG">MCWG (Motorcycle)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 99999 88888"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({...form, phoneNumber: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">License Expiry *</label>
                  <input
                    type="date"
                    required
                    value={form.licenseExpiry}
                    onChange={(e) => setForm({...form, licenseExpiry: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col col-span-2">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Assigned Vehicle</label>
                  <select
                    value={form.assignedVehicle}
                    onChange={(e) => setForm({...form, assignedVehicle: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-205 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700 cursor-pointer"
                  >
                    <option value="None">None (Unassigned)</option>
                    <option value="GJ01AB4521 (VAN-05)">GJ01AB4521 (VAN-05)</option>
                    <option value="GJ01AB9981 (TRUCK-11)">GJ01AB9981 (TRUCK-11)</option>
                    <option value="GJ01AB1120 (MINI-03)">GJ01AB1120 (MINI-03)</option>
                    <option value="GJ01AB0008 (VAN-09)">GJ01AB0008 (VAN-09)</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Safety Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="100"
                    value={form.safetyScore}
                    onChange={(e) => setForm({...form, safetyScore: e.target.value})}
                    className="bg-[#0F172A] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                  className="bg-[#0F172A] border border-slate-800 text-slate-205 text-xs rounded px-3 py-2 focus:outline-none focus:border-slate-700 cursor-pointer"
                >
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2 bg-slate-900/10">
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
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
