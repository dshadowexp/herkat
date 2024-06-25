import dotenv from 'dotenv';
dotenv.config();

import startApp from './app';
import startKafka from './kafka';
import { KafkaConsumer } from '@herkat/bolsters';
import { disconnectDb } from './repository';

async function startServer() {
    startApp();

    await startKafka();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await KafkaConsumer.getInstance().destroy();
            await disconnectDb();
            process.exit(0);
        });
    });
}

startServer();