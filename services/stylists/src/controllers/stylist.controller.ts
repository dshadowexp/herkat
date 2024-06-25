import { pick } from "lodash";
import { Request, Response } from "express";
import { findStylistByUid, createNewStylist, findStylistById } from "../repository/stylist.repository";
import { FirebaseService, KafkaProducer, RedisService } from "@herkat/bolsters";

const stylistPick = ['id', 'bookings', 'reviews', 'rating', 'verified'];

export const getStylist = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    // const resourceKey = `${req.method}-${req.url}/${uid}/getStylist`;
    // const redisData = await RedisService.getInstance().getData(resourceKey);
    // if (redisData) {
    //     return res.status(200).send({ data: {  stylist: JSON.parse(redisData) }})
    // }

    const stylist = await findStylistByUid(uid);
    if (!stylist) {
        return res.status(404).send({ message: "Stylist not found" });
    }

    const data = pick(stylist, stylistPick);

    // await RedisService.getInstance().setTransientData(resourceKey, JSON.stringify(data), 15);

    res.status(200).send({ data: { stylist: data } });
}

export const createStylist = async (req: Request, res: Response) => {
    const { uid } = req.user!;
    let styl = await findStylistByUid(uid);
    if (styl) {
        return res.status(409).send({ message: "Stylist already exists" });
    }

    const stylist = await createNewStylist(uid);

    await KafkaProducer.getInstance().produce('send_email', { receiver_id: uid, template: 'new_stylist' });

    res.status(200).send({ data: { 
        stylist: pick(stylist, stylistPick)
    } });
}

export const getStylistProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Invalid Request" });
    }

    const resourceKey = `${req.method}${req.url}/${id}/getStylistProfile`;
    const redisData = await RedisService.getInstance().getData(resourceKey);
    if (redisData) {
        return res.status(200).send({ data: {  stylist: pick(JSON.parse(redisData), stylistPick ) }})
    }

    const stylist = await findStylistById(id);
    if (!stylist) {
        return res.status(404).send({ message: "Stylist not found" });
    }

    const { uid } = stylist;
    const user = await FirebaseService.getInstance().getAuthUser(uid);
    const { displayName, photoURL } = user;

    const data = { ...pick(stylist, stylistPick), displayName, photoURL };

    await RedisService.getInstance().setTransientData(resourceKey, JSON.stringify(data), 15);

    res.status(200).send({ data: { stylist: data } });
}