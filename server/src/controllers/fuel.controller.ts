import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';
import { createFuelLogSchema } from '../../../shared/schemas/fuel.schema';

export const getFuelLogs = asyncHandler(async (req: Request, res: Response) => {
  const logs = await prisma.fuelLog.findMany({
    include: {
      vehicle: true,
    },
    orderBy: { date: 'desc' },
  });
  res.status(200).json(logs);
});

export const createFuelLog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = createFuelLogSchema.parse(req.body);

    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } });
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    const log = await prisma.fuelLog.create({
      data: {
        vehicleId: data.vehicleId,
        liters: data.liters,
        cost: data.cost,
        date: data.date ? new Date(data.date) : new Date(),
      },
      include: { vehicle: true }
    });

    res.status(201).json(log);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});
