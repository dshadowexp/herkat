import dotenv from 'dotenv';
dotenv.config();

import startApp from './app';
import startKafka from './kafka';
import startRedis from './redis';

async function startServer() {
    // await startRedis()

    startApp();

    await startKafka();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {

            process.exit(0);
        });
    });
}

startServer();