import { Router } from 'express';
import { 
  getDrivers, 
  getDriverById, 
  createDriver, 
  updateDriver, 
  deleteDriver,
  updateSafetyScore 
} from '../controllers/driver.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

// Require authentication for all driver routes
router.use(authenticate);

// General Driver CRUD
router.get('/', requirePermission(Module.DRIVERS, 'VIEW'), getDrivers);
router.get('/:id', requirePermission(Module.DRIVERS, 'VIEW'), getDriverById);
router.post('/', requirePermission(Module.DRIVERS, 'FULL'), createDriver);
router.put('/:id', requirePermission(Module.DRIVERS, 'FULL'), updateDriver);
router.delete('/:id', requirePermission(Module.DRIVERS, 'FULL'), deleteDriver);

// Safety Score endpoint (strictly for SAFETY_OFFICER handled in controller)
router.put('/:id/safety-score', requirePermission(Module.DRIVERS, 'FULL'), updateSafetyScore);

export default router;