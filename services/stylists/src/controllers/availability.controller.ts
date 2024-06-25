import { Request, Response } from "express";
import { createAvailabity, deleteAvailability, editAvailability, findAvailability, findStylistAvailabities } from "../repository/availability.repository";
import { validateCreateAvailabilitiesRequest } from "../validations";
import { Day } from "@prisma/client";

export const getDateAvailability = async (req: Request, res: Response) => {
    const { stylist_id } = req.params;
    if (!stylist_id) {
        return res.status(400).send({ message: "invalid request" });
    }

    const { month, date } = req.query;


    const availability = { date: '', startTime: '09:00', endTime: '12:00' }
    const blocks = [ { startTime: '', endTime: '' } ]
    res.status(200).send({ data: { availability, blocks }})
}

export const getAvailability = async (req: Request, res: Response) => {
    const { day } = req.params;
    if (!day) {
        return res.status(400).send({ message: "Invalid request" });
    }
    
    const { uid } = req.user!;
    const availability = await findAvailability(uid, day as Day);

    res.status(200).send({ data: { availability } });
}

export const getAvailabilities = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    // const resourceKey = `${req.url}/${uid}/getAvailabilities`;
    // const redisData = await RedisService.getInstance().getData(resourceKey);
    // if (redisData) {
    //     return res.status(200).send({ data: {  availabilities: JSON.parse(redisData) }})
    // }

    const availabilities = await findStylistAvailabities(uid);
    // await RedisService.getInstance().setTransientData(resourceKey, JSON.stringify(availabilities), 15);

    res.status(200).send({ data: { availabilities } });
}

export const createNewAvailability = async (req: Request, res: Response) => {
    const { error, value } = validateCreateAvailabilitiesRequest(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    
    const { uid } = req.user!;
    const { day, startTime, endTime } = value;
    let availability = await findAvailability(uid, day);
    if (availability) {
        return res.status(409).send({ messsage: 'Already exists' });
    }

    availability = await createAvailabity({ uid, day, startTime, endTime });
    res.status(201).send({ data: { availability }});
}

export const updateExistingAvailability = async (req: Request, res: Response) => {
    const { error, value } = validateCreateAvailabilitiesRequest(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const { uid } = req.user!
    const { day, startTime, endTime } = value;
    let availability = await findAvailability(uid, day as Day);
    if (!availability) {
        return res.status(404).send({ messsage: 'Not found' });
    }
    
    availability = await editAvailability({ uid, day, startTime, endTime });
    res.status(200).send({ data: { availability } });
}

export const removeExistingAvailability = async (req: Request, res: Response) => {
    const { day } = req.params;
    if (!day) {
        return res.status(400).send({ message: 'Invalid request' });
    }

    const { uid } = req.user!
    let availability = await findAvailability(uid, day as Day);
    if (!availability) {
        return res.status(404).send({ messsage: 'Not found' });
    }

    await deleteAvailability(uid, day as Day);
    res.status(204).send({ message: "Successfully deleted" })
}