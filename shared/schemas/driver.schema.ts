import { z } from 'zod';

export const DriverStatusEnum = z.enum([
  'AVAILABLE',
  'ON_TRIP',
  'OFF_DUTY',
  'SUSPENDED',
]);

export const LicenseCategoryEnum = z.enum([
  'LMV',
  'LMV_TR',
  'HMV',
  'HGMV',
  'HPMV',
  'MCWG',
]);

/**
 * Validation schema for registering a new driver.
 * Enforces strict typing, length constraints, and valid dates.
 */
export const createDriverSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),

  licenseNumber: z.string().min(4, "License Number is required"),
  
  licenseCategory: LicenseCategoryEnum,
  
  licenseExpiry: z.string().refine((val) => {
    const parsedDate = Date.parse(val);
    if (isNaN(parsedDate)) return false;
    return parsedDate > Date.now();
  }, {
    message: "Invalid date format or license has already expired",
  }),
  
  contactNumber: z.string().min(7, "Valid Contact Number is required"),
  
  status: DriverStatusEnum.optional(),
});

/**
 * Validation schema for updating a driver.
 * All fields are optional. We explicitly define it this way rather than using `.partial()` 
 * to ensure that Zod doesn't accidentally inject default fallback values (like setting status back to AVAILABLE).
 */
export const updateDriverSchema = z.object({
  name: z.string().min(2).optional(),
  licenseNumber: z.string().min(4).optional(),
  licenseCategory: LicenseCategoryEnum.optional(),
  licenseExpiry: z.string().refine((val) => {
    const parsedDate = Date.parse(val);
    if (isNaN(parsedDate)) return false;
    return parsedDate > Date.now();
  }, {
    message: "Invalid date format or license has already expired",
  }).optional(),
  contactNumber: z.string().min(7).optional(),
  status: DriverStatusEnum.optional(),
});