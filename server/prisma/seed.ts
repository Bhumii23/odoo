import { PrismaClient, Role, Module, AccessLevel, VehicleStatus, DriverStatus, TripStatus, MaintenanceStatus, ServiceCategory, LicenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    // FleetManager
    { role: Role.FLEET_MANAGER, module: Module.FLEET, access: AccessLevel.FULL },
    { role: Role.FLEET_MANAGER, module: Module.DRIVERS, access: AccessLevel.FULL },
    { role: Role.FLEET_MANAGER, module: Module.TRIPS, access: AccessLevel.NONE },
    { role: Role.FLEET_MANAGER, module: Module.FUEL_EXPENSES, access: AccessLevel.NONE },
    { role: Role.FLEET_MANAGER, module: Module.ANALYTICS, access: AccessLevel.FULL },
    { role: Role.FLEET_MANAGER, module: Module.MAINTENANCE, access: AccessLevel.FULL }, // Chosen FULL (managers oversee repair)
    { role: Role.FLEET_MANAGER, module: Module.SETTINGS, access: AccessLevel.FULL },    // Chosen FULL (managers configure the system)
    
    // Dispatcher
    { role: Role.DISPATCHER, module: Module.FLEET, access: AccessLevel.VIEW },
    { role: Role.DISPATCHER, module: Module.DRIVERS, access: AccessLevel.NONE },
    { role: Role.DISPATCHER, module: Module.TRIPS, access: AccessLevel.FULL },
    { role: Role.DISPATCHER, module: Module.FUEL_EXPENSES, access: AccessLevel.NONE },
    { role: Role.DISPATCHER, module: Module.ANALYTICS, access: AccessLevel.NONE },
    { role: Role.DISPATCHER, module: Module.MAINTENANCE, access: AccessLevel.VIEW }, // Chosen VIEW (dispatchers need to see shop status)
    { role: Role.DISPATCHER, module: Module.SETTINGS, access: AccessLevel.NONE },    // Chosen NONE
    
    // SafetyOfficer
    { role: Role.SAFETY_OFFICER, module: Module.FLEET, access: AccessLevel.NONE },
    { role: Role.SAFETY_OFFICER, module: Module.DRIVERS, access: AccessLevel.FULL },
    { role: Role.SAFETY_OFFICER, module: Module.TRIPS, access: AccessLevel.VIEW },
    { role: Role.SAFETY_OFFICER, module: Module.FUEL_EXPENSES, access: AccessLevel.NONE },
    { role: Role.SAFETY_OFFICER, module: Module.ANALYTICS, access: AccessLevel.NONE },
    { role: Role.SAFETY_OFFICER, module: Module.MAINTENANCE, access: AccessLevel.VIEW }, // Chosen VIEW (safety checks might involve maintenance)
    { role: Role.SAFETY_OFFICER, module: Module.SETTINGS, access: AccessLevel.NONE },    // Chosen NONE
    
    // FinancialAnalyst
    { role: Role.FINANCIAL_ANALYST, module: Module.FLEET, access: AccessLevel.VIEW },
    { role: Role.FINANCIAL_ANALYST, module: Module.DRIVERS, access: AccessLevel.NONE },
    { role: Role.FINANCIAL_ANALYST, module: Module.TRIPS, access: AccessLevel.NONE },
    { role: Role.FINANCIAL_ANALYST, module: Module.FUEL_EXPENSES, access: AccessLevel.FULL },
    { role: Role.FINANCIAL_ANALYST, module: Module.ANALYTICS, access: AccessLevel.FULL },
    { role: Role.FINANCIAL_ANALYST, module: Module.MAINTENANCE, access: AccessLevel.VIEW }, // Chosen VIEW (to check costs)
    { role: Role.FINANCIAL_ANALYST, module: Module.SETTINGS, access: AccessLevel.NONE },    // Chosen NONE
  ];

  console.log('Seeding RolePermissions matrix...');

  for (const perm of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        role_module: {
          role: perm.role,
          module: perm.module,
        },
      },
      update: {
        access: perm.access,
      },
      create: perm,
    });
  }
  
  console.log('Cleaning up existing data...');
  await prisma.expense.deleteMany();
  await prisma.fuelLog.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.vehicleDocument.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.driver.deleteMany();

  console.log('Seeding Vehicles...');
  const vehiclesData = [
    { registrationNumber: 'GJ01AB4521', name: 'VAN-05', type: 'Van', maxLoadCapacity: 500, odometer: 74000, acquisitionCost: 620000, status: VehicleStatus.AVAILABLE },
    { registrationNumber: 'GJ01AB9981', name: 'TRUCK-11', type: 'Truck', maxLoadCapacity: 5000, odometer: 182000, acquisitionCost: 2450000, status: VehicleStatus.ON_TRIP },
    { registrationNumber: 'GJ01AB1120', name: 'MINI-03', type: 'Mini', maxLoadCapacity: 1000, odometer: 66000, acquisitionCost: 410000, status: VehicleStatus.IN_SHOP },
    { registrationNumber: 'GJ01AB0008', name: 'VAN-09', type: 'Van', maxLoadCapacity: 750, odometer: 241900, acquisitionCost: 590000, status: VehicleStatus.RETIRED },
    { registrationNumber: 'MH02XY8833', name: 'TRUCK-15', type: 'Truck', maxLoadCapacity: 8000, odometer: 45000, acquisitionCost: 3200000, status: VehicleStatus.AVAILABLE },
    { registrationNumber: 'DL04ZC9922', name: 'BUS-01', type: 'Bus', maxLoadCapacity: 3000, odometer: 120000, acquisitionCost: 1500000, status: VehicleStatus.AVAILABLE },
    { registrationNumber: 'KA05PQ1111', name: 'PICKUP-02', type: 'Pickup', maxLoadCapacity: 1500, odometer: 32000, acquisitionCost: 850000, status: VehicleStatus.AVAILABLE },
    { registrationNumber: 'UP32MN4455', name: 'VAN-12', type: 'Van', maxLoadCapacity: 600, odometer: 95000, acquisitionCost: 700000, status: VehicleStatus.ON_TRIP },
    { registrationNumber: 'TN09KL6677', name: 'TRUCK-22', type: 'Truck', maxLoadCapacity: 10000, odometer: 210000, acquisitionCost: 4500000, status: VehicleStatus.IN_SHOP },
    { registrationNumber: 'RJ14RS8899', name: 'MINI-08', type: 'Mini', maxLoadCapacity: 1200, odometer: 15000, acquisitionCost: 520000, status: VehicleStatus.AVAILABLE },
  ];

  const vehicles = [];
  for (const v of vehiclesData) {
    vehicles.push(await prisma.vehicle.create({ data: v }));
  }

  console.log('Seeding Drivers...');
  const driversData = [
    { name: 'John Doe', licenseNumber: 'LIC-1001', licenseCategory: LicenseCategory.LMV, licenseExpiry: new Date('2028-05-10'), contactNumber: '9876543210', safetyScore: 95, status: DriverStatus.AVAILABLE },
    { name: 'Jane Smith', licenseNumber: 'LIC-1002', licenseCategory: LicenseCategory.HMV, licenseExpiry: new Date('2027-11-22'), contactNumber: '9876543211', safetyScore: 88, status: DriverStatus.ON_TRIP },
    { name: 'Alex Johnson', licenseNumber: 'LIC-1003', licenseCategory: LicenseCategory.LMV_TR, licenseExpiry: new Date('2025-01-15'), contactNumber: '9876543212', safetyScore: 99, status: DriverStatus.AVAILABLE },
    { name: 'Sarah Williams', licenseNumber: 'LIC-1004', licenseCategory: LicenseCategory.HGMV, licenseExpiry: new Date('2029-08-30'), contactNumber: '9876543213', safetyScore: 75, status: DriverStatus.OFF_DUTY },
    { name: 'Michael Brown', licenseNumber: 'LIC-1005', licenseCategory: LicenseCategory.HMV, licenseExpiry: new Date('2026-03-12'), contactNumber: '9876543214', safetyScore: 92, status: DriverStatus.ON_TRIP },
    { name: 'Emily Davis', licenseNumber: 'LIC-1006', licenseCategory: LicenseCategory.LMV, licenseExpiry: new Date('2030-07-19'), contactNumber: '9876543215', safetyScore: 100, status: DriverStatus.AVAILABLE },
  ];

  const drivers = [];
  for (const d of driversData) {
    drivers.push(await prisma.driver.create({ data: d }));
  }

  console.log('Seeding Trips...');
  const tripsData = [
    { source: 'Mumbai', destination: 'Pune', vehicleId: vehicles[0].id, driverId: drivers[0].id, cargoWeight: 450, plannedDistance: 150, status: TripStatus.COMPLETED, revenue: 12000, completedAt: new Date(Date.now() - 86400000 * 2) },
    { source: 'Delhi', destination: 'Jaipur', vehicleId: vehicles[1].id, driverId: drivers[1].id, cargoWeight: 4800, plannedDistance: 280, status: TripStatus.DISPATCHED, revenue: 35000 },
    { source: 'Bangalore', destination: 'Chennai', vehicleId: vehicles[4].id, driverId: drivers[2].id, cargoWeight: 7500, plannedDistance: 350, status: TripStatus.COMPLETED, revenue: 42000, completedAt: new Date(Date.now() - 86400000 * 5) },
    { source: 'Ahmedabad', destination: 'Surat', vehicleId: vehicles[7].id, driverId: drivers[4].id, cargoWeight: 550, plannedDistance: 260, status: TripStatus.DISPATCHED, revenue: 18000 },
    { source: 'Hyderabad', destination: 'Vijayawada', vehicleId: vehicles[5].id, driverId: drivers[5].id, cargoWeight: 2800, plannedDistance: 275, status: TripStatus.DRAFT, revenue: 25000 },
    { source: 'Kolkata', destination: 'Bhubaneswar', vehicleId: vehicles[6].id, driverId: drivers[0].id, cargoWeight: 1400, plannedDistance: 440, status: TripStatus.CANCELLED, revenue: 0 },
  ];
  
  const trips = [];
  for (const t of tripsData) {
    trips.push(await prisma.trip.create({ data: t }));
  }

  console.log('Seeding Fuel Logs...');
  const fuelLogsData = [
    { vehicleId: vehicles[0].id, liters: 45.5, cost: 4500, date: new Date(Date.now() - 86400000 * 1) },
    { vehicleId: vehicles[1].id, liters: 120.0, cost: 11500, date: new Date(Date.now() - 86400000 * 3) },
    { vehicleId: vehicles[4].id, liters: 180.5, cost: 17000, date: new Date(Date.now() - 86400000 * 6) },
    { vehicleId: vehicles[7].id, liters: 35.0, cost: 3300, date: new Date(Date.now() - 86400000 * 2) },
    { vehicleId: vehicles[5].id, liters: 80.0, cost: 7600, date: new Date(Date.now() - 86400000 * 10) },
    { vehicleId: vehicles[0].id, liters: 40.0, cost: 3900, date: new Date(Date.now() - 86400000 * 15) },
    { vehicleId: vehicles[1].id, liters: 110.0, cost: 10500, date: new Date(Date.now() - 86400000 * 12) },
  ];
  for (const f of fuelLogsData) {
    await prisma.fuelLog.create({ data: f });
  }

  console.log('Seeding Maintenance Logs...');
  const maintenanceData = [
    { vehicleId: vehicles[2].id, driverId: null, serviceType: ServiceCategory.MECHANICAL_FAILURE, description: 'Engine overhaul', cost: 45000, date: new Date(), status: MaintenanceStatus.IN_PROGRESS },
    { vehicleId: vehicles[8].id, driverId: null, serviceType: ServiceCategory.ACCIDENT_DAMAGE, description: 'Bumper replacement', cost: 18000, date: new Date(Date.now() - 86400000 * 1), status: MaintenanceStatus.IN_PROGRESS },
    { vehicleId: vehicles[0].id, driverId: drivers[0].id, serviceType: ServiceCategory.ROUTINE_MAINTENANCE, description: 'Oil change and filters', cost: 3500, date: new Date(Date.now() - 86400000 * 20), status: MaintenanceStatus.COMPLETED },
    { vehicleId: vehicles[1].id, driverId: drivers[1].id, serviceType: ServiceCategory.ROUTINE_MAINTENANCE, description: 'Tire replacement (x6)', cost: 72000, date: new Date(Date.now() - 86400000 * 45), status: MaintenanceStatus.COMPLETED },
  ];
  for (const m of maintenanceData) {
    await prisma.maintenanceLog.create({ data: m });
  }

  console.log('Seeding Expenses...');
  const expensesData = [
    { tripId: trips[0].id, vehicleId: vehicles[0].id, type: 'TOLL', amount: 450, date: new Date(Date.now() - 86400000 * 2) },
    { tripId: trips[0].id, vehicleId: vehicles[0].id, type: 'FOOD', amount: 300, date: new Date(Date.now() - 86400000 * 2) },
    { tripId: trips[1].id, vehicleId: vehicles[1].id, type: 'TOLL', amount: 1250, date: new Date(Date.now() - 86400000 * 1) },
    { tripId: trips[2].id, vehicleId: vehicles[4].id, type: 'LODGING', amount: 1500, date: new Date(Date.now() - 86400000 * 5) },
    { tripId: trips[2].id, vehicleId: vehicles[4].id, type: 'TOLL', amount: 2100, date: new Date(Date.now() - 86400000 * 5) },
    { tripId: trips[3].id, vehicleId: vehicles[7].id, type: 'REPAIR', amount: 850, date: new Date(Date.now() - 86400000 * 0) },
  ];
  for (const e of expensesData) {
    await prisma.expense.create({ data: e });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
