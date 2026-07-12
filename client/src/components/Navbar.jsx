import React from 'react';
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

export default function Navbar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  return (
    <aside
      className={`flex h-full flex-shrink-0 flex-col rounded-[28px] border border-[#ece7ef] bg-white/90 p-2 shadow-[0_20px_80px_-44px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-300 ${
        isCollapsed ? 'w-[78px]' : 'w-[240px]'
      }`}
    >
      <div className="flex items-center justify-between px-2 py-2">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] text-sm font-semibold text-white shadow-lg shadow-purple-200">
              T
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Fleet OS</p>
              <p className="text-sm font-semibold text-slate-900">TransitOps</p>
            </div>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] text-sm font-semibold text-white shadow-lg shadow-purple-200">
            T
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto rounded-xl border border-[#ece7ef] bg-[#f9f7fb] p-2 text-slate-500 transition-all duration-200 hover:border-[#d9cceb] hover:text-[#6d28d9]"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="mt-3 flex-1 space-y-1 overflow-y-auto px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative flex w-full items-center rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isCollapsed ? 'justify-center' : 'justify-start gap-3'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-[#f4eaff] to-[#efe7ff] text-[#6d28d9] shadow-[0_12px_30px_-18px_rgba(109,40,217,0.55)]'
                  : 'text-slate-600 hover:bg-[#f8f6f9] hover:text-slate-900'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}

              {isCollapsed && (
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-full border border-[#ece7ef] bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
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
