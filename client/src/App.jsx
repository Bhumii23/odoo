import React, { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Analytics from './pages/Analytics/Analytics';
import FuelLogs from './pages/FuelLogs/FuelLogs';
import Expenses from './pages/Expenses/Expenses';
import { 
  Plus, 
  Search, 
  ShieldAlert
} from 'lucide-react';

export default function App() {
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
    <div className="mb-5">
      <h1 className="text-xl font-semibold tracking-tight text-slate-100">{title}</h1>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  );

  // Content Renderer based on selected Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics />;

      case 'fuel-expenses':
        return (
          <div className="space-y-6">
            {/* Sub-Tabs Switcher */}
            <div className="border-b border-slate-800 pb-px flex space-x-6 text-xs font-semibold mb-4">
              <button
                onClick={() => setFuelExpensesSubTab('fuel')}
                className={`pb-3 relative transition-colors duration-150 cursor-pointer ${
                  fuelExpensesSubTab === 'fuel' 
                    ? 'text-[#714B67] border-b-2 border-[#714B67]' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Fuel Logs
              </button>
              <button
                onClick={() => setFuelExpensesSubTab('expenses')}
                className={`pb-3 relative transition-colors duration-150 cursor-pointer ${
                  fuelExpensesSubTab === 'expenses' 
                    ? 'text-[#714B67] border-b-2 border-[#714B67]' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Expenses
              </button>
            </div>

            {/* Sub-Tab Page View */}
            {fuelExpensesSubTab === 'fuel' ? <FuelLogs /> : <Expenses />}
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6 text-left">
            {renderPageHeader("Welcome, Raven", "Fleet operations and metrics summary for today.")}

            {/* KPI Cards Grid - Simple & Plain */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Active Vehicles', value: '18 / 24', trend: '+2% from yesterday' },
                { title: 'Total Drivers', value: '29', trend: '3 on leave' },
                { title: 'Fleet Utilization', value: '82%', trend: '+4% this month' },
                { title: 'Monthly Expenses', value: '₹ 4,82,900', trend: '-12% vs last month' }
              ].map((card, i) => (
                <div key={i} className="bg-[#1E293B] border border-slate-800/80 p-4.5 rounded-lg">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">{card.title}</span>
                  <span className="text-xl font-bold text-slate-100 block">{card.value}</span>
                  <span className="text-[10px] text-slate-500 mt-2 block">{card.trend}</span>
                </div>
              ))}
            </div>

            {/* Simple Dashboard Placeholder */}
            <div className="bg-[#1E293B] border border-slate-800/80 rounded-lg p-8 text-center min-h-[220px] flex flex-col justify-center items-center">
              <h3 className="text-sm font-semibold text-slate-200 mb-1">Live Feed</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Real-time tracking analytics and activity feeds are currently offline.
              </p>
            </div>
          </div>
        );

      case 'fleet':
        return (
          <div className="space-y-6 text-left">
            {renderPageHeader("Fleet", "Active fleet registration registry.")}

            {/* Filter and Action Header - Simple & Clean */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-[#1E293B] p-4 border border-slate-800/85 rounded-lg">
              <div className="flex flex-wrap items-center gap-3">
                {/* Type Selection */}
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 mb-1 font-medium pl-0.5">Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Mini">Mini</option>
                  </select>
                </div>

                {/* Status Selection */}
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 mb-1 font-medium pl-0.5">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="In Shop">In Shop</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>

                {/* Local search inside table */}
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 mb-1 font-medium pl-0.5">Search Registry</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search reg. no..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#0F172A] border border-slate-800 text-slate-300 text-xs rounded pl-7 pr-2.5 py-1.5 focus:outline-none placeholder-slate-600 w-44"
                    />
                  </div>
                </div>
              </div>

              {/* Add Vehicle Button */}
              <button
                onClick={handleAddVehicle}
                className="w-full sm:w-auto flex items-center justify-center space-x-1.5 bg-[#714B67] hover:bg-[#4a3048] text-white px-3 py-1.5 rounded text-xs font-semibold transition-all duration-200 cursor-pointer self-end"
              >
                <Plus size={14} />
                <span>Add Vehicle</span>
              </button>
            </div>

            {/* Fleet Table Area - Simple Grid */}
            <div className="bg-[#1E293B] border border-slate-800/80 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/10">
                      <th className="px-5 py-3">Reg. No. (Unique)</th>
                      <th className="px-5 py-3">Name/Code</th>
                      <th className="px-5 py-3">Type</th>
                      <th className="px-5 py-3">Capacity</th>
                      <th className="px-5 py-3">Odometer</th>
                      <th className="px-5 py-3">Acq. Cost</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                    {filteredFleet.length > 0 ? (
                      filteredFleet.map((vehicle) => (
                        <tr
                          key={vehicle.regNo}
                          className="hover:bg-slate-800/30 transition-colors duration-100"
                        >
                          <td className="px-5 py-3 font-mono">
                            {vehicle.regNo}
                          </td>
                          <td className="px-5 py-3 font-medium text-slate-200">{vehicle.name}</td>
                          <td className="px-5 py-3 text-slate-400">{vehicle.type}</td>
                          <td className="px-5 py-3 text-slate-400">{vehicle.capacity}</td>
                          <td className="px-5 py-3 text-slate-400">{vehicle.odometer}</td>
                          <td className="px-5 py-3 text-slate-400">{vehicle.cost}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex px-2.5 py-1 text-[10px] font-medium rounded text-center w-20 justify-center ${getStatusBadgeClass(vehicle.status)}`}>
                              {vehicle.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-5 py-8 text-center text-slate-500">
                          No matching vehicles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hint Warning Box from the screenshot */}
            <div className="flex items-start space-x-2 bg-amber-500/5 border border-amber-500/10 p-3.5 rounded">
              <p className="text-[10px] text-amber-500/90 leading-normal font-medium">
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
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
