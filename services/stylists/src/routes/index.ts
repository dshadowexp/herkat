import { Application, json, urlencoded } from "express";
import { errorHandler } from "@herkat/bolsters";

import stylistV0Router from './v0/stylist.route';
import availability from './v0/availability.route';

export default function initRoutes (app: Application) {
    app.use(urlencoded({ extended: true }));

    app.use(json());

    app.use('/api/v0/availability', availability);

    app.use('/api/v0/stylists', stylistV0Router);

    app.use(errorHandler);
}