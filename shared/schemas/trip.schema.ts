import { z } from 'zod';

export const createTripSchema = z.object({
  source: z.string().min(2, 'Source location is required'),
  destination: z.string().min(2, 'Destination location is required'),
  vehicleId: z.number().int().positive('Vehicle ID is required'),
  driverId: z.number().int().positive('Driver ID is required'),
  cargoWeight: z.number().nonnegative('Cargo weight must be a positive number'),
  plannedDistance: z.number().positive('Planned distance must be a positive number'),
});

export const updateTripStatusSchema = z.object({
  status: z.enum(['DRAFT', 'DISPATCHED', 'COMPLETED', 'CANCELLED']),
  finalOdometer: z.number().positive('Final odometer must be a positive number').optional(),
});
