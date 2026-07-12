import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { Module, AccessLevel, Role } from '@prisma/client';

// Cache for permissions to avoid DB hits on every request
// Structure: { ROLE: { MODULE: 'ACCESS_LEVEL' } }
let permissionCache: Record<string, Record<string, AccessLevel>> | null = null;

const loadPermissions = async () => {
  const permissions = await prisma.rolePermission.findMany();
  const cache: Record<string, Record<string, AccessLevel>> = {};
  
  for (const p of permissions) {
    if (!cache[p.role]) {
      cache[p.role] = {};
    }
    cache[p.role]![p.module] = p.access;
  }
  
  permissionCache = cache;
};

export const requirePermission = (module: Module, minLevel: 'VIEW' | 'FULL') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        return;
      }

      const role = req.user.role;

      // Lazy load cache if it hasn't been initialized
      if (!permissionCache) {
        await loadPermissions();
      }

      const access = permissionCache?.[role]?.[module] || AccessLevel.NONE;

      if (access === AccessLevel.NONE) {
        res.status(403).json({ error: 'Forbidden: Insufficient permissions for this module' });
        return;
      }

      if (minLevel === 'FULL' && access !== AccessLevel.FULL) {
        res.status(403).json({ error: 'Forbidden: FULL access required for this action' });
        return;
      }

      // If minLevel is VIEW and access is VIEW or FULL, allow.
      // If access is FULL, allow everything.
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const getCachedPermissions = async () => {
  if (!permissionCache) {
    await loadPermissions();
  }
  return permissionCache;
};
