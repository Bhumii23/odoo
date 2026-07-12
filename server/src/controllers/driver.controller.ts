import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createDriverSchema, updateDriverSchema } from '../../../shared/schemas/driver.schema';
import { DriverStatus } from '@prisma/client';

/**
 * Fetch all drivers from the database.
 */
export const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.json({ data: drivers });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

/**
 * Fetch a specific driver by their numeric ID.
 */
export const getDriverById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const driver = await prisma.driver.findUnique({
      where: { id },
    });
    
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    
    res.json({ data: driver });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

/**
 * Register a new driver. Validates input, ensures license number uniqueness, 
 * and handles defaulting the status to 'AVAILABLE' if not provided.
 */
export const createDriver = async (req: Request, res: Response) => {
  try {
    const validatedData = createDriverSchema.parse(req.body);
    
    const existingDriver = await prisma.driver.findUnique({
      where: { licenseNumber: validatedData.licenseNumber },
    });
    
    if (existingDriver) {
      return res.status(400).json({ error: 'Driver with this license number already exists' });
    }

    const driver = await prisma.driver.create({
      data: {
        name: validatedData.name,
        licenseNumber: validatedData.licenseNumber,
        licenseCategory: validatedData.licenseCategory,
        licenseExpiry: new Date(validatedData.licenseExpiry),
        contactNumber: validatedData.contactNumber,
        status: (validatedData.status || 'AVAILABLE') as DriverStatus,
      },
    });

    res.status(201).json({ data: driver, message: 'Driver registered successfully' });
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    
    // P2002 is Prisma's error code for a Unique Constraint violation.
    // This acts as a fallback if the manual `findUnique` check above experiences a race condition.
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Driver with this license number already exists' });
    }
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

/**
 * Update an existing driver's details. 
 * Allows partial updates and ensures we don't accidentally assign an existing license number.
 */
export const updateDriver = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });
    const validatedData = updateDriverSchema.parse(req.body);

    // If updating license number, check for uniqueness
    if (validatedData.licenseNumber) {
      const existingDriver = await prisma.driver.findFirst({
        where: { 
          licenseNumber: validatedData.licenseNumber,
          NOT: { id }
        },
      });
      if (existingDriver) {
        return res.status(400).json({ error: 'License number already in use by another driver' });
      }
    }

    const dataToUpdate: any = { ...validatedData };
    if (validatedData.licenseExpiry) {
      dataToUpdate.licenseExpiry = new Date(validatedData.licenseExpiry);
    }
    
    const driver = await prisma.driver.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json({ data: driver, message: 'Driver updated successfully' });
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    // Handle Prisma errors
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Driver not found' });
    }
    // P2002 prevents updating a driver's license number to one that is already owned by someone else.
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'License number already in use by another driver' });
    }
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

/**
 * Delete a driver by ID.
 */
export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });

    await prisma.driver.delete({
      where: { id },
    });
    res.json({ message: 'Driver deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

/**
 * Specifically intended for the SAFETY_OFFICER role. 
 * Allows manual adjustment of a driver's safety score (clamped between 0 and 100).
 */
export const updateSafetyScore = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'SAFETY_OFFICER') {
      return res.status(403).json({ error: 'Forbidden: Only SAFETY_OFFICER can manually update safety scores' });
    }

    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });
    const { score } = req.body;

    if (score === undefined || typeof score !== 'number') {
      return res.status(400).json({ error: 'Valid score is required' });
    }

    // Clamp score between 0 and 100
    const clampedScore = Math.max(0, Math.min(100, score));

    const driver = await prisma.driver.update({
      where: { id },
      data: { safetyScore: clampedScore },
    });

    res.json({ data: driver, message: 'Safety score updated successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
