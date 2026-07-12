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
    <div className="min-h-screen bg-[#F8F6F9] text-[#2E2331]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-4 px-3 py-3 sm:px-4 lg:px-6 lg:py-4">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <div className="flex min-h-[calc(100vh-2rem)] flex-1 flex-col overflow-hidden rounded-[30px] border border-[#EFE6EE] bg-[#F8F6F9] shadow-[0_24px_90px_-44px_rgba(93,63,88,0.35)]">
          <Header activeTab={activeTab} />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
