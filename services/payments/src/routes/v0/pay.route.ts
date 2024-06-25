import { FirebaseService, asyncHandler, authenticate } from '@herkat/bolsters';
import { Router } from 'express';
import { createDestinationIntent } from '../../controllers/v0/pay.controller';

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.post('/create', authenticate(verifyToken), asyncHandler(createDestinationIntent));

export default router;