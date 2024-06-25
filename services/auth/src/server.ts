import dotenv from 'dotenv';
dotenv.config();

import startApp from './app';

async function startServer() {
    startApp();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            process.exit(0);
        });
    });
}

startServer();

