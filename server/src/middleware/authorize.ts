import { Request, Response, NextFunction } from 'express';

/**
 * @deprecated This simple role-based authorize middleware is deprecated.
 * Please use requirePermission(module, accessLevel) from './requirePermission.ts' instead,
 * which implements the new matrix-driven RBAC system.
 */

/**
 * Middleware factory to authorize specific roles.
 * Usage: router.get('/some-route', authenticate, authorize(['FLEET_MANAGER']), handler);
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      return;
    }

    next();
  };
};
