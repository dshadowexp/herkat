import { Router } from 'express';
import { FirebaseService, asyncHandler, authenticate } from '@herkat/bolsters';
import { getStripeConfig } from '../../controllers/v0/config.controller';

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/stripe', authenticate(verifyToken), asyncHandler(getStripeConfig));

export default router;