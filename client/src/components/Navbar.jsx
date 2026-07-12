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
  ChevronRight,
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
      className={`flex h-full flex-shrink-0 flex-col rounded-[24px] border border-slate-100 bg-white p-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[230px]'}`}
    >
      <div className="flex items-center justify-between px-1 py-1.5 mb-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 pl-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c5a9f] to-[#5e3d75] text-xs font-bold text-white shadow-md shadow-purple-100">
              T
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Fleet OS</p>
              <p className="text-xs font-bold text-slate-800 tracking-tight">TransitOps</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`rounded-lg border border-slate-100 bg-slate-50/50 p-1.5 text-slate-400 hover:text-slate-700 transition-colors ${isCollapsed ? 'mx-auto' : 'ml-auto'}`}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-0.5">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative flex w-full items-center rounded-xl px-3 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${isCollapsed ? 'justify-center' : 'justify-start gap-3'
                } ${isActive
                  ? 'bg-[#7c5a9f] text-white shadow-sm shadow-[#7c5a9f]/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <Icon size={16} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-450 group-hover:text-slate-600'}`} />
              {!isCollapsed && <span>{item.name}</span>}

              {isCollapsed && (
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg border border-slate-100 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600 opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 z-50">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
