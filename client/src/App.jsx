import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Analytics from './pages/Analytics/Analytics';
import FuelLogs from './pages/FuelLogs/FuelLogs';
import Expenses from './pages/Expenses/Expenses';
import DriverManagement from './pages/DriverManagement/DriverManagement';
import TripDispatcher from './pages/TripDispatcher/TripDispatcher';
import Maintenance from './pages/Maintenance/Maintenance';
import Settings from './pages/Settings/Settings';
import { 
  Plus, 
  Search, 
  ShieldAlert,
  Truck,
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  Edit2,
  Trash2
} from 'lucide-react';
import { permissions } from './config/permissions';
import AccessDenied from './components/AccessDenied';

import { AuthProvider, useAuth } from './contexts/AuthContext';

const tabToPermissionKey = {
  'dashboard': 'dashboard',
  'fleet': 'fleet',
  'drivers': 'drivers',
  'trips': 'trips',
  'maintenance': 'maintenance',
  'fuel-expenses': 'fuelExpenses',
  'analytics': 'analytics',
  'settings': 'settings'
};

function DashboardView() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sub-Tab selection state for "Fuel & Expenses" group
  const [fuelExpensesSubTab, setFuelExpensesSubTab] = useState('fuel'); // 'fuel' or 'expenses'

  // States for Fleet Page Filters
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample fleet data matching the user's attached screenshot
  const initialFleetData = [
    {
      regNo: 'GJ01AB4521',
      name: 'VAN-05',
      type: 'Van',
      capacity: '500 kg',
      odometer: '74,000',
      cost: '6,20,000',
      status: 'Available',
    },
    {
      regNo: 'GJ01AB9981',
      name: 'TRUCK-11',
      type: 'Truck',
      capacity: '5 Ton',
      odometer: '182,000',
      cost: '24,50,000',
      status: 'On Trip',
    },
    {
      regNo: 'GJ01AB1120',
      name: 'MINI-03',
      type: 'Mini',
      capacity: '1 Ton',
      odometer: '66,000',
      cost: '4,10,000',
      status: 'In Shop',
    },
    {
      regNo: 'GJ01AB0008',
      name: 'VAN-09',
      type: 'Van',
      capacity: '750 kg',
      odometer: '241,900',
      cost: '5,90,000',
      status: 'Retired',
    },
  ];

  // Helper status color mapping matching screenshot badge styles
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-600/90 text-white border border-emerald-500/30';
      case 'On Trip':
        return 'bg-sky-600/90 text-white border border-sky-500/30';
      case 'In Shop':
        return 'bg-amber-600/90 text-white border border-amber-500/30';
      case 'Retired':
        return 'bg-rose-600/90 text-white border border-rose-500/30';
      default:
        return 'bg-slate-600/90 text-white border border-slate-500/30';
    }
  };

  // Filter logic
  const filteredFleet = initialFleetData.filter((vehicle) => {
    const matchesType = typeFilter === 'All' || vehicle.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || vehicle.status === statusFilter;
    const matchesSearch =
      vehicle.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleAddVehicle = () => {
    alert("Add Vehicle function.");
  };

  // Helper for generating page headers
  const renderPageHeader = (title, subtitle) => (
    <div className="mb-6 flex flex-col text-left">
      <h1 className="text-xl font-bold tracking-tight text-slate-800">{title}</h1>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
    </div>
  );

  // Content Renderer based on selected Tab
  const renderContent = () => {
    if (!user) {
      return <Navigate to="/auth" replace />;
    }

    const permKey = tabToPermissionKey[activeTab];
    const userPermission = permissions[user.role]?.[permKey] || 'none';

    if (userPermission === 'none') {
      return <AccessDenied />;
    }

    switch (activeTab) {
      case 'analytics':
        return <Analytics />;

      case 'drivers':
        return <DriverManagement />;

      case 'trips':
        return <TripDispatcher permission={userPermission} />;

      case 'maintenance':
        return <Maintenance />;

      case 'settings':
        return <Settings />;

      case 'fuel-expenses':
        return (
          <div className="space-y-6">
            {/* Sub-Tabs Switcher */}
            <div className="border-b border-slate-800 pb-px flex space-x-6 text-xs font-semibold mb-4">
              <button
                onClick={() => setFuelExpensesSubTab('fuel')}
                className={`pb-3 relative transition-colors duration-150 cursor-pointer ${fuelExpensesSubTab === 'fuel'
                    ? 'text-[#714B67] border-b-2 border-[#714B67]'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Fuel Logs
              </button>
              <button
                onClick={() => setFuelExpensesSubTab('expenses')}
                className={`pb-3 relative transition-colors duration-150 cursor-pointer ${fuelExpensesSubTab === 'expenses'
                    ? 'text-[#714B67] border-b-2 border-[#714B67]'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Expenses
              </button>
            </div>

            {/* Sub-Tab Page View */}
            {fuelExpensesSubTab === 'fuel' ? (
              <FuelLogs permission={userPermission} />
            ) : (
              <Expenses permission={userPermission} />
            )}
          </div>
        );

      case 'dashboard': {
        const kpis = [
          { title: 'Active Vehicles', value: '18 / 24', trend: '+2% from yesterday', icon: Truck, gradient: 'from-[#7c5a9f] to-[#5e3d75]' },
          { title: 'Total Drivers', value: '29', trend: '3 on leave', icon: Users, gradient: 'from-blue-500 to-indigo-600' },
          { title: 'Fleet Utilization', value: '82%', trend: '+4% this month', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-600' },
          { title: 'Monthly Expenses', value: '₹ 4,82,900', trend: '-12% vs last month', icon: CreditCard, gradient: 'from-rose-500 to-pink-600' }
        ];

        return (
          <div className="space-y-6 text-left">
            {renderPageHeader("Welcome back, Raven", "Fleet operations and metrics summary for today.")}

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {kpis.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div 
                    key={i} 
                    className="bg-white border border-slate-100 p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-350 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{card.title}</span>
                      <span className="text-2xl font-bold text-slate-800 tracking-tight block">{card.value}</span>
                      <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{card.trend}</span>
                    </div>
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-md shadow-slate-100 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={16} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simple Dashboard Placeholder */}
            <div className="bg-white border border-slate-100 rounded-[20px] p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.012)] min-h-[260px] flex flex-col justify-center items-center">
              <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-450 mb-3.5 border border-slate-100">
                <Activity size={18} />
              </div>
              <h3 className="text-xs font-bold text-slate-700 mb-1 tracking-tight">Live Activity Feed</h3>
              <p className="text-[11px] text-slate-450 max-w-xs leading-relaxed">
                Real-time tracking analytics and activity feeds are currently offline.
              </p>
            </div>
          </div>
        );
      }

      case 'fleet':
        return (
          <div className="space-y-6 text-left animate-fadeIn">
            {renderPageHeader("Fleet Registry", "Active fleet registration registry.")}

            {/* Filter and Action Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-5 border border-slate-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
              <div className="flex flex-wrap items-center gap-4">
                {/* Type Selection */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider pl-0.5">Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer min-w-[120px] font-semibold"
                  >
                    <option value="All">All Types</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Mini">Mini</option>
                  </select>
                </div>

                {/* Status Selection */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider pl-0.5">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all cursor-pointer min-w-[120px] font-semibold"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="In Shop">In Shop</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>

                {/* Local search inside table */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider pl-0.5">Search Registry</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search reg. no..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-purple-300 focus:bg-white placeholder-slate-400 w-48 transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Add Vehicle Button */}
              {permissions[user.role]?.['fleet'] === 'edit' && (
                <button
                  onClick={handleAddVehicle}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-purple-100 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer self-end"
                >
                  <Plus size={14} />
                  <span>Add Vehicle</span>
                </button>
              )}
            </div>

            {/* Fleet Table Area */}
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
                      {permissions[user.role]?.['fleet'] === 'edit' && <th className="px-6 py-4 text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60 text-xs text-slate-650">
                    {filteredFleet.length > 0 ? (
                      filteredFleet.map((vehicle) => (
                        <tr
                          key={vehicle.regNo}
                          className="hover:bg-slate-50/50 transition-colors duration-100"
                        >
                          <td className="px-6 py-4 font-mono font-bold text-slate-700">
                            {vehicle.regNo}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-800">{vehicle.name}</td>
                          <td className="px-6 py-4 text-slate-500 font-medium">{vehicle.type}</td>
                          <td className="px-6 py-4 text-slate-500 font-medium">{vehicle.capacity}</td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">{vehicle.odometer} km</td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">₹ {vehicle.cost}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full text-center border ${getStatusBadgeClass(vehicle.status)}`}>
                              {vehicle.status}
                            </span>
                          </td>
                          {permissions[user.role]?.['fleet'] === 'edit' && (
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end space-x-3.5">
                                <button
                                  onClick={() => alert(`Edit vehicle ${vehicle.name}`)}
                                  className="text-slate-400 hover:text-[#7c5a9f] font-bold transition-colors cursor-pointer text-[11px]"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => alert(`Delete vehicle ${vehicle.name}`)}
                                  className="text-slate-400 hover:text-rose-500 font-bold transition-colors cursor-pointer text-[11px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={permissions[user.role]?.['fleet'] === 'edit' ? "8" : "7"} className="px-6 py-8 text-center text-slate-400 font-semibold">
                          No matching vehicles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hint Warning Box */}
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
              activeTab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
              `Manage operational aspects of ${activeTab.replace('-', ' ')}.`
            )}

            <div className="bg-[#1E293B] border border-slate-800/80 rounded-lg p-10 text-center min-h-[220px] flex flex-col justify-center items-center">
              <h2 className="text-sm font-semibold text-slate-200 mb-1">
                {activeTab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Operational controls and registries for {activeTab.replace('-', ' ')} are loadable here.
              </p>
              <button
                onClick={() => alert(`Create action for ${activeTab}`)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Configure
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full h-full"
    >
      <DashboardLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      >
        {renderContent()}
      </DashboardLayout>
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
