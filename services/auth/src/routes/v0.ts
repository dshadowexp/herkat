import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate } from "@herkat/bolsters";
import { updateAuthUser } from "../controllers/auth.controller"

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/sign/:type', authenticate(verifyToken), asyncHandler(updateAuthUser));

export default router;