import { createKafkaClient, KafkaProducer } from "@herkat/bolsters";

const kafkaBrokers = [process.env.KAFKA_BROKER || "localhost:19092"];
const clientId = 'reviews-service';

const kakfaStream = createKafkaClient(clientId, kafkaBrokers);

KafkaProducer.getInstance().init(kakfaStream);

async function startKafka() {
    await KafkaProducer.getInstance().connect();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await KafkaProducer.getInstance().destroy();
            process.exit(0);
        });
    })
}

export default startKafka;