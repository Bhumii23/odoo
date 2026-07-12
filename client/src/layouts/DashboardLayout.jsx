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
    <div className="min-h-screen w-screen bg-transparent text-slate-800 flex overflow-hidden">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        user={user}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header activeTab={activeTab} />

        <div className="flex-1 overflow-y-auto flex flex-col bg-transparent">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
