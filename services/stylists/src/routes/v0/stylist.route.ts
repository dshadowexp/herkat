import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate, authorize } from "@herkat/bolsters";
import { createStylist, getStylist, getStylistProfile } from "../../controllers/stylist.controller";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getStylist));

router.get('/profile/:id', authenticate(verifyToken), asyncHandler(getStylistProfile));

router.post('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(createStylist));

export default router;