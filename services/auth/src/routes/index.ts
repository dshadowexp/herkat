import { Application, json, urlencoded } from "express";
import { errorHandler } from "@herkat/bolsters";
import v0Router from './v0';

export default function initRoutes (app: Application) {
    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use('/api/v0/auth', v0Router);

    app.use(errorHandler);
}