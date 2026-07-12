import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';
import { createTripSchema, updateTripStatusSchema } from '../../../shared/schemas/trip.schema';
import { evaluateTripSafety } from '../services/safety.service';
import { TripStatus } from '@prisma/client';

export const getTrips = asyncHandler(async (req: Request, res: Response) => {
  const trips = await prisma.trip.findMany({
    include: {
      vehicle: true,
      driver: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(trips);
});

export const getTripById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const trip = await prisma.trip.findUnique({
    where: { id: Number(id) },
    include: {
      vehicle: true,
      driver: true,
    },
  });

  if (!trip) {
    res.status(404).json({ error: 'Trip not found' });
    return;
  }
  res.status(200).json(trip);
});

export const createTrip = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = createTripSchema.parse(req.body);

    // Verify Vehicle is AVAILABLE
    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } });
    if (!vehicle || vehicle.status !== 'AVAILABLE') {
      res.status(400).json({ error: 'Vehicle is not available for a trip' });
      return;
    }

    if (data.cargoWeight > vehicle.maxLoadCapacity) {
      res.status(400).json({ error: `Cargo weight (${data.cargoWeight} kg) exceeds vehicle capacity (${vehicle.maxLoadCapacity} kg)` });
      return;
    }

    // Verify Driver is AVAILABLE
    const driver = await prisma.driver.findUnique({ where: { id: data.driverId } });
    if (!driver || driver.status !== 'AVAILABLE') {
      res.status(400).json({ error: 'Driver is not available for a trip' });
      return;
    }

    if (driver.licenseExpiry < new Date()) {
      res.status(400).json({ error: 'Driver license is expired' });
      return;
    }

    const trip = await prisma.trip.create({
      data: {
        source: data.source,
        destination: data.destination,
        vehicleId: data.vehicleId,
        driverId: data.driverId,
        cargoWeight: data.cargoWeight,
        plannedDistance: data.plannedDistance,
        status: 'DRAFT',
      },
      include: { vehicle: true, driver: true },
    });

    res.status(201).json(trip);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});

export const updateTripStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tripId = Number(id);

  try {
    const { status, finalOdometer } = updateTripStatusSchema.parse(req.body);

    const trip = await prisma.trip.findUnique({ where: { id: tripId }, include: { vehicle: true } });
    if (!trip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }

    // Status transitions
    if (status === 'DISPATCHED' && trip.status === 'DRAFT') {
      // Use transaction to ensure vehicle/driver statuses sync with trip
      await prisma.$transaction([
        prisma.trip.update({ where: { id: tripId }, data: { status: 'DISPATCHED' } }),
        prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'ON_TRIP' } }),
        prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'ON_TRIP' } }),
      ]);
    } else if (status === 'COMPLETED' && trip.status === 'DISPATCHED') {
      if (finalOdometer === undefined) {
        res.status(400).json({ error: 'finalOdometer is required when completing a trip' });
        return;
      }
      if (finalOdometer < trip.vehicle.odometer) {
        res.status(400).json({ error: 'finalOdometer cannot be less than current odometer' });
        return;
      }

      const now = new Date();
      
      const vehicle = trip.vehicle;
      const newOdometer = finalOdometer;
      const needsMaintenance = (newOdometer - vehicle.lastMaintenanceOdometer) >= vehicle.maintenanceInterval;
      
      // We process the completion in a transaction
      await prisma.$transaction(async (tx) => {
        await tx.trip.update({
          where: { id: tripId },
          data: { status: 'COMPLETED', completedAt: now }
        });
        
        await tx.driver.update({
          where: { id: trip.driverId },
          data: { status: 'AVAILABLE' } // Free the driver
        });

        await tx.vehicle.update({
          where: { id: trip.vehicleId },
          data: { 
            status: 'AVAILABLE', // Free the vehicle
            odometer: newOdometer 
          }
        });

        // Predictive Maintenance Trigger
        if (needsMaintenance) {
          await tx.maintenanceLog.create({
            data: {
              vehicleId: trip.vehicleId,
              serviceType: 'ROUTINE_MAINTENANCE',
              description: `Automated maintenance trigger. Odometer (${newOdometer} km) exceeded maintenance interval of ${vehicle.maintenanceInterval} km.`,
              cost: 0, // Pending cost
              date: now,
              status: 'PENDING_APPROVAL'
            }
          });
        }
      });

      // Safety Evaluation (runs asynchronously after the transaction)
      await evaluateTripSafety(tripId);

    } else if (status === 'CANCELLED' && (trip.status === 'DRAFT' || trip.status === 'DISPATCHED')) {
      if (trip.status === 'DISPATCHED') {
        // Revert vehicle and driver statuses
        await prisma.$transaction([
          prisma.trip.update({ where: { id: tripId }, data: { status: 'CANCELLED' } }),
          prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'AVAILABLE' } }),
          prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'AVAILABLE' } }),
        ]);
      } else {
        await prisma.trip.update({ where: { id: tripId }, data: { status: 'CANCELLED' } });
      }
    } else {
      res.status(400).json({ error: `Cannot transition from ${trip.status} to ${status}` });
      return;
    }

    const updatedTrip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { vehicle: true, driver: true },
    });
    res.status(200).json(updatedTrip);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});
