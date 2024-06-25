import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate, authorize } from "@herkat/bolsters";
import { createService, deleteService, getService, getServices, updateService } from "../controllers/service.controller";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/:id', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(getService));

router.get('/summary/:id', authenticate(verifyToken), asyncHandler(getServices));

router.post('/', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(createService));

router.put('/:id', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(updateService));

router.delete('/:id', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(deleteService));

export default router;