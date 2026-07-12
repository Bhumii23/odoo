import { Router } from 'express';
import { getMyPermissions } from '../controllers/permissions.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/me', authenticate, getMyPermissions);

export default router;
