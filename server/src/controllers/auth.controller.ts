/*
  TOKEN STORAGE DECISION:
  This implementation returns the JWT in the response body rather than an httpOnly cookie.
  This is a conscious tradeoff for the hackathon: it is simpler for the frontend to store
  in localStorage or context, and avoids CORS/cookie configuration overhead. 
  Note: This is less secure against XSS attacks compared to httpOnly cookies.
*/

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { signToken } from '../lib/jwt';
import { SignupSchema, LoginSchema } from '../../../shared/schemas/auth.schema';
import { Role } from '@prisma/client';

// Simple async wrapper to catch unhandled promise rejections
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = SignupSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role as Role,
        failedLoginAttempts: 0,
        isLocked: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        failedLoginAttempts: true,
        isLocked: true,
        createdAt: true,
      }
    });

    const token = signToken({ userId: user.id, role: user.role });

    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = LoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (user.isLocked) {
      res.status(403).json({ error: 'Account locked, contact admin' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      const attempts = user.failedLoginAttempts + 1;
      const isLocked = attempts >= 5;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: attempts,
          isLocked,
        },
      });

      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Password correct, reset attempts
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0 },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        failedLoginAttempts: true,
        isLocked: true,
        createdAt: true,
      }
    });

    const token = signToken({ userId: updatedUser.id, role: updatedUser.role });

    res.status(200).json({ user: updatedUser, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  // Stateless JWT, so client discards the token. 
  // We return a success message for consistency.
  res.status(200).json({ message: 'Logged out successfully' });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      failedLoginAttempts: true,
      isLocked: true,
      createdAt: true,
    }
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.status(200).json({ user });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  /*
    STUB ONLY for hackathon scope.
    Validates email format, but does not send an actual email or generate a reset token.
  */
  try {
    const emailSchema = z.object({ email: z.string().email('Invalid email address') });
    const { email } = emailSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    
    // We intentionally return the same message regardless of whether the email exists
    // to prevent email enumeration.
    res.status(200).json({ message: 'If this email exists, a reset link has been sent' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ error: firstIssue?.message, field: String(firstIssue?.path[0]) });
      return;
    }
    throw error;
  }
});
