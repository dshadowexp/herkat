import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate, authorize } from "@herkat/bolsters";
import { createNewAvailability, getAvailabilities, getAvailability, getDateAvailability, removeExistingAvailability, updateExistingAvailability } from "../../controllers/availability.controller";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/stylist/:stylist_id', authenticate(verifyToken), asyncHandler(getDateAvailability));

router.get('/:day', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getAvailability));

router.get('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getAvailabilities));

router.post('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(createNewAvailability));

router.put('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(updateExistingAvailability));

router.delete('/:day', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(removeExistingAvailability));

export default router;