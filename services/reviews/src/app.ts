import express from 'express';
import initRoutes from './routes';

const app = express();

const API_PORT = process.env.PORT || 3000;

function startApp() {
    initRoutes(app);

    app.listen(API_PORT, () => {
        console.log(`Reviews api: localhost:${API_PORT}`);
    });
}

export default startApp;