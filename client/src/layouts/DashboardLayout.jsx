import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DashboardLayout({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  user,
  children,
}) {
  return (
    <div className="min-h-screen w-screen bg-[#F8F6F9] text-slate-800 flex p-4 gap-4 overflow-hidden font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        user={user}
      />

      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-hidden gap-4">
        <Header activeTab={activeTab} />

        <div className="flex-1 overflow-y-auto flex flex-col bg-transparent gap-4 pr-1">
          <main className="flex-grow">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
