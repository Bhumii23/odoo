import { Router } from 'express';
import { getDashboardMetrics, exportCsv, exportPdf } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/dashboard', requirePermission(Module.ANALYTICS, 'VIEW'), getDashboardMetrics);
router.get('/export/csv', requirePermission(Module.ANALYTICS, 'VIEW'), exportCsv);
router.get('/export/pdf', requirePermission(Module.ANALYTICS, 'VIEW'), exportPdf);

export default router;
