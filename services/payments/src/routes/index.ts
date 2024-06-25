import { Application, json, urlencoded } from "express";
import { errorHandler } from "@herkat/bolsters";
import accountV0Router from './v0/accounts.route';
import configV0Router from './v0/config.route';
import methodsV0Router from './v0/methods.route';
import webhookV0Router from './v0/webhook.route';
import payV0Router from './v0/pay.route';

export default function initRoutes (app: Application) {
    app.use(urlencoded({ extended: true }));

    app.use('/api/v0/payments/webhooks', webhookV0Router);

    app.use(json());

    app.use('/api/v0/payments/accounts', accountV0Router);

    app.use('/api/v0/payments/config', configV0Router);
    
    app.use('/api/v0/payments/methods', methodsV0Router);

    app.use('/api/v0/payments/pay', payV0Router);

    app.use(errorHandler);
}