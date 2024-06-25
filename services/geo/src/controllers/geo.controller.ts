import { Request, Response } from 'express';
import GoogleMapsService from '../services/googleMaps';
import { createGeo, getGeoByUid } from '../repository/geo.repository';
import { validateCreateGeoRequest } from '../validations';

export const getAddressCurrent = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    const geo = await getGeoByUid(uid);
    if (!geo) {
        return res.status(404).send({ message: "Address of user not found" });
    }

    const { address } = geo;
    res.status(200).send({ data: { address } });
}

export const addAddress = async (req: Request, res: Response) => {
    const { error, value } = validateCreateGeoRequest(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const { address, country } = value;
    const geoCoords = await GoogleMapsService.getInstance().getAddressLatLng(address);
    if (!geoCoords) {
        return res.status(404).send({ message: 'Address not found' });
    }

    const { uid } = req.user!;
    const { lat, lng } = geoCoords;
    await createGeo(uid, country, address, lat, lng);

    res.status(201).send({ message: "Address added successfully" });
}

export const getAddressSuggestions = async (req: Request, res: Response) => {
    const { prefix, country } = req.query;

    if (!prefix || !country || typeof prefix !== 'string' || typeof country !== 'string' || !['ca', 'us'].includes(country)) {
        return res.status(400).send({ message: 'Invalid prefix value' });
    }

    const suggestions = await GoogleMapsService.getInstance().getAddressSuggestions(prefix, country);
    res.status(200).send({ data: { suggestions: suggestions.slice(0, 4) } })
}

export const getAddressFromLatLng = async (req: Request, res: Response) => {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);

    if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: 'Invalid lat or lng values' });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return res.status(400).json({ error: 'Invalid lat or lng values' });
    }

    const address = await GoogleMapsService.getInstance().getLatLngAddress(lat, lng);
    res.status(200).send({ data: { address } });
}


