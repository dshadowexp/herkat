import { Application, json, urlencoded } from "express";
import { errorHandler } from "@herkat/bolsters";

import serviceV0Router from './service.route';

export default function initRoutes (app: Application) {
    app.use(urlencoded({ extended: true }));

    app.use(json());

    app.use('/api/v0/services', serviceV0Router);

    app.use(errorHandler);
}