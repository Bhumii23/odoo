import React, { useState } from 'react';
import FilterBar from '../../components/analytics/FilterBar';
import KPICard from '../../components/analytics/KPICard';
import FleetPieChart from '../../components/analytics/FleetPieChart';
import RevenueChart from '../../components/analytics/RevenueChart';
import FuelEfficiencyChart from '../../components/analytics/FuelEfficiencyChart';
import MaintenanceChart from '../../components/analytics/MaintenanceChart';
import TripStatusChart from '../../components/analytics/TripStatusChart';
import RecentActivityTable from '../../components/analytics/RecentActivityTable';
import { KPI_METRICS } from '../../data/analyticsData';

// Icons for high-density KPI Cards
import {
  Car,
  Activity,
  Wrench,
  UserCheck,
  Compass,
  Clock,
  TrendingUp,
  Gauge,
  DollarSign,
  LineChart,
  FileSpreadsheet,
  FileText,
  Download
} from 'lucide-react';

export default function Analytics() {
  // Global filter state managed here (Uplifted State)
  const [filters, setFilters] = useState({
    month: 'All',
    vehicleType: 'All',
    region: 'All',
    driver: 'All',
    tripStatus: 'All',
  });

  // Mock Export Handlers
  const handleExportCSV = () => {
    // Generate simple dummy CSV content and trigger download
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value,Change\n"
      + `Total Vehicles,${KPI_METRICS.totalVehicles},N/A\n`
      + `Active Vehicles,${KPI_METRICS.activeVehicles},+2%\n`
      + `Fleet Utilization,${KPI_METRICS.fleetUtilization}%,+4%\n`
      + `Operational Cost,${KPI_METRICS.operationalCost},-12%\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transitops_analytics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    alert("Exporting PDF report... (PDF generation logic triggers here)");
  };

  const handleDownloadReport = () => {
    alert("Downloading complete system executive summary report...");
  };

  return (
    <div className="space-y-6 text-left">
      <div className="rounded-[28px] border border-[#e9dfd7] bg-[#fcf8f3]/90 p-5 sm:p-6 shadow-[0_20px_60px_-30px_rgba(76,54,97,0.32)] backdrop-blur">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-800">Analytics</h1>
            <p className="text-xs text-slate-500 mt-1">
              System performance dashboard, costs, and fleet optimization metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 bg-white/80 hover:bg-[#f4ecf8] text-slate-700 border border-[#e7d9e8] hover:text-[#5e3d75] px-3 py-1.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <FileSpreadsheet size={13} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-1.5 bg-white/80 hover:bg-[#f4ecf8] text-slate-700 border border-[#e7d9e8] hover:text-[#5e3d75] px-3 py-1.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <FileText size={13} />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center space-x-1.5 bg-[#7c5a9f] hover:bg-[#5e3d75] text-white px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Download size={13} />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* High-density KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard title="Total Vehicles" value={KPI_METRICS.totalVehicles} change="N/A" isPositive={true} icon={Car} />
        <KPICard title="Active Vehicles" value={KPI_METRICS.activeVehicles} change="+2%" isPositive={true} icon={Activity} />
        <KPICard title="In Maintenance" value={KPI_METRICS.inMaintenance} change="-5%" isPositive={true} icon={Wrench} />
        <KPICard title="Drivers Available" value={KPI_METRICS.driversAvailable} change="+12%" isPositive={true} icon={UserCheck} />
        <KPICard title="Active Trips" value={KPI_METRICS.activeTrips} change="+8%" isPositive={true} icon={Compass} />
        <KPICard title="Pending Trips" value={KPI_METRICS.pendingTrips} change="-20%" isPositive={false} icon={Clock} />
        <KPICard title="Fleet Utilization" value={`${KPI_METRICS.fleetUtilization}%`} change="+4%" isPositive={true} icon={TrendingUp} />
        <KPICard title="Fuel Efficiency" value={KPI_METRICS.fuelEfficiency} change="+1.2%" isPositive={true} icon={Gauge} />
        <KPICard title="Operational Cost" value={KPI_METRICS.operationalCost} change="-12%" isPositive={true} icon={DollarSign} />
        <KPICard title="Vehicle ROI" value={KPI_METRICS.roi} change="+0.8%" isPositive={true} icon={LineChart} />
      </div>

      {/* Grid: Charts Block 1 (Fleet & Revenue) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FleetPieChart />
        <RevenueChart />
      </div>

      {/* Grid: Charts Block 2 (Fuel, Maintenance & Trips) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FuelEfficiencyChart />
        <MaintenanceChart />
        <TripStatusChart />
      </div>

      {/* Recent Log Table Section */}
      <RecentActivityTable />
    </div>
  );
}
