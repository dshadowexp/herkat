import dotenv from 'dotenv';
dotenv.config();

import startKafka from './kafka';
import startApp from './app';
import startMongo from './db';

async function startServer() {
    await startMongo();

    startApp();

    await startKafka();
}

startServer();