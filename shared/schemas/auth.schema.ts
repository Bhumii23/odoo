import { z } from 'zod';

export const RoleEnum = z.enum([
  'FLEET_MANAGER',
  'DISPATCHER',
  'SAFETY_OFFICER',
  'FINANCIAL_ANALYST',
]);

export const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: RoleEnum,
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
