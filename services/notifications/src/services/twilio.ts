import twilio, { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER || '';

class TwilioService {
    private _client: Twilio | undefined;
    private static _instance: TwilioService;

    private constructor() {}

    public static getInstance(): TwilioService {
        if (!TwilioService._instance) {
            TwilioService._instance = new TwilioService();
        }
        return TwilioService._instance;
    }

    private init() {
        if (this._client) {
            return;
        }

        try {
            this._client = twilio(accountSid, authToken);
        } catch (error) {
            console.log(error);
        }
    }

    private async sendMessage(messageBody: string, from: string, to: string) {
        if (!this._client) {
            this.init();
        }

        try {
            const response = await this._client?.messages.create({
                body: messageBody,
                from,
                to
            });
            console.log(response?.sid);
        } catch (error) {
            console.log(error);
        }
    }

    public async sendSMS(to: string, message: string, from?: string) {
        const messageBody = message;
        await this.sendMessage(messageBody, from  || twilioNumber, to);
    }

    public async sendWhatsApp(to: string, message: string, from: string) {
        const messageBody = message;
        await this.sendMessage(messageBody, `whatsapp:${from}`, `whatsapp:${to}`);
    }
}

export default TwilioService;