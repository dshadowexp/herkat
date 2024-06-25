import { Router } from "express";
import { FirebaseService, asyncHandler, authenticate, authorize } from "@herkat/bolsters";
import { addAddress, getAddressSuggestions, getAddressFromLatLng, getAddressCurrent } from "../controllers/geo.controller";

const router = Router();

const verifyToken = async (token: string) => await FirebaseService.getInstance().decodeToken(token);

router.get('/address/current', authenticate(verifyToken), asyncHandler(getAddressCurrent));

router.post('/address/current', authenticate(verifyToken), asyncHandler(addAddress));

router.get('/address/suggestions', authenticate(verifyToken), asyncHandler(getAddressSuggestions));

router.get('/address/geocode', authenticate(verifyToken), asyncHandler(getAddressFromLatLng));

export default router;