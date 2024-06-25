import dotenv from 'dotenv';
dotenv.config();

class Config {
    public NODE_ENV: string | undefined;
    public MAILER_SERVICE: string | undefined;
    public MAILER_HOST: string | undefined;
    public MAILER_PORT: string | undefined;
    public MAILER_USER: string | undefined;
    public MAILER_PASSWORD: string | undefined;
    public MAILER_NAME: string | undefined;

    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.MAILER_SERVICE = process.env.MAILER_SERVICE || '';
        this.MAILER_HOST = process.env.MAILER_HOST || '';
        this.MAILER_PORT = process.env.MAILER_PORT || '';
        this.MAILER_USER = process.env.MAILER_USER || '';
        this.MAILER_PASSWORD = process.env.MAILER_PASSWORD || '';
        this.MAILER_NAME = process.env.MAILER_NAME || '';
    }
}

export const config: Config = new Config();