import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate } from "@herkat/bolsters";
import { addPaymentMethod, getPaymentMethods, removePaymentMethod } from "../../controllers/v0/methods.controller";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.post('/', authenticate(verifyToken), asyncHandler(addPaymentMethod));

router.get('/', authenticate(verifyToken), asyncHandler(getPaymentMethods));

router.delete('/:id', authenticate(verifyToken), asyncHandler(removePaymentMethod));

export default router;