import { Router } from 'express';
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

// All routes require authentication and FLEET module access at some level
router.use(authenticate);

router.get('/', requirePermission(Module.FLEET, 'VIEW'), getVehicles);
router.get('/:id', requirePermission(Module.FLEET, 'VIEW'), getVehicleById);
router.post('/', requirePermission(Module.FLEET, 'FULL'), createVehicle);
router.put('/:id', requirePermission(Module.FLEET, 'FULL'), updateVehicle);
router.delete('/:id', requirePermission(Module.FLEET, 'FULL'), deleteVehicle);

export default router;
