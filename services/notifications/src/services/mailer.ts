import { Transporter, createTransport } from "nodemailer";
import {  } from "email-templates";

const port: number = parseInt(process.env.NODE_MAILER_PORT!) || 587;
const service = process.env.NODE_MAILER_SERVICE || "";
const host = process.env.NODE_MAILER_HOST || "";
const name = process.env.NODE_MAILER_NAME || "";
const user = process.env.NODE_MAILER_USER || "";
const pass = process.env.NODE_MAILER_PASSWORD || "";

class EmailService {
    private _transporter: Transporter | undefined;
    private static _instance: EmailService;

    private constructor() {}

    public static getInstance(): EmailService {
        if (!EmailService._instance) {
            EmailService._instance = new EmailService();
        }
        return EmailService._instance;
    }

    private init() {
        if (this._transporter) {
            return EmailService.getInstance();
        }

        this._transporter = createTransport({
            service, host, port,
            secure: true,
            auth: {
              user, pass,
            },
        });

        return EmailService.getInstance();
    }

    public async sendMail(template: string, to: string, locals: object) {
        if (!this._transporter) {
            this.init();
        }
    }
}

export default EmailService;