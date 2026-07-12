import React from 'react';
import { permissions } from '../config/permissions';
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  Fuel,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'fleet', name: 'Fleet', icon: Truck },
  { id: 'drivers', name: 'Drivers', icon: Users },
  { id: 'trips', name: 'Trips', icon: Route },
  { id: 'maintenance', name: 'Maintenance', icon: Wrench },
  { id: 'fuel-expenses', name: 'Fuel & Expenses', icon: Fuel },
  { id: 'analytics', name: 'Analytics', icon: BarChart2 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function Navbar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, user }) {
  const userRole = user?.role || 'DISPATCHER';
  const rolePermissions = permissions[userRole] || {};

  const filteredNavItems = navItems.filter((item) => {
    const permKey = item.id === 'fuel-expenses' ? 'fuelExpenses' : item.id;
    return rolePermissions[permKey] && rolePermissions[permKey] !== 'none';
  });

  return (
    <aside
      className={`h-full bg-[#fcf8f3]/90 backdrop-blur-xl border-r border-[#e9dfd7] text-slate-700 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 shadow-[12px_0_40px_-20px_rgba(124,90,159,0.24)] ${
        isCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#efe4da] bg-gradient-to-r from-[#f7efe8] to-[#f7ebf7]">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 pl-2">
            <span className="text-sm font-bold tracking-[0.24em] text-[#5e3d75] uppercase select-none">
              TransitOps
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-xl bg-white/80 border border-[#e7d9e8] text-[#6b3d7a] hover:bg-[#f4ecf8] hover:text-[#5e3d75] transition-colors duration-200 ml-auto shadow-sm"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center relative rounded-2xl px-3 py-2.5 transition-all duration-150 group ${
                isActive
                  ? 'bg-[#f4ecf8] text-[#5e3d75] font-semibold shadow-sm before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#7c5a9f] before:rounded-r'
                  : 'hover:bg-[#f7f0f8] hover:text-[#4b3261] text-slate-500'
              } ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}`}
            >
              <Icon size={18} className={isActive ? 'text-[#7c5a9f]' : 'text-slate-500 group-hover:text-[#6b3d7a]'} />

              {!isCollapsed && (
                <span className="text-xs font-medium tracking-wide">
                  {item.name}
                </span>
              )}

              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-[#fffaf5] border border-[#e9dfd7] text-[#5e3d75] text-[10px] rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50 shadow-md">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
