import { z } from 'zod';

export const createFuelLogSchema = z.object({
  vehicleId: z.number().int().positive('Vehicle ID is required'),
  liters: z.number().positive('Liters must be a positive number'),
  cost: z.number().nonnegative('Cost must be non-negative'),
  date: z.string().datetime().optional(),
});
