import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';
import { VehicleSchema, VehicleUpdateSchema } from '../../../shared/schemas/vehicle.schema';
import { Prisma } from '@prisma/client';

export const getVehicles = asyncHandler(async (req: Request, res: Response) => {
  const { type, status, search } = req.query;

  const where: Prisma.VehicleWhereInput = {};

  if (type) {
    where.type = type as string;
  }
  
  if (status) {
    where.status = status as any;
  }

  if (search) {
    where.OR = [
      { registrationNumber: { contains: search as string, mode: 'insensitive' } },
      { name: { contains: search as string, mode: 'insensitive' } }
    ];
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json(vehicles);
});

export const getVehicleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: Number(id) }
  });

  if (!vehicle) {
    res.status(404).json({ error: 'Vehicle not found' });
    return;
  }

  res.status(200).json(vehicle);
});

export const createVehicle = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = VehicleSchema.parse(req.body);

    const existing = await prisma.vehicle.findUnique({
      where: { registrationNumber: data.registrationNumber }
    });

    if (existing) {
      res.status(409).json({ error: 'Registration number must be unique' });
      return;
    }

    const vehicle = await prisma.vehicle.create({
      data: data as any,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues[0].message, field: String(error.issues[0].path[0]) });
      return;
    }
    throw error;
  }
});

export const updateVehicle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const vehicleId = Number(id);

  try {
    const data = VehicleUpdateSchema.parse(req.body);

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!existingVehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    if (data.registrationNumber && data.registrationNumber !== existingVehicle.registrationNumber) {
      const duplicate = await prisma.vehicle.findUnique({
        where: { registrationNumber: data.registrationNumber }
      });
      if (duplicate) {
        res.status(409).json({ error: 'Registration number must be unique' });
        return;
      }
    }

    /*
      BUSINESS RULE EXPLANATION:
      If a vehicle is currently ON_TRIP, it cannot be manually transitioned to RETIRED or IN_SHOP 
      through this generic vehicle update endpoint. Vehicles on an active trip must complete 
      the trip (via the Trip workflow) or undergo proper maintenance workflow (via the Maintenance workflow).
      This prevents data inconsistency where a trip remains active but the vehicle is technically in the shop or retired.
    */
    if (
      existingVehicle.status === 'ON_TRIP' && 
      data.status && 
      (data.status === 'RETIRED' || data.status === 'IN_SHOP')
    ) {
      res.status(400).json({ error: 'Cannot manually transition an active trip vehicle to RETIRED or IN_SHOP' });
      return;
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: data as any,
    });

    res.status(200).json(updatedVehicle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues[0].message, field: String(error.issues[0].path[0]) });
      return;
    }
    throw error;
  }
});

export const deleteVehicle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const vehicleId = Number(id);

  // Use a soft consideration by checking history safely
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    include: {
      trips: { take: 1 },
      maintenanceLogs: { take: 1 }
    }
  });

  if (!vehicle) {
    res.status(404).json({ error: 'Vehicle not found' });
    return;
  }

  // Gracefully check relations so the app won't crash if they don't exist yet,
  // but if they do exist, block deletion to preserve hackathon data integrity.
  if ((vehicle.trips && vehicle.trips.length > 0) || (vehicle.maintenanceLogs && vehicle.maintenanceLogs.length > 0)) {
    res.status(409).json({ error: 'Cannot delete vehicle with existing trip or maintenance history' });
    return;
  }

  await prisma.vehicle.delete({
    where: { id: vehicleId }
  });

  res.status(200).json({ message: 'Vehicle deleted successfully' });
});
