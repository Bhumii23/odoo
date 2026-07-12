import { prisma } from '../lib/prisma';
import { DriverStatus } from '@prisma/client';

const SUSPENSION_THRESHOLD = 60;
const ACCIDENT_PENALTY = 20;
const SPEEDING_PENALTY = 5;
const SAFE_TRIP_REWARD = 2;
const MAX_SCORE = 100;
const SPEED_LIMIT_KMH = 85;

/**
 * Checks a driver's score and suspends them if it falls below the threshold.
 * This should be called after any penalty is applied.
 */
export const enforceSuspensionRule = async (driverId: number) => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { safetyScore: true, status: true }
  });

  if (!driver) return;

  if (driver.safetyScore < SUSPENSION_THRESHOLD && driver.status !== 'SUSPENDED') {
    await prisma.driver.update({
      where: { id: driverId },
      data: { status: 'SUSPENDED' }
    });
    console.log(`Driver ${driverId} automatically suspended due to low safety score (${driver.safetyScore}).`);
  }
};

/**
 * Helper to safely increment or decrement a score, clamping it between 0 and 100.
 */
const adjustScore = async (driverId: number, amount: number) => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { safetyScore: true }
  });

  if (!driver) return;

  const newScore = Math.max(0, Math.min(MAX_SCORE, driver.safetyScore + amount));
  
  await prisma.driver.update({
    where: { id: driverId },
    data: { safetyScore: newScore }
  });

  await enforceSuspensionRule(driverId);
};

/**
 * Deducts points from a driver when they are involved in an accident.
 * Should be called when a MaintenanceLog with ServiceCategory = ACCIDENT_DAMAGE is created.
 */
export const applyAccidentPenalty = async (driverId: number, vehicleId: number) => {
  console.log(`Applying accident penalty to driver ${driverId} for vehicle ${vehicleId}`);
  await adjustScore(driverId, -ACCIDENT_PENALTY);
};

/**
 * Evaluates a completed trip for potential speeding violations.
 * If average speed exceeds the limit, penalize. Otherwise, reward for safe driving.
 * Should be called when a Trip status is updated to COMPLETED.
 */
export const evaluateTripSafety = async (tripId: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId }
  });

  if (!trip || !trip.completedAt || trip.status !== 'COMPLETED') return;

  // Calculate duration in hours
  const durationMs = trip.completedAt.getTime() - trip.createdAt.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);

  // Prevent divide-by-zero or instantaneous completions
  if (durationHours <= 0) return;

  const averageSpeed = trip.plannedDistance / durationHours;

  if (averageSpeed > SPEED_LIMIT_KMH) {
    console.log(`Speeding detected on trip ${tripId}. Average speed: ${averageSpeed.toFixed(1)} km/h.`);
    await adjustScore(trip.driverId, -SPEEDING_PENALTY);
  } else {
    // Reward for a safe trip
    await adjustScore(trip.driverId, SAFE_TRIP_REWARD);
  }
};
