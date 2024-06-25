import { Application, json, urlencoded } from "express";
import { errorHandler } from "@herkat/bolsters";
import v0GeoRouter from './geo.route';

export default function initRoutes (app: Application) {
    app.use(urlencoded({ extended: true }));
    app.use(json());

    app.use('/api/v0/geo', v0GeoRouter);

    app.use(errorHandler);
}