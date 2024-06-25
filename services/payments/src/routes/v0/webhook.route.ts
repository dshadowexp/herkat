import { asyncHandler } from '@herkat/bolsters';
import { Router, raw } from 'express';
import { stripeWebhookHandler } from '../../controllers/v0/webhooks.controller';

const router = Router();

router.post('/stripe', raw({type: 'application/json'}), asyncHandler(stripeWebhookHandler))

export default router;