import { z } from 'zod';

export const createMaintenanceSchema = z.object({
  vehicleId: z.number().int().positive('Vehicle ID is required'),
  driverId: z.number().int().positive('Driver ID is required').optional(),
  serviceType: z.enum(['ROUTINE_MAINTENANCE', 'MECHANICAL_FAILURE', 'ACCIDENT_DAMAGE']),
  description: z.string().optional(),
  cost: z.number().nonnegative('Cost must be a positive number'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const updateMaintenanceStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED']),
});
