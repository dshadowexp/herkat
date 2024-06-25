import { Response, Request } from "express";
import { FirebaseService } from "@herkat/bolsters";

export const updateAuthUser = async (req: Request, res: Response) => {
    const { uid } = req.user!;
    const { type } = req.params;

    if (!type || !['client', 'stylist'].includes(type as string)) {
        return res.status(400).send({ message: 'Invalid request' });
    }

    await FirebaseService.getInstance().setUserClaims(uid, {
        stylist: type === 'stylist'
    });

    res.status(200).send({ message: "Successfully signed" });
}