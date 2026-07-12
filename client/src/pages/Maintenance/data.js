export const initialVehicles = [
  { id: 'VEH-201', name: 'VR-12', type: 'Van', status: 'Available', capacityKg: 650, lastService: '2026-05-04' },
  { id: 'VEH-202', name: 'TR-04', type: 'Truck', status: 'Available', capacityKg: 1800, lastService: '2026-06-02' },
  { id: 'VEH-203', name: 'EV-09', type: 'Mini', status: 'In Shop', capacityKg: 420, lastService: '2026-07-01' },
  { id: 'VEH-204', name: 'TR-07', type: 'Truck', status: 'Available', capacityKg: 2200, lastService: '2026-06-19' },
];

export const serviceTypeOptions = ['Routine Inspection', 'Brake Service', 'Engine Tune-Up', 'Battery Replacement', 'Tire Rotation', 'Full Inspection'];
export const workshops = ['Central Workshop', 'North Garage', 'West Bay'];
export const mechanics = ['Aman Rao', 'Rina Patel', 'Daniel Cruz', 'Sara Kim'];
export const priorities = ['Low', 'Medium', 'High', 'Critical'];

export const initialServiceHistory = [
  {
    id: 'SRV-1001',
    vehicleId: 'VEH-203',
    vehicleName: 'EV-09',
    serviceType: 'Battery Replacement',
    workshop: 'Central Workshop',
    mechanic: 'Aman Rao',
    scheduledDate: '2026-07-01',
    estimatedCost: 4200,
    priority: 'High',
    description: 'Battery pack inspection and replacement for city routes.',
    status: 'Completed',
    completedAt: '2026-07-03',
  },
  {
    id: 'SRV-1002',
    vehicleId: 'VEH-202',
    vehicleName: 'TR-04',
    serviceType: 'Brake Service',
    workshop: 'North Garage',
    mechanic: 'Rina Patel',
    scheduledDate: '2026-07-10',
    estimatedCost: 7400,
    priority: 'Critical',
    description: 'Brake pads and hydraulic inspection before heavy duty assignments.',
    status: 'Scheduled',
  },
];
