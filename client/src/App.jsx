import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Analytics from './pages/analytics/Analytics';
import FuelLogs from './pages/FuelLogs/FuelLogs';
import Expenses from './pages/Expenses/Expenses';
import DriverManagement from './pages/DriverManagement/DriverManagement';
import TripDispatcher from './pages/TripDispatcher/TripDispatcher';
import Maintenance from './pages/maintenance/Maintenance';
import Settings from './pages/settings/Settings';
import api from './lib/api';
import {
  Plus,
  Search,
  Truck,
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  Wrench,
  MapPin,
  Clock,
  BarChart2,
  X,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

import { AuthProvider, useAuth } from './contexts/AuthContext';

// ─── Status badge helper ──────────────────────────────────────────────────────
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Available': case 'AVAILABLE':
      return 'bg-emerald-600/90 text-white border border-emerald-500/30';
    case 'On Trip': case 'ON_TRIP':
      return 'bg-sky-600/90 text-white border border-sky-500/30';
    case 'In Shop': case 'IN_SHOP':
      return 'bg-amber-600/90 text-white border border-amber-500/30';
    case 'Retired': case 'RETIRED':
      return 'bg-rose-600/90 text-white border border-rose-500/30';
    default:
      return 'bg-slate-600/90 text-white border border-slate-500/30';
  }
};

const formatStatus = (s) => {
  const map = { AVAILABLE: 'Available', ON_TRIP: 'On Trip', IN_SHOP: 'In Shop', RETIRED: 'Retired' };
  return map[s] || s;
};

// ─── Vehicle CRUD Modal ───────────────────────────────────────────────────────
const EMPTY_VEHICLE = {
  registrationNumber: '',
  name: '',
  type: 'Van',
  maxLoadCapacity: '',
  odometer: '',
  acquisitionCost: '',
  status: 'AVAILABLE',
};

