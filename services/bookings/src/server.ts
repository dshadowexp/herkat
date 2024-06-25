import dotenv from 'dotenv';
dotenv.config();

import startApp from './app';
import startKafka from './kafka';

async function startServer() {
    startApp();

    // await startKafka();
}

startServer();