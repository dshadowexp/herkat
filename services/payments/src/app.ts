import express from 'express';
import initRoutes from './routes';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

const API_PORT = process.env.API_PORT || 3002;

function startApp() {
    app.use(cors({ origin: ["http://localhost:5173", "https://connect.stripe.com"], credentials: true }));

    app.use(helmet());
    
    initRoutes(app);

    app.listen(API_PORT, () => {
        console.log(`Payments API: localhost:${API_PORT}`);
    });
}

export default startApp;