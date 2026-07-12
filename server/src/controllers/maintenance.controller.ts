import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';
import { createMaintenanceSchema, updateMaintenanceStatusSchema } from '../../../shared/schemas/maintenance.schema';
import { applyAccidentPenalty } from '../services/safety.service';

export const getMaintenanceLogs = asyncHandler(async (req: Request, res: Response) => {
  const logs = await prisma.maintenanceLog.findMany({
    include: {
      vehicle: true,
      driver: true,
    },
    orderBy: { date: 'desc' },
  });
  res.status(200).json(logs);
});

export const getMaintenanceLogById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const log = await prisma.maintenanceLog.findUnique({
    where: { id: Number(id) },
    include: { vehicle: true, driver: true },
  });

  if (!log) {
    res.status(404).json({ error: 'Maintenance log not found' });
    return;
  }
  res.status(200).json(log);
});

export const createMaintenanceLog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = createMaintenanceSchema.parse(req.body);

    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } });
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    if (data.serviceType === 'ACCIDENT_DAMAGE' && !data.driverId) {
      res.status(400).json({ error: 'Driver ID is required for ACCIDENT_DAMAGE reports' });
      return;
    }

    const [log] = await prisma.$transaction([
      prisma.maintenanceLog.create({
        data: {
          vehicleId: data.vehicleId,
          driverId: data.driverId || null,
          serviceType: data.serviceType,
          description: data.description || null,
          cost: data.cost,
          date: new Date(data.date),
          status: 'IN_PROGRESS', // Creating active maintenance record automatically sets IN_SHOP
        },
      }),
      prisma.vehicle.update({
        where: { id: data.vehicleId },
        data: { status: 'IN_SHOP' }
      })
    ]);

    // Integration Instructions Implementation: 
    // Safely deduct points from the driver if they were involved in an accident.
    if (data.serviceType === 'ACCIDENT_DAMAGE' && data.driverId) {
      await applyAccidentPenalty(data.driverId, data.vehicleId);
    }

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

/**
 * Only FLEET_MANAGER can authorize (approve/reject) maintenance requests.
 * Handled via requirePermission in the routes.
 */
export const updateMaintenanceStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const logId = Number(id);

  try {
    const { status } = updateMaintenanceStatusSchema.parse(req.body);

    const log = await prisma.maintenanceLog.findUnique({ where: { id: logId } });
    if (!log) {
      res.status(404).json({ error: 'Maintenance log not found' });
      return;
    }

    // Handle status transitions securely
    if (status === 'APPROVED' && log.status === 'PENDING_APPROVAL') {
      await prisma.$transaction([
        prisma.maintenanceLog.update({ where: { id: logId }, data: { status: 'APPROVED' } }),
        prisma.vehicle.update({ where: { id: log.vehicleId }, data: { status: 'IN_SHOP' } }),
      ]);
    } else if (status === 'REJECTED' && log.status === 'PENDING_APPROVAL') {
      await prisma.maintenanceLog.update({ where: { id: logId }, data: { status: 'REJECTED' } });
    } else if (status === 'IN_PROGRESS' && log.status === 'APPROVED') {
      await prisma.maintenanceLog.update({ where: { id: logId }, data: { status: 'IN_PROGRESS' } });
    } else if (status === 'COMPLETED' && (log.status === 'IN_PROGRESS' || log.status === 'APPROVED')) {
      // Complete maintenance: update vehicle odometer reset point and status back to AVAILABLE
      const vehicle = await prisma.vehicle.findUnique({ where: { id: log.vehicleId } });
      if (vehicle) {
        const newVehicleStatus = vehicle.status === 'RETIRED' ? 'RETIRED' : 'AVAILABLE';
        await prisma.$transaction([
          prisma.maintenanceLog.update({ where: { id: logId }, data: { status: 'COMPLETED' } }),
          prisma.vehicle.update({ 
            where: { id: log.vehicleId }, 
            data: { 
              status: newVehicleStatus,
              lastMaintenanceOdometer: vehicle.odometer // Reset interval logic
            } 
          }),
        ]);
      }
    } else {
      res.status(400).json({ error: `Cannot transition maintenance log from ${log.status} to ${status}` });
      return;
    }

    const updatedLog = await prisma.maintenanceLog.findUnique({ where: { id: logId } });
    res.status(200).json(updatedLog);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});