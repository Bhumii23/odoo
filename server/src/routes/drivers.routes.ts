import { Router } from 'express';
import { 
  getDrivers, 
  getDriverById, 
  createDriver, 
  updateDriver, 
  deleteDriver,
  updateSafetyScore 
} from '../controllers/driver.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

// Require authentication for all driver routes
router.use(authenticate);

// General Driver CRUD (accessible to FLEET_MANAGER and DISPATCHER)
router.get('/', authorize(['FLEET_MANAGER', 'DISPATCHER', 'SAFETY_OFFICER']), getDrivers);
router.get('/:id', authorize(['FLEET_MANAGER', 'DISPATCHER', 'SAFETY_OFFICER']), getDriverById);
router.post('/', authorize(['FLEET_MANAGER']), createDriver);
router.put('/:id', authorize(['FLEET_MANAGER']), updateDriver);
router.delete('/:id', authorize(['FLEET_MANAGER']), deleteDriver);

// Safety Score endpoint (strictly for SAFETY_OFFICER)
router.put('/:id/safety-score', authorize(['SAFETY_OFFICER']), updateSafetyScore);

export default router;