import express from 'express';
import initRoutes from './routes';
import cors from 'cors';

const app = express();

const API_PORT = process.env.API_PORT || 3001;

function startApp() {
    app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5000"], credentials: true }));
    
    initRoutes(app);

    app.listen(API_PORT, () => {
        console.log(`Auth API: localhost:${API_PORT}`);
    });
}

export default startApp;