import express from 'express';
import cors from 'cors';
import initRoutes from './routes';

const app = express();

const API_PORT = process.env.API_PORT || 3005;

function startApp() {
    app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5000"], credentials: true }));

    initRoutes(app);

    app.listen(API_PORT, () => {
        console.log(`Geo API: localhost:${API_PORT}`);
    });
}

export default startApp;