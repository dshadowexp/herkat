import { FirebaseService } from "@herkat/bolsters";
import TwilioService from "../services/twilio";

export async function consumeSMSMessages(data: any) {
    try {
        const { receiver, message } = data;

        if (!receiver || !message) {
            console.log('Invalid sms request');
            return;
        }

        const user = await FirebaseService.getInstance().getAuthUser(receiver);
        const { phoneNumber } = user;

        if (phoneNumber) {
            await TwilioService.getInstance().sendSMS(phoneNumber, message);
        }
    } catch (error) {
        console.log(error);
    }
}