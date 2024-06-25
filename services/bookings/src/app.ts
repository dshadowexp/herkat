import express from 'express';
import initRoutes from './routes';

const app = express();

const API_PORT = process.env.API_PORT || 3007;

function startApp() {
    initRoutes(app);

    app.listen(API_PORT, () => {
        console.log(`Bookings API: localhost:${API_PORT}`);
    });
}

export default startApp;