// List data for Filter Select Dropdowns
export const FILTER_OPTIONS = {
  months: ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
  vehicleTypes: ['All', 'Van', 'Truck', 'Mini'],
  regions: ['All', 'North', 'South', 'East', 'West'],
  drivers: ['All', 'Raven K.', 'John D.', 'Sarah M.', 'Alex P.'],
  tripStatuses: ['All', 'Completed', 'Draft', 'Cancelled', 'Dispatched'],
};

// Raw KPI metrics maps keyed by filter categories for realistic dynamic changes
export const KPI_METRICS = {
  totalVehicles: 48,
  activeVehicles: 30,
  inMaintenance: 6,
  driversAvailable: 15,
  activeTrips: 18,
  pendingTrips: 5,
  fleetUtilization: 82.5,
  fuelEfficiency: '8.4 km/L',
  operationalCost: '₹ 12,45,000',
  roi: '18.4%',
};

// Monthly Revenue vs Expense (used in Bar Chart)
export const revenueExpenseData = [
  { name: 'Jan', revenue: 450000, expense: 280000 },
  { name: 'Feb', revenue: 520000, expense: 310000 },
  { name: 'Mar', revenue: 490000, expense: 290000 },
  { name: 'Apr', revenue: 610000, expense: 340000 },
  { name: 'May', revenue: 580000, expense: 330000 },
  { name: 'Jun', revenue: 670000, expense: 380000 },
  { name: 'Jul', revenue: 720000, expense: 410000 },
];

// Monthly Fuel Efficiency Trend (used in Line Chart)
export const fuelEfficiencyData = [
  { name: 'Jan', efficiency: 7.8 },
  { name: 'Feb', efficiency: 8.0 },
  { name: 'Mar', efficiency: 8.2 },
  { name: 'Apr', efficiency: 8.1 },
  { name: 'May', efficiency: 8.4 },
  { name: 'Jun', efficiency: 8.5 },
  { name: 'Jul', efficiency: 8.7 },
];

// Fleet status breakdown counts (used in Pie Chart)
export const fleetStatusData = [
  { name: 'Available', value: 18, color: '#10B981' }, // emerald-500
  { name: 'On Trip', value: 20, color: '#0EA5E9' },   // sky-500
  { name: 'Maintenance', value: 6, color: '#F97316' }, // orange-500
  { name: 'Retired', value: 4, color: '#EF4444' },     // red-500
];

// Monthly Maintenance Costs (used in Area Chart)
export const maintenanceCostData = [
  { name: 'Jan', cost: 45000 },
  { name: 'Feb', cost: 58000 },
  { name: 'Mar', cost: 39000 },
  { name: 'Apr', cost: 72000 },
  { name: 'May', cost: 51000 },
  { name: 'Jun', cost: 65000 },
  { name: 'Jul', cost: 48000 },
];

// Trip status distributions (used in Donut Chart)
export const tripStatusData = [
  { name: 'Completed', value: 142, color: '#10B981' },
  { name: 'Dispatched', value: 24, color: '#3B82F6' },
  { name: 'Draft', value: 12, color: '#6B7280' },
  { name: 'Cancelled', value: 8, color: '#EF4444' },
];

// Recent activity records (used in Table)
export const recentActivityData = [
  {
    id: 1,
    vehicle: 'GJ01AB4521 (VAN-05)',
    driver: 'John D.',
    trip: 'Ahmedabad → Baroda',
    distance: '120 km',
    fuel: '15 Liters',
    cost: '₹ 8,500',
    status: 'Completed',
    date: '2026-07-12',
  },
  {
    id: 2,
    vehicle: 'GJ01AB9981 (TRUCK-11)',
    driver: 'Sarah M.',
    trip: 'Surat → Mumbai',
    distance: '280 km',
    fuel: '62 Liters',
    cost: '₹ 22,000',
    status: 'Dispatched',
    date: '2026-07-12',
  },
  {
    id: 3,
    vehicle: 'GJ01AB1120 (MINI-03)',
    driver: 'Alex P.',
    trip: 'Rajkot → Jamnagar',
    distance: '90 km',
    fuel: '11 Liters',
    cost: '₹ 4,800',
    status: 'Draft',
    date: '2026-07-11',
  },
  {
    id: 4,
    vehicle: 'GJ01AB0008 (VAN-09)',
    driver: 'Raven K.',
    trip: 'Ghandinagar → Anand',
    distance: '85 km',
    fuel: '10 Liters',
    cost: '₹ 3,900',
    status: 'Cancelled',
    date: '2026-07-10',
  },
];