import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate, authorize } from "@herkat/bolsters";
import { authenticateGoogleCalendarAPI, getAuthorizedTokenRedirect } from "../controllers/calendar.controller";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/auth', authenticate(verifyToken), authorize([], ['stylist']), asyncHandler(authenticateGoogleCalendarAPI));

router.get('/redirect', asyncHandler(getAuthorizedTokenRedirect));

export default router;