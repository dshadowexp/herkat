import { FirebaseService, asyncHandler, authenticate } from "@herkat/bolsters";
import { Router } from "express";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/:id', authenticate(verifyToken), );

export default router;