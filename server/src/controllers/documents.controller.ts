import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from './auth.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for local disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const uploadVehicleDocument = asyncHandler(async (req: Request, res: Response) => {
  const vehicleId = parseInt(req.params.id as string);
  const { title } = req.body;
  const file = req.file;

  if (isNaN(vehicleId)) {
    res.status(400).json({ error: 'Invalid vehicle ID' });
    return;
  }

  if (!file || !title) {
    res.status(400).json({ error: 'Both title and document file are required' });
    return;
  }

  // Construct a public URL path
  const fileUrl = `/uploads/${file.filename}`;

  const document = await prisma.vehicleDocument.create({
    data: {
      vehicleId,
      title,
      fileUrl
    }
  });

  res.status(201).json({ message: 'Document uploaded successfully', document });
});

export const getVehicleDocuments = asyncHandler(async (req: Request, res: Response) => {
  const vehicleId = parseInt(req.params.id as string);

  if (isNaN(vehicleId)) {
    res.status(400).json({ error: 'Invalid vehicle ID' });
    return;
  }

  const documents = await prisma.vehicleDocument.findMany({
    where: { vehicleId },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json(documents);
});
