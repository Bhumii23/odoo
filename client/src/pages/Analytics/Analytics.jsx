import React, { useState } from 'react';
import FilterBar from '../../components/analytics/FilterBar';
import KPICard from '../../components/analytics/KPICard';
import FleetPieChart from '../../components/analytics/FleetPieChart';
import RevenueChart from '../../components/analytics/RevenueChart';
import FuelEfficiencyChart from '../../components/analytics/FuelEfficiencyChart';
import MaintenanceChart from '../../components/analytics/MaintenanceChart';
import TripStatusChart from '../../components/analytics/TripStatusChart';
import RecentActivityTable from '../../components/analytics/RecentActivityTable';
import InsightsCard from '../../components/analytics/InsightsCard';
import AIRecommendationsCard from '../../components/analytics/AIRecommendationsCard';
import TopPerformersCard from '../../components/analytics/TopPerformersCard';
import MaintenanceAlertsCard from '../../components/analytics/MaintenanceAlertsCard';
import QuickStatsPanel from '../../components/analytics/QuickStatsPanel';
import { KPI_METRICS } from '../../data/analyticsData';

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
  Download,
  CalendarDays,
  SlidersHorizontal,
} from 'lucide-react';

const DATE_RANGES = ['Today', 'Week', 'Month', 'Year'];

// ── Utility: export CSV ──────────────────────────────────────────
function buildCSVContent() {
  return (
    'data:text/csv;charset=utf-8,' +
    'Metric,Value,Change\n' +
    `Total Vehicles,${KPI_METRICS.totalVehicles},N/A\n` +
    `Active Vehicles,${KPI_METRICS.activeVehicles},+2%\n` +
    `Fleet Utilization,${KPI_METRICS.fleetUtilization}%,+4%\n` +
    `Operational Cost,${KPI_METRICS.operationalCost},-12%\n`
  );
}

// ── Shared card wrapper styles ───────────────────────────────────
const section = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

export default function Analytics() {
  const [filters, setFilters] = useState({
    month: 'All',
    vehicleType: 'All',
    region: 'All',
    driver: 'All',
    tripStatus: 'All',
  });

  const [activeDateRange, setActiveDateRange] = useState('Month');

  // Export handlers (unchanged logic)
  const handleExportCSV = () => {
    const encodedUri = encodeURI(buildCSVContent());
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transitops_analytics_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    alert('Exporting PDF report... (PDF generation logic triggers here)');
  };

  const handleDownloadReport = () => {
    alert('Downloading complete system executive summary report...');
  };

  // KPI definitions
  const kpiCards = [
    { title: 'Fleet Utilization', value: `${KPI_METRICS.fleetUtilization}%`, change: '+4%', isPositive: true, icon: TrendingUp, accent: 'purple', subtitle: 'vs last month' },
    { title: 'Fuel Efficiency', value: KPI_METRICS.fuelEfficiency, change: '+1.2%', isPositive: true, icon: Gauge, accent: 'amber', subtitle: 'vs last month' },
    { title: 'Operational Cost', value: KPI_METRICS.operationalCost, change: '-12%', isPositive: true, icon: DollarSign, accent: 'emerald', subtitle: 'vs last month' },
    { title: 'Vehicle ROI', value: KPI_METRICS.roi, change: '+0.8%', isPositive: true, icon: LineChart, accent: 'blue', subtitle: 'vs last month' },
    { title: 'Total Trips', value: KPI_METRICS.activeTrips + KPI_METRICS.pendingTrips, change: '+8%', isPositive: true, icon: Compass, accent: 'cyan', subtitle: 'active + pending' },
    { title: 'Revenue (MTD)', value: '₹7.2L', change: '+7.5%', isPositive: true, icon: Activity, accent: 'rose', subtitle: 'month to date' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #EFE8F4',
        boxShadow: '0 2px 16px rgba(93,63,88,0.07)',
        padding: '24px 28px',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
        }}>
          {/* Title block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              {/* Gradient logo mark */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #5D3F58 0%, #8B5CF6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(93,63,88,0.3)',
                flexShrink: 0,
              }}>
                <Activity size={20} color="#FFFFFF" strokeWidth={2} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#1A1024',
                  letterSpacing: '-0.5px',
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  Reports & Analytics
                </h1>
                <p style={{
                  fontSize: '13px',
                  color: '#9B8FA8',
                  margin: 0,
                  marginTop: '2px',
                }}>
                  Executive performance dashboard · Fleet operations overview
                </p>
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>

            {/* Date range pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F5F0FA',
              borderRadius: '12px',
              padding: '4px',
              gap: '2px',
              border: '1px solid #EEE8F5',
            }}>
              <CalendarDays size={14} color="#9B8FA8" style={{ marginLeft: '6px', marginRight: '2px', flexShrink: 0 }} />
              {DATE_RANGES.map(range => (
                <button
                  key={range}
                  onClick={() => setActiveDateRange(range)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '9px',
                    border: 'none',
                    background: activeDateRange === range
                      ? 'linear-gradient(135deg, #5D3F58, #8B5CF6)'
                      : 'transparent',
                    color: activeDateRange === range ? '#FFFFFF' : '#6B5F78',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeDateRange === range ? '0 4px 12px rgba(93,63,88,0.3)' : 'none',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Export buttons */}
            <button
              onClick={handleExportCSV}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1.5px solid #EEE8F5',
                background: '#FFFFFF',
                color: '#5D3F58',
                fontSize: '12px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(93,63,88,0.3)';
                e.currentTarget.style.background = '#FAF5FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#EEE8F5';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              <FileSpreadsheet size={13} />
              Export CSV
            </button>

            <button
              onClick={handleExportPDF}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1.5px solid #EEE8F5',
                background: '#FFFFFF',
                color: '#5D3F58',
                fontSize: '12px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(93,63,88,0.3)';
                e.currentTarget.style.background = '#FAF5FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#EEE8F5';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              <FileText size={13} />
              Export PDF
            </button>

            <button
              onClick={handleDownloadReport}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #5D3F58, #8B5CF6)',
                color: '#FFFFFF',
                fontSize: '12px', fontWeight: '700', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(93,63,88,0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(93,63,88,0.45)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(93,63,88,0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={13} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────── */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* ── KPI Cards ───────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        {kpiCards.map((kpi) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            isPositive={kpi.isPositive}
            icon={kpi.icon}
            accent={kpi.accent}
            subtitle={kpi.subtitle}
          />
        ))}
      </div>

      {/* ── Charts Row 1: Revenue (wide) + Top Vehicles (narrow) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        <RevenueChart />
        <FleetPieChart />
      </div>

      {/* ── Charts Row 2: Fleet Line + Fuel Bar + Trip Donut ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <FuelEfficiencyChart />
        <MaintenanceChart />
        <TripStatusChart />
      </div>

      {/* ── Insight Panels Row ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <InsightsCard />
        <AIRecommendationsCard />
      </div>

      {/* ── Performers + Alerts + Quick Stats ───────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <TopPerformersCard />
        <MaintenanceAlertsCard />
        <QuickStatsPanel />
      </div>

      {/* ── Recent Activity Table ────────────────────────────── */}
      <RecentActivityTable />

      {/* ── Footer spacer ───────────────────────────────────── */}
      <div style={{ height: '8px' }} />
    </div>
  );
}
