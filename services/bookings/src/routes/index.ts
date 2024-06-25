import { Application, json, urlencoded } from "express";
import { errorHandler } from "@herkat/bolsters";
import bookingsV0Router from './bookings.route';
import calendarV0Router from './calendar.route';

export default function initRoutes (app: Application) {
    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use('/api/v0/bookings', bookingsV0Router);

    app.use('/api/v0/calendar', calendarV0Router)

    app.use(errorHandler);
}