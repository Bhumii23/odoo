import { z } from 'zod';

export const createExpenseSchema = z.object({
  vehicleId: z.number().int().positive('Vehicle ID is required'),
  tripId: z.number().int().positive('Trip ID must be positive').optional(),
  type: z.string().min(2, 'Expense type is required'),
  amount: z.number().positive('Amount must be a positive number'),
  date: z.string().datetime().optional(), // Can default to now
});