function VehicleModal({ vehicle, onClose, onSaved }) {
  const [form, setForm] = useState(vehicle ? {
    registrationNumber: vehicle.registrationNumber,
    name: vehicle.name,
    type: vehicle.type,
    maxLoadCapacity: vehicle.maxLoadCapacity,
    odometer: vehicle.odometer,
    acquisitionCost: vehicle.acquisitionCost,
    status: vehicle.status,
  } : { ...EMPTY_VEHICLE });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(vehicle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        maxLoadCapacity: parseFloat(form.maxLoadCapacity),
        odometer: parseFloat(form.odometer),
        acquisitionCost: parseFloat(form.acquisitionCost),
      };
      if (isEdit) {
        await api.put(`/vehicles/${vehicle.id}`, payload);
      } else {
        await api.post('/vehicles', payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save vehicle.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const inputCls = 'bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold w-full';
  const labelCls = 'flex flex-col text-left gap-1.5';
  const labelTextCls = 'text-[10px] font-bold text-slate-400 uppercase tracking-wider';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.97 }}
        className="w-full max-w-lg rounded-[28px] border border-slate-100 bg-white shadow-[0_30px_90px_-20px_rgba(15,23,42,0.25)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              {isEdit ? 'Edit Vehicle' : 'Add Vehicle'}
            </p>
            <h3 className="text-base font-bold text-slate-900">
              {isEdit ? vehicle.name : 'Register New Vehicle'}
            </h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-100 bg-white p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={labelCls}>
              <span className={labelTextCls}>Registration No. *</span>
              <input
                type="text" required placeholder="GJ01AB1234" className={inputCls}
                value={form.registrationNumber}
                onChange={(e) => set('registrationNumber', e.target.value.toUpperCase())}
                disabled={isEdit}
              />
            </div>
            <div className={labelCls}>
              <span className={labelTextCls}>Vehicle Name *</span>
              <input type="text" required placeholder="VAN-05" className={inputCls}
                value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className={labelCls}>
              <span className={labelTextCls}>Type *</span>
              <select className={inputCls} value={form.type} onChange={(e) => set('type', e.target.value)}>
                <option>Van</option>
                <option>Truck</option>
                <option>Mini</option>
                <option>Bus</option>
                <option>Pickup</option>
              </select>
            </div>
            <div className={labelCls}>
              <span className={labelTextCls}>Max Load (kg) *</span>
              <input type="number" required min="1" placeholder="500" className={inputCls}
                value={form.maxLoadCapacity} onChange={(e) => set('maxLoadCapacity', e.target.value)} />
            </div>
            <div className={labelCls}>
              <span className={labelTextCls}>Odometer (km) *</span>
              <input type="number" required min="0" placeholder="74000" className={inputCls}
                value={form.odometer} onChange={(e) => set('odometer', e.target.value)} />
            </div>
            <div className={labelCls}>
              <span className={labelTextCls}>Acquisition Cost (₹) *</span>
              <input type="number" required min="0" placeholder="620000" className={inputCls}
                value={form.acquisitionCost} onChange={(e) => set('acquisitionCost', e.target.value)} />
            </div>
            {isEdit && (
              <div className={`${labelCls} col-span-2`}>
                <span className={labelTextCls}>Status</span>
                <select className={inputCls} value={form.status} onChange={(e) => set('status', e.target.value)}>
                  <option value="AVAILABLE">Available</option>
                  <option value="IN_SHOP">In Shop</option>
                  <option value="RETIRED">Retired</option>
                </select>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 font-semibold">
              <AlertTriangle size={13} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose}
              className="bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-md shadow-purple-100 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60">
              {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard KPI Card ───────────────────────────────────────────────────────
function KpiCard({ title, value, subtitle, icon: Icon, gradient }) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-350 flex items-center justify-between group cursor-pointer">
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{title}</span>
        <span className="text-2xl font-bold text-slate-800 tracking-tight block">{value}</span>
        <span className="text-[10px] font-semibold text-slate-400 block">{subtitle}</span>
      </div>
      <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-md shadow-slate-100 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
        <Icon size={16} />
      </div>
    </div>
  );
}

// ─── Main Dashboard View ──────────────────────────────────────────────────────
function DashboardView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fuelExpensesSubTab, setFuelExpensesSubTab] = useState('fuel');

  // ── Dashboard state ──────────────────────────────────────────────────────
  const [dashMetrics, setDashMetrics] = useState(null);
  const [dashLoading, setDashLoading] = useState(false);

  const fetchDashMetrics = useCallback(async () => {
    setDashLoading(true);
    try {
      const res = await api.get('/analytics/dashboard');
      setDashMetrics(res.data.KPI_METRICS);
    } catch (err) {
      console.error('Dashboard metrics error:', err);
    } finally {
      setDashLoading(false);
    }
  }, []);

  // ── Fleet state ──────────────────────────────────────────────────────────
  const [fleetData, setFleetData] = useState([]);
  const [fleetLoading, setFleetLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleModal, setVehicleModal] = useState(null); // null | 'add' | vehicle object
  const [deleteConfirm, setDeleteConfirm] = useState(null); // null | vehicle object
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const fetchFleet = useCallback(async () => {
    setFleetLoading(true);
    try {
      const params = {};
      if (typeFilter !== 'All') params.type = typeFilter;
      if (statusFilter !== 'All') {
        const statusMap = { Available: 'AVAILABLE', 'On Trip': 'ON_TRIP', 'In Shop': 'IN_SHOP', Retired: 'RETIRED' };
        params.status = statusMap[statusFilter] || statusFilter;
      }
      if (searchQuery) params.search = searchQuery;
      const res = await api.get('/vehicles', { params });
      setFleetData(res.data);
    } catch (err) {
      console.error('Fleet fetch error:', err);
    } finally {
      setFleetLoading(false);
    }
  }, [typeFilter, statusFilter, searchQuery]);

  // Fetch data when tab becomes active
  useEffect(() => {
    if (activeTab === 'dashboard') fetchDashMetrics();
  }, [activeTab, fetchDashMetrics]);

  useEffect(() => {
    if (activeTab === 'fleet') fetchFleet();
  }, [activeTab, fetchFleet]);

  const handleDeleteVehicle = async () => {
    if (!deleteConfirm) return;
    setDeleteLoading(true);
    setDeleteError('');
    try {
      await api.delete(`/vehicles/${deleteConfirm.id}`);
      setDeleteConfirm(null);
      fetchFleet();
    } catch (err) {
      setDeleteError(err.response?.data?.error || 'Cannot delete this vehicle.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderPageHeader = (title, subtitle) => (
    <div className="mb-6 flex flex-col text-left">
      <h1 className="text-xl font-bold tracking-tight text-slate-800">{title}</h1>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
    </div>
  );

  const renderContent = () => {
    if (!user) return <Navigate to="/auth" replace />;

    switch (activeTab) {
      case 'analytics':
        return <Analytics />;

      case 'drivers':
        return <DriverManagement />;

      case 'trips':
        return <TripDispatcher />;

      case 'maintenance':
        return <Maintenance />;

      case 'settings':
        return <Settings />;

      case 'fuel-expenses':
        return (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-px flex space-x-6 text-xs font-semibold mb-4">
              {['fuel', 'expenses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFuelExpensesSubTab(tab)}
                  className={`pb-3 relative transition-colors duration-150 cursor-pointer ${
                    fuelExpensesSubTab === tab
                      ? 'text-[#714B67] border-b-2 border-[#714B67]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'fuel' ? 'Fuel Logs' : 'Expenses'}
                </button>
              ))}
            </div>
            {fuelExpensesSubTab === 'fuel' ? <FuelLogs /> : <Expenses />}
          </div>
        );

      // ── DASHBOARD — Live KPIs from API ────────────────────────────────────
      case 'dashboard': {
        const kpiDefs = dashMetrics
          ? [
              {
                title: 'Active Vehicles',
                value: dashMetrics.activeVehicles,
                subtitle: `${dashMetrics.totalVehicles} total in fleet`,
                icon: Truck,
                gradient: 'from-[#7c5a9f] to-[#5e3d75]',
              },
              {
                title: 'Available Drivers',
                value: dashMetrics.driversAvailable,
                subtitle: 'Ready for dispatch',
                icon: Users,
                gradient: 'from-blue-500 to-indigo-600',
              },
              {
                title: 'Fleet Utilization',
                value: `${dashMetrics.fleetUtilization}%`,
                subtitle: 'Active / total vehicles',
                icon: TrendingUp,
                gradient: 'from-emerald-500 to-teal-600',
              },
              {
                title: 'Active Trips',
                value: dashMetrics.activeTrips,
                subtitle: `${dashMetrics.pendingTrips} pending`,
                icon: MapPin,
                gradient: 'from-sky-500 to-cyan-600',
              },
              {
                title: 'In Maintenance',
                value: dashMetrics.inMaintenance,
                subtitle: 'Vehicles in shop',
                icon: Wrench,
                gradient: 'from-amber-500 to-orange-600',
              },
              {
                title: 'Operational Cost',
                value: `₹${Number(dashMetrics.operationalCost || 0).toLocaleString('en-IN')}`,
                subtitle: 'Fuel + Maintenance + Expenses',
                icon: CreditCard,
                gradient: 'from-rose-500 to-pink-600',
              },
              {
                title: 'Fuel Efficiency',
                value: `${dashMetrics.fuelEfficiency} km/L`,
                subtitle: 'Fleet average',
                icon: Activity,
                gradient: 'from-violet-500 to-purple-600',
              },
              {
                title: 'Vehicle ROI',
                value: `${dashMetrics.roi}%`,
                subtitle: '(Revenue - OpCost) / AcqCost',
                icon: BarChart2,
                gradient: 'from-indigo-500 to-blue-700',
              },
            ]
          : [];

        return (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between mb-2">
              {renderPageHeader('Operations Dashboard', 'Live KPIs and fleet metrics.')}
              {dashLoading && (
                <RefreshCw size={16} className="text-slate-400 animate-spin" />
              )}
            </div>

            {dashLoading && !dashMetrics ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-6 rounded-[20px] h-24 animate-pulse">
                    <div className="h-2.5 bg-slate-100 rounded w-2/3 mb-3" />
                    <div className="h-6 bg-slate-100 rounded w-1/2 mb-2" />
                    <div className="h-2 bg-slate-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {kpiDefs.map((kpi) => (
                  <KpiCard key={kpi.title} {...kpi} />
                ))}
              </div>
            )}

            {/* Quick stats hint */}
            <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={14} className="text-[#7c5a9f]" />
                <h3 className="text-xs font-bold text-slate-700 tracking-tight">Live Overview</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All metrics are computed in real-time from the database. Navigate to{' '}
                <span className="font-semibold text-[#7c5a9f]">Analytics</span> for detailed charts, trends, and exports.
              </p>
            </div>
          </div>
        );
      }

      // ── FLEET — Real API CRUD ─────────────────────────────────────────────
      case 'fleet':
        return (
          <div className="space-y-6 text-left animate-fadeIn">
            {renderPageHeader('Fleet Registry', 'Active fleet registration registry.')}

            {/* Filter and Action Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-5 border border-slate-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
              <div className="flex flex-wrap items-center gap-4">
                {/* Type */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider pl-0.5">Type</label>
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer min-w-[120px] font-semibold">
                    <option value="All">All Types</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Mini">Mini</option>
                    <option value="Bus">Bus</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </div>

                {/* Status */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider pl-0.5">Status</label>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer min-w-[120px] font-semibold">
                    <option value="All">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="In Shop">In Shop</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>

                {/* Search */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider pl-0.5">Search Registry</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text" placeholder="Search reg. no..." value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white placeholder-slate-400 w-48 transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end">
                {fleetLoading && <RefreshCw size={14} className="text-slate-400 animate-spin" />}
                <button
                  onClick={() => setVehicleModal('add')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-purple-100 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Vehicle</span>
                </button>
              </div>
            </div>

            {/* Fleet Table */}
            <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="px-6 py-4">Reg. No. (Unique)</th>
                      <th className="px-6 py-4">Name/Code</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Capacity</th>
                      <th className="px-6 py-4">Odometer</th>
                      <th className="px-6 py-4">Acq. Cost</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60 text-xs text-slate-650">
                    {fleetLoading && fleetData.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-10 text-center text-slate-400 font-semibold">
                          <RefreshCw size={16} className="animate-spin inline mr-2" />
                          Loading vehicles…
                        </td>
                      </tr>
                    ) : fleetData.length > 0 ? (
                      fleetData.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors duration-100">
                          <td className="px-6 py-4 font-mono font-bold text-slate-700">{vehicle.registrationNumber}</td>
                          <td className="px-6 py-4 font-bold text-slate-800">{vehicle.name}</td>
                          <td className="px-6 py-4 text-slate-500 font-medium">{vehicle.type}</td>
                          <td className="px-6 py-4 text-slate-500 font-medium">
                            {vehicle.maxLoadCapacity >= 1000
                              ? `${(vehicle.maxLoadCapacity / 1000).toFixed(1)} Ton`
                              : `${vehicle.maxLoadCapacity} kg`}
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">{Number(vehicle.odometer).toLocaleString()} km</td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">₹ {Number(vehicle.acquisitionCost).toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border ${getStatusBadgeClass(vehicle.status)}`}>
                              {formatStatus(vehicle.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end space-x-3.5">
                              <button
                                onClick={() => setVehicleModal(vehicle)}
                                className="text-slate-400 hover:text-[#7c5a9f] font-bold transition-colors cursor-pointer text-[11px] inline-flex items-center gap-1"
                              >
                                <Edit2 size={11} /> Edit
                              </button>
                              <button
                                onClick={() => { setDeleteConfirm(vehicle); setDeleteError(''); }}
                                className="text-slate-400 hover:text-rose-500 font-bold transition-colors cursor-pointer text-[11px] inline-flex items-center gap-1"
                              >
                                <Trash2 size={11} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-8 text-center text-slate-400 font-semibold">
                          No matching vehicles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Business rule hint */}
            <div className="flex items-start space-x-2 bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl">
              <p className="text-[10px] text-amber-600 leading-normal font-semibold uppercase tracking-wider">
                Rule: Registration No. must be unique • Retired/In Shop vehicles are hidden from Trip Dispatcher.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6 text-left">
            {renderPageHeader(
              activeTab.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
              `Manage operational aspects of ${activeTab.replace('-', ' ')}.`
            )}
            <div className="bg-[#1E293B] border border-slate-800/80 rounded-lg p-10 text-center min-h-[220px] flex flex-col justify-center items-center">
              <h2 className="text-sm font-semibold text-slate-200 mb-1">
                {activeTab.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Operational controls and registries for {activeTab.replace('-', ' ')} are loadable here.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full h-full"
    >
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
        {renderContent()}
      </DashboardLayout>

      {/* Vehicle Modal (Add / Edit) */}
      <AnimatePresence>
        {vehicleModal && (
          <VehicleModal
            vehicle={vehicleModal === 'add' ? null : vehicleModal}
            onClose={() => setVehicleModal(null)}
            onSaved={fetchFleet}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              className="w-full max-w-sm rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_30px_90px_-20px_rgba(15,23,42,0.25)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                  <Trash2 size={16} className="text-rose-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Delete Vehicle</h3>
                  <p className="text-xs text-slate-500 mt-0.5">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Are you sure you want to remove <span className="font-bold">{deleteConfirm.name}</span> ({deleteConfirm.registrationNumber}) from the registry?
              </p>
              {deleteError && (
                <div className="flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 font-semibold mb-4">
                  <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                  {deleteError}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteConfirm(null)}
                  className="bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors">
                  Cancel
                </button>
                <button onClick={handleDeleteVehicle} disabled={deleteLoading}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors disabled:opacity-60">
                  {deleteLoading ? 'Deleting…' : 'Delete Vehicle'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/auth" element={<AuthLayout />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
