import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group rounded-[24px] border border-[#ece7ef] bg-white/90 p-4 shadow-[0_20px_70px_-38px_rgba(15,23,42,0.3)] backdrop-blur"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-slate-700`}>
                <Icon size={18} />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">{card.title}</p>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-semibold text-slate-900">{card.value}</span>
                <span className="text-xs font-semibold text-[#6d28d9]">{card.hint}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <DriverFilters filters={filters} setFilters={setFilters} />

      {isLoading ? (
        <div className="rounded-[28px] border border-[#ece7ef] bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.3)]">
          <div className="grid gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-[#f1ebf5] bg-[#fefcff] p-4">
                <div className="h-10 w-10 animate-pulse rounded-2xl bg-[#efe7ff]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#efe7ff]" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#f5f2fa]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <DriverTable
            drivers={filteredDrivers}
            onEdit={(id) => alert(`Edit trigger for Driver ID: ${id}`)}
            onDelete={handleDelete}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="flex w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-[#ece7ef] bg-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-center justify-between border-b border-[#ece7ef] bg-[#fcfbfe] px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Registry</p>
                  <h3 className="text-base font-semibold text-slate-900">Register new driver</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-[#ece7ef] bg-white p-2 text-slate-500 transition-all duration-200 hover:border-[#d9cceb] hover:text-[#6d28d9]"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-1 space-y-4 overflow-y-auto p-5 text-left bg-white">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Driver Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Employee ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DRV009"
                      value={form.employeeId}
                      onChange={(e) => setForm({...form, employeeId: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>
 
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">License Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DL-12345"
                      value={form.licenseNumber}
                      onChange={(e) => setForm({...form, licenseNumber: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">License Category *</label>
                    <select
                      value={form.licenseCategory}
                      onChange={(e) => setForm({...form, licenseCategory: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                    >
                      <option value="LMV">LMV (Light Motor)</option>
                      <option value="HMV">HMV (Heavy Motor)</option>
                      <option value="HGV">HGV (Heavy Goods)</option>
                      <option value="MCWG">MCWG (Motorcycle)</option>
                    </select>
                  </div>
                </div>
 
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 99999 88888"
                      value={form.phoneNumber}
                      onChange={(e) => setForm({...form, phoneNumber: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">License Expiry *</label>
                    <input
                      type="date"
                      required
                      value={form.licenseExpiry}
                      onChange={(e) => setForm({...form, licenseExpiry: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-750 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                    />
                  </div>
                </div>
 
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col col-span-2">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Assigned Vehicle</label>
                    <select
                      value={form.assignedVehicle}
                      onChange={(e) => setForm({...form, assignedVehicle: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                    >
                      <option value="None">None (Unassigned)</option>
                      <option value="GJ01AB4521 (VAN-05)">GJ01AB4521 (VAN-05)</option>
                      <option value="GJ01AB9981 (TRUCK-11)">GJ01AB9981 (TRUCK-11)</option>
                      <option value="GJ01AB1120 (MINI-03)">GJ01AB1120 (MINI-03)</option>
                      <option value="GJ01AB0008 (VAN-09)">GJ01AB0008 (VAN-09)</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Safety Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="100"
                      value={form.safetyScore}
                      onChange={(e) => setForm({...form, safetyScore: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>
 
                <div className="flex flex-col">
                  <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({...form, status: e.target.value})}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer font-semibold"
                  >
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="Off Duty">Off Duty</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
 
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
                    Add Driver
                  </button>
                </div>
              </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
