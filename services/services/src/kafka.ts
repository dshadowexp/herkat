import { v4 as uuidv4 } from "uuid"; 
import { createKafkaClient, KafkaConsumer, KafkaProducer } from "@herkat/bolsters";

const kafkaBrokers = [process.env.KAFKA_BROKER || "localhost:19092"];
const stylistGroupId = `service-stylists-${uuidv4()}`;
const stylistClientId = 'service-stylists';

const kakfaStream = createKafkaClient(stylistClientId, kafkaBrokers);

KafkaProducer.getInstance().init(kakfaStream);

KafkaConsumer.getInstance().init(kakfaStream, stylistGroupId);

async function startKafka() {
    // await KafkaConsumer.getInstance().addSubscription('update_with_review', updateWithReview);

    await KafkaProducer.getInstance().connect();

    await KafkaConsumer.getInstance().connect();

    await KafkaConsumer.getInstance().consume();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await KafkaProducer.getInstance().destroy()
            await KafkaConsumer.getInstance().destroy();
            process.exit(0);
        });
    });
}

export default startKafka;