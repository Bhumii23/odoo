import { Router } from 'express';
import { getMaintenanceLogs, getMaintenanceLogById, createMaintenanceLog, updateMaintenanceStatus } from '../controllers/maintenance.controller';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

router.get('/', requirePermission(Module.MAINTENANCE, 'VIEW'), getMaintenanceLogs);
router.get('/:id', requirePermission(Module.MAINTENANCE, 'VIEW'), getMaintenanceLogById);
router.post('/', requirePermission(Module.MAINTENANCE, 'FULL'), createMaintenanceLog);

// Authorizing or completing maintenance requests requires FULL access
router.patch('/:id/status', requirePermission(Module.MAINTENANCE, 'FULL'), updateMaintenanceStatus);

export default router;
