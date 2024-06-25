import { Request, Response } from 'express';
import GoogleMapsService from '../services/googleMaps';
import H3Service from '../services/h3';

export const getH3Index = async (req: Request, res: Response) => {
    const { address, level } = req.query;

    if (!address || (level && !Number.isInteger(level))) {
        return res.status(400).send({ message: 'Invalid request' });
    }

    const geoCoords = await GoogleMapsService.getInstance().getAddressLatLng(address as string);
    if (!geoCoords) {
        return res.status(404).send({ message: 'Address not found' });
    }

    const { lat, lng } = geoCoords;
    const resolution = !level ? 9 : Number(level);
    const h3Index = H3Service.getInstance().getGeoIndexFromLatLng(lat, lng, resolution);

    res.status(200).send({ data: { index: h3Index }});
}