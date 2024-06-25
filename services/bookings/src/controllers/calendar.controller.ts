import { Request, Response } from "express";
import { GoogleCalendarService } from "../services/googleCalendar";
import { FirebaseService } from "@herkat/bolsters";

export const authenticateGoogleCalendarAPI = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    const { email } = await FirebaseService.getInstance().getAuthUser(uid);
    if (!email) {
        return res.status(404).send({ message: "Your email node found" });
    }

    const authUrl = GoogleCalendarService.getInstance().getAuthUrl(email);

    res.status(301).send({ data: { url: authUrl } });
}

export const getAuthorizedTokenRedirect = async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
        return res.status(404).send({ message: 'Invalid request' });
    }

    await GoogleCalendarService.getInstance().setTokenCredential(code);

    // setTimeout(async () => {
    //     await GoogleCalendarService.getInstance().createEvent();
    // }, 5000);

    await GoogleCalendarService.getInstance().listEvents();

    res.status(200).send({ message: "Token Authorization complete" })
}