import { Router } from 'express';
import { getExpenses, createExpense } from '../controllers/expense.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/', requirePermission(Module.FUEL_EXPENSES, 'VIEW'), getExpenses);
router.post('/', requirePermission(Module.FUEL_EXPENSES, 'FULL'), createExpense);

export default router;
