import React, { useState } from 'react';
import { initialDrivers } from '../../data/driversData';
import DriverHeader from '../../components/drivers/DriverHeader';
import DriverFilters from '../../components/drivers/DriverFilters';
import DriverTable from '../../components/drivers/DriverTable';
import { X, Users, ShieldCheck, Truck, AlertTriangle, FileText, Sparkles } from 'lucide-react';

export default function DriverManagement() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const kpiCards = [
    { title: 'Total Drivers', value: drivers.length, icon: Users, hint: '+2 this week', tone: 'from-[#F4EAF5] to-[#E9DFF1]' },
    { title: 'Available', value: drivers.filter((d) => d.status === 'Available').length, icon: ShieldCheck, hint: 'Ready for dispatch', tone: 'from-[#ECFDF3] to-[#DCFCE7]' },
    { title: 'On Trip', value: drivers.filter((d) => d.status === 'On Trip').length, icon: Truck, hint: 'Currently assigned', tone: 'from-[#EFF6FF] to-[#DBEAFE]' },
    { title: 'Suspended', value: drivers.filter((d) => d.status === 'Suspended').length, icon: AlertTriangle, hint: 'Needs review', tone: 'from-[#FEF2F2] to-[#FEE2E2]' },
    { title: 'Licenses Expiring Soon', value: drivers.filter((d) => new Date(d.licenseExpiry) < new Date(new Date().setDate(new Date().getDate() + 45))).length, icon: FileText, hint: 'Within 45 days', tone: 'from-[#FFF7ED] to-[#FFEDD5]' },
  ];

  return (
    <div className="space-y-6">
      <DriverHeader
        onAddDriver={() => setIsModalOpen(true)}
        onExportCSV={handleExportCSV}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="group rounded-[24px] border border-[#E9E2EC] bg-white/90 p-4 shadow-[0_16px_48px_-28px_rgba(93,63,88,0.22)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(93,63,88,0.3)]">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-[#5D3F58]`}>
                <Icon size={18} />
              </div>
              <p className="mt-4 text-sm font-medium text-[#7A7180]">{card.title}</p>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-semibold text-[#2E2331]">{card.value}</span>
                <span className="text-xs font-semibold text-[#5D3F58]">{card.hint}</span>
              </div>
            </div>
          );
        })}
      </div>

      <DriverFilters filters={filters} setFilters={setFilters} />

      {isLoading ? (
        <div className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_50px_-28px_rgba(93,63,88,0.24)]">
          <div className="grid gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-[#F1EAF4] bg-[#FCFAFD] p-4">
                <div className="h-10 w-10 animate-pulse rounded-2xl bg-[#E9DFF1]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#E9DFF1]" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#F2EAF5]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DriverTable
          drivers={filteredDrivers}
          onEdit={(id) => alert(`Edit trigger for Driver ID: ${id}`)}
          onDelete={handleDelete}
        />
      )}

      {/* Add Driver Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E2331]/50 p-4 backdrop-blur-sm">
          <div className="flex max-w-lg w-full flex-col overflow-hidden rounded-[24px] border border-[#E9E2EC] bg-white shadow-[0_28px_80px_-30px_rgba(46,35,49,0.5)]">
            <div className="flex items-center justify-between border-b border-[#E9E2EC] bg-[#FCFAFD] px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-[#2E2331]">Register New Driver</h3>
                <p className="mt-0.5 text-xs text-[#7A7180]">Add a driver securely to the registry.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-[#E9E2EC] bg-white p-2 text-[#7A7180] transition-all duration-200 hover:border-[#DCCFD9] hover:bg-[#F8F2F8] hover:text-[#5D3F58]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Driver Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Employee ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DRV009"
                    value={form.employeeId}
                    onChange={(e) => setForm({...form, employeeId: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">License Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DL-12345"
                    value={form.licenseNumber}
                    onChange={(e) => setForm({...form, licenseNumber: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">License Category *</label>
                  <select
                    value={form.licenseCategory}
                    onChange={(e) => setForm({...form, licenseCategory: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
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
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 99999 88888"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({...form, phoneNumber: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">License Expiry *</label>
                  <input
                    type="date"
                    required
                    value={form.licenseExpiry}
                    onChange={(e) => setForm({...form, licenseExpiry: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col col-span-2">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Assigned Vehicle</label>
                  <select
                    value={form.assignedVehicle}
                    onChange={(e) => setForm({...form, assignedVehicle: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  >
                    <option value="None">None (Unassigned)</option>
                    <option value="GJ01AB4521 (VAN-05)">GJ01AB4521 (VAN-05)</option>
                    <option value="GJ01AB9981 (TRUCK-11)">GJ01AB9981 (TRUCK-11)</option>
                    <option value="GJ01AB1120 (MINI-03)">GJ01AB1120 (MINI-03)</option>
                    <option value="GJ01AB0008 (VAN-09)">GJ01AB0008 (VAN-09)</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Safety Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="100"
                    value={form.safetyScore}
                    onChange={(e) => setForm({...form, safetyScore: e.target.value})}
                    className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] transition-all duration-200 focus:border-[#DCCFD9] focus:outline-none focus:ring-4 focus:ring-[#F4EAF5]"
                >
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 border-t border-[#E9E2EC] bg-[#FCFAFD] px-1 py-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-2xl border border-[#E9E2EC] bg-white px-4 py-2 text-sm font-semibold text-[#4B3348] transition-all duration-200 hover:border-[#DCCFD9] hover:bg-[#F8F2F8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-[#5D3F58] to-[#4B3348] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(93,63,88,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#4B3348] hover:to-[#3D263A]"
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
