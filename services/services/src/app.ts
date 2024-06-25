import express from 'express';
import initRoutes from './routes';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

const API_PORT = process.env.API_PORT || 3006;

function startApp() {
    app.use(cors({ origin: "http://localhost:5173", credentials: true }));

    app.use(helmet());

    initRoutes(app);

    app.listen(API_PORT, () => {
        console.log(`Services API: localhost:${API_PORT}`);
    });
}

export default startApp;