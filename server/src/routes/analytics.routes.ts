import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/dashboard', requirePermission(Module.ANALYTICS, 'VIEW'), getDashboardMetrics);

export default router;
