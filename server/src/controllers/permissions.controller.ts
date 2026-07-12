import { Request, Response } from 'express';
import { getCachedPermissions } from '../middleware/requirePermission';
import { asyncHandler } from './auth.controller';
import { AccessLevel } from '@prisma/client';

export const getMyPermissions = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const role = req.user.role;
  const permissionCache = await getCachedPermissions();
  const userPermissions = permissionCache?.[role] || {};

  // We want to return a clean flat object like { FLEET: 'FULL', DRIVERS: 'FULL', ... }
  // To ensure all modules are returned even if they default to NONE
  const defaultModules = [
    'FLEET', 'DRIVERS', 'TRIPS', 'MAINTENANCE', 'FUEL_EXPENSES', 'ANALYTICS', 'SETTINGS'
  ];

  const result: Record<string, string> = {};
  
  for (const mod of defaultModules) {
    result[mod] = userPermissions[mod] || AccessLevel.NONE;
  }

  res.status(200).json(result);
});
