import { Router } from 'express';
import { FirebaseService, asyncHandler, authenticate, authorize } from '@herkat/bolsters';
import { createAccount, createAccountSession, getAccount, getAccountBalance, getAccountLink } from '../../controllers/v0/accounts.controller';

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getAccount));

router.get('/link', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getAccountLink));

router.get('/balance', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getAccountBalance));

router.post('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(createAccount))

router.post('/session', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(createAccountSession));

export default router;