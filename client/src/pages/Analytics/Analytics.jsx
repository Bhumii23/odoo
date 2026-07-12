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
import api from '../../lib/api';

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

function buildCSVContent(metrics) {
  if (!metrics) return '';
  return (
    'data:text/csv;charset=utf-8,' +
    'Metric,Value,Change\n' +
    `Total Vehicles,${metrics.totalVehicles},N/A\n` +
    `Active Vehicles,${metrics.activeVehicles},+2%\n` +
    `Fleet Utilization,${metrics.fleetUtilization}%,+4%\n` +
    `Operational Cost,${metrics.operationalCost},-12%\n`
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
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        setMetrics(res.data);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Export handlers (unchanged logic)
  const handleExportCSV = () => {
    const encodedUri = encodeURI(buildCSVContent(metrics));
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
  const kpiCards = metrics ? [
    { title: 'Fleet Utilization', value: `${metrics.fleetUtilization}%`, change: '+4%', isPositive: true, icon: TrendingUp, accent: 'purple', subtitle: 'vs last month' },
    { title: 'Fuel Efficiency', value: metrics.fuelEfficiency, change: '+1.2%', isPositive: true, icon: Gauge, accent: 'amber', subtitle: 'vs last month' },
    { title: 'Operational Cost', value: metrics.operationalCost, change: '-12%', isPositive: true, icon: DollarSign, accent: 'emerald', subtitle: 'vs last month' },
    { title: 'Vehicle ROI', value: metrics.roi, change: '+0.8%', isPositive: true, icon: LineChart, accent: 'blue', subtitle: 'vs last month' },
    { title: 'Total Trips', value: metrics.activeTrips + metrics.pendingTrips, change: '+8%', isPositive: true, icon: Compass, accent: 'cyan', subtitle: 'active + pending' },
    { title: 'Revenue (MTD)', value: '₹7.2L', change: '+7.5%', isPositive: true, icon: Activity, accent: 'rose', subtitle: 'month to date' },
  ] : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #F1F5F9',
        boxShadow: '0 8px 30px rgb(0,0,0,0.012)',
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
                background: 'linear-gradient(135deg, #7c5a9f 0%, #5e3d75 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(124, 90, 159, 0.12)',
                flexShrink: 0,
              }}>
                <Activity size={20} color="#FFFFFF" strokeWidth={2} />
              </div>
              <div className="text-left">
                <h1 style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#1E293B',
                  letterSpacing: '-0.5px',
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  Reports & Analytics
                </h1>
                <p style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0,
                  marginTop: '4px',
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
              background: '#F8FAFC',
              borderRadius: '12px',
              padding: '4px',
              gap: '2px',
              border: '1px solid #F1F5F9',
            }}>
              <CalendarDays size={14} color="#94A3B8" style={{ marginLeft: '6px', marginRight: '2px', flexShrink: 0 }} />
              {DATE_RANGES.map(range => (
                <button
                  key={range}
                  onClick={() => setActiveDateRange(range)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '9px',
                    border: 'none',
                    background: activeDateRange === range
                      ? 'linear-gradient(135deg, #7c5a9f, #5e3d75)'
                      : 'transparent',
                    color: activeDateRange === range ? '#FFFFFF' : '#64748B',
                    fontSize: '12px',
                    fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeDateRange === range ? '0 4px 12px rgba(124, 90, 159, 0.15)' : 'none',
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
                border: '1.5px solid #F1F5F9',
                background: '#FFFFFF',
                color: '#64748B',
                fontSize: '12px', fontWeight: '700', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124, 90, 159, 0.2)';
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.color = '#7c5a9f';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#F1F5F9';
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#64748B';
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
                border: '1.5px solid #F1F5F9',
                background: '#FFFFFF',
                color: '#64748B',
                fontSize: '12px', fontWeight: '700', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124, 90, 159, 0.2)';
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.color = '#7c5a9f';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#F1F5F9';
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#64748B';
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
                background: 'linear-gradient(135deg, #7c5a9f, #5e3d75)',
                color: '#FFFFFF',
                fontSize: '12px', fontWeight: '700', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(124, 90, 159, 0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 90, 159, 0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(124, 90, 159, 0.2)';
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
