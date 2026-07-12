import { Router } from 'express';
import { getTrips, getTripById, createTrip, updateTripStatus } from '../controllers/trip.controller';
import { requirePermission } from '../middleware/requirePermission';
import { Module } from '@prisma/client';

const router = Router();

router.get('/', requirePermission(Module.TRIPS, 'VIEW'), getTrips);
router.get('/:id', requirePermission(Module.TRIPS, 'VIEW'), getTripById);
router.post('/', requirePermission(Module.TRIPS, 'FULL'), createTrip);
router.patch('/:id/status', requirePermission(Module.TRIPS, 'FULL'), updateTripStatus);

export default router;
