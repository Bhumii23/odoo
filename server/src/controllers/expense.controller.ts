import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';
import { createExpenseSchema } from '../../../shared/schemas/expense.schema';

export const getExpenses = asyncHandler(async (req: Request, res: Response) => {
  const expenses = await prisma.expense.findMany({
    include: {
      vehicle: true,
      trip: true,
    },
    orderBy: { date: 'desc' },
  });
  res.status(200).json(expenses);
});

export const createExpense = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = createExpenseSchema.parse(req.body);

    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } });
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    if (data.tripId) {
      const trip = await prisma.trip.findUnique({ where: { id: data.tripId } });
      if (!trip) {
        res.status(404).json({ error: 'Trip not found' });
        return;
      }
    }

    const expense = await prisma.expense.create({
      data: {
        vehicleId: data.vehicleId,
        tripId: data.tripId || null,
        type: data.type,
        amount: data.amount,
        date: data.date ? new Date(data.date) : new Date(),
      },
      include: { vehicle: true, trip: true }
    });

    res.status(201).json(expense);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});
