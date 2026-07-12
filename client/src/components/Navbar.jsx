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

export default function Navbar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  return (
    <aside
      className={`h-full bg-[#0B0F19] border-r border-slate-800/80 text-slate-300 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 pl-2">
            <span className="text-sm font-bold tracking-wider text-slate-200 uppercase select-none">
              TransitOps
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/60 hover:bg-slate-800 hover:text-white transition-colors duration-200 ml-auto"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center relative rounded-lg px-3 py-2.5 transition-all duration-150 group ${
                isActive
                  ? 'bg-slate-800 text-white font-medium before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#714B67] before:rounded-r'
                  : 'hover:bg-slate-800/40 hover:text-slate-200 text-slate-400'
              } ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}`}
            >
              <Icon size={18} className={isActive ? 'text-[#714B67]' : 'text-slate-400 group-hover:text-slate-200'} />
              
              {!isCollapsed && (
                <span className="text-xs font-medium tracking-wide">
                  {item.name}
                </span>
              )}

              {/* Tooltip for Collapsed Sidebar */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 border border-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50 shadow-md">
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
