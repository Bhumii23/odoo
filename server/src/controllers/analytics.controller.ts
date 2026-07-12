import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';

export const getDashboardMetrics = asyncHandler(async (req: Request, res: Response) => {
  // 1. Fetch KPI Metrics
  const [
    totalVehicles,
    activeVehicles,
    inMaintenance,
    driversAvailable,
    activeTrips,
    pendingTrips,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { status: { in: ['AVAILABLE', 'ON_TRIP'] } } }),
    prisma.vehicle.count({ where: { status: 'IN_SHOP' } }),
    prisma.driver.count({ where: { status: 'AVAILABLE' } }),
    prisma.trip.count({ where: { status: 'DISPATCHED' } }),
    prisma.trip.count({ where: { status: 'DRAFT' } }),
  ]);

  const fleetUtilization = totalVehicles > 0 ? (activeVehicles / totalVehicles) * 100 : 0;

  // 2. Fetch Data for Costs, Efficiency, ROI
  const [
    completedTrips,
    allFuelLogs,
    allExpenses,
    allMaintenanceLogs
  ] = await Promise.all([
    prisma.trip.findMany({ where: { status: 'COMPLETED' } }),
    prisma.fuelLog.findMany(),
    prisma.expense.findMany(),
    prisma.maintenanceLog.findMany()
  ]);

  const totalDistance = completedTrips.reduce((sum, trip) => sum + trip.plannedDistance, 0); // using planned as proxy if final isn't logged separately
  const totalFuelLiters = allFuelLogs.reduce((sum, log) => sum + log.liters, 0);
  const totalFuelCost = allFuelLogs.reduce((sum, log) => sum + log.cost, 0);
  const totalExpenses = allExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalMaintenanceCost = allMaintenanceLogs.reduce((sum, log) => sum + log.cost, 0);
  const totalRevenue = completedTrips.reduce((sum, trip) => sum + (trip.revenue || 0), 0);

  const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
  const operationalCost = totalFuelCost + totalExpenses + totalMaintenanceCost;
  const roi = operationalCost > 0 ? ((totalRevenue - operationalCost) / operationalCost) * 100 : 0;

  const KPI_METRICS = {
    totalVehicles,
    activeVehicles,
    inMaintenance,
    driversAvailable,
    activeTrips,
    pendingTrips,
    fleetUtilization: Number(fleetUtilization.toFixed(2)),
    fuelEfficiency: Number(fuelEfficiency.toFixed(2)),
    operationalCost: Number(operationalCost.toFixed(2)),
    roi: Number(roi.toFixed(2)),
  };

  // 3. Generate Last 6 Months Labels
  const now = new Date();
  const monthsData: { name: string; year: number; month: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsData.push({
      name: d.toLocaleString('default', { month: 'short' }),
      year: d.getFullYear(),
      month: d.getMonth()
    });
  }

  // 4. Time-Series Data (Revenue vs Expense, Fuel Efficiency, Maintenance)
  const revenueExpenseData = monthsData.map(m => {
    // Filter trips for this month
    const monthTrips = completedTrips.filter(t => t.completedAt && t.completedAt.getFullYear() === m.year && t.completedAt.getMonth() === m.month);
    const mRevenue = monthTrips.reduce((sum, t) => sum + (t.revenue || 0), 0);
    
    const mFuel = allFuelLogs.filter(f => f.date.getFullYear() === m.year && f.date.getMonth() === m.month).reduce((s, f) => s + f.cost, 0);
    const mExp = allExpenses.filter(e => e.date.getFullYear() === m.year && e.date.getMonth() === m.month).reduce((s, e) => s + e.amount, 0);
    const mMaint = allMaintenanceLogs.filter(ma => ma.date.getFullYear() === m.year && ma.date.getMonth() === m.month).reduce((s, ma) => s + ma.cost, 0);

    return { name: m.name, revenue: mRevenue, expense: mFuel + mExp + mMaint };
  });

  const fuelEfficiencyData = monthsData.map(m => {
    const mTrips = completedTrips.filter(t => t.completedAt && t.completedAt.getFullYear() === m.year && t.completedAt.getMonth() === m.month);
    const mDist = mTrips.reduce((sum, t) => sum + t.plannedDistance, 0);
    const mFuel = allFuelLogs.filter(f => f.date.getFullYear() === m.year && f.date.getMonth() === m.month).reduce((s, f) => s + f.liters, 0);
    const mEff = mFuel > 0 ? mDist / mFuel : 0;
    return { name: m.name, efficiency: Number(mEff.toFixed(2)) };
  });

  const maintenanceCostData = monthsData.map(m => {
    const mMaint = allMaintenanceLogs.filter(ma => ma.date.getFullYear() === m.year && ma.date.getMonth() === m.month).reduce((s, ma) => s + ma.cost, 0);
    return { name: m.name, cost: mMaint };
  });

  // 5. Pie Chart Data
  const fleetStatusCounts = await prisma.vehicle.groupBy({
    by: ['status'],
    _count: true
  });
  const colorMapFleet: Record<string, string> = { AVAILABLE: '#10B981', ON_TRIP: '#0EA5E9', IN_SHOP: '#F97316', RETIRED: '#EF4444' };
  const fleetStatusData = fleetStatusCounts.map(st => ({
    name: st.status.replace('_', ' '),
    value: st._count,
    color: colorMapFleet[st.status] || '#CBD5E1'
  }));

  const tripStatusCounts = await prisma.trip.groupBy({
    by: ['status'],
    _count: true
  });
  const colorMapTrip: Record<string, string> = { COMPLETED: '#10B981', DISPATCHED: '#3B82F6', DRAFT: '#6B7280', CANCELLED: '#EF4444' };
  const tripStatusData = tripStatusCounts.map(st => ({
    name: st.status,
    value: st._count,
    color: colorMapTrip[st.status] || '#CBD5E1'
  }));

  // 6. Recent Activity
  const recentTrips = await prisma.trip.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { vehicle: true, driver: true, expenses: true }
  });

  const recentActivityData = recentTrips.map(trip => {
    const tripCost = trip.expenses.reduce((s, e) => s + e.amount, 0); // simplified cost
    return {
      id: trip.id,
      vehicle: `${trip.vehicle.registrationNumber} (${trip.vehicle.name})`,
      driver: trip.driver.name,
      trip: `${trip.source} -> ${trip.destination}`,
      distance: `${trip.plannedDistance} km`,
      fuel: 'N/A', // Full correlation requires querying specific fuel log for this trip if linked. We output N/A for MVP or query it.
      cost: tripCost,
      status: trip.status,
      date: trip.createdAt.toISOString().split('T')[0],
    };
  });

  res.status(200).json({
    KPI_METRICS,
    revenueExpenseData,
    fuelEfficiencyData,
    fleetStatusData,
    maintenanceCostData,
    tripStatusData,
    recentActivityData
  });
});

import { parse } from 'json2csv';
import PDFDocument from 'pdfkit';

export const exportCsv = asyncHandler(async (req: Request, res: Response) => {
  const vehicles = await prisma.vehicle.findMany({
    select: {
      registrationNumber: true,
      name: true,
      type: true,
      status: true,
      acquisitionCost: true,
      odometer: true
    }
  });

  if (vehicles.length === 0) {
    res.status(404).json({ error: 'No data to export' });
    return;
  }

  const csv = parse(vehicles);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=transitops_vehicles.csv');
  res.status(200).send(csv);
});

export const exportPdf = asyncHandler(async (req: Request, res: Response) => {
  const doc = new PDFDocument();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=transitops_report.pdf');
  
  doc.pipe(res);

  doc.fontSize(25).text('TransitOps Fleet Report', { align: 'center' });
  doc.moveDown();

  const totalVehicles = await prisma.vehicle.count();
  const totalDrivers = await prisma.driver.count();

  doc.fontSize(16).text(`Total Vehicles: ${totalVehicles}`);
  doc.fontSize(16).text(`Total Drivers: ${totalDrivers}`);
  
  doc.moveDown();
  doc.fontSize(12).text('Generated by TransitOps Automated System.', { align: 'center' });

  doc.end();
});
