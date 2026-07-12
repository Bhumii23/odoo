import { Router } from 'express';
import { uploadVehicleDocument, getVehicleDocuments, upload } from '../controllers/documents.controller';
import { authenticate } from '../middleware/authenticate';
import { requirePermission } from '../middleware/requirePermission';

const router = Router();

// Only Fleet Managers (or those with FLEET VIEW/FULL access depending on rules) can view/upload
router.post(
  '/vehicle/:id', 
  authenticate, 
  requirePermission('FLEET', 'FULL'), 
  upload.single('document'), 
  uploadVehicleDocument
);

router.get(
  '/vehicle/:id', 
  authenticate, 
  requirePermission('FLEET', 'VIEW'), 
  getVehicleDocuments
);

export default router;
