import { Router } from 'express';
import { getFuelLogs, createFuelLog } from '../controllers/fuel.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/', requirePermission(Module.FUEL_EXPENSES, 'VIEW'), getFuelLogs);
router.post('/', requirePermission(Module.FUEL_EXPENSES, 'FULL'), createFuelLog);

export default router;
