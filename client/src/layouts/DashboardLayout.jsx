import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DashboardLayout({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  children,
}) {
  return (
    <div className="h-screen w-screen bg-[#0F172A] text-slate-100 flex overflow-hidden">
      {/* Sidebar - remains in standard flex layout, avoiding fixed offsets */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <Header activeTab={activeTab} />

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-[#0F172A]">
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
          {/* Footer at the bottom of the scroll view */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
