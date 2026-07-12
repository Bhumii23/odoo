import { z } from 'zod';

export const VehicleStatusEnum = z.enum(['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED']);

export const VehicleSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  maxLoadCapacity: z.number().positive('Max load capacity must be positive'),
  odometer: z.number().min(0, 'Odometer must be 0 or greater'),
  acquisitionCost: z.number().positive('Acquisition cost must be positive'),
  status: VehicleStatusEnum.optional().default('AVAILABLE'),
});

// Partial schema for updates
export const VehicleUpdateSchema = VehicleSchema.partial();

export type VehicleInput = z.infer<typeof VehicleSchema>;
export type VehicleUpdateInput = z.infer<typeof VehicleUpdateSchema>;
