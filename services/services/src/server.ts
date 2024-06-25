import dotenv from 'dotenv';
dotenv.config();

import startApp from './app';
import startKafka from './kafka';

async function startServer() {
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