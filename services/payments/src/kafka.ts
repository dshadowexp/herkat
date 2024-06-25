import { v4 as uuidv4 } from "uuid"; 
import { createKafkaClient, KafkaConsumer, KafkaProducer } from "@herkat/bolsters";
import stripeWebhookEventsHandler from "./events/webhook.event";

const kafkaBrokers = [process.env.KAFKA_BROKER || "localhost:19092"];
const notificationGroupId = `service-payments-${uuidv4()}`;
const notificationClientId = 'service-payments';

const kakfaStream = createKafkaClient(notificationClientId, kafkaBrokers);

KafkaProducer.getInstance().init(kakfaStream);
KafkaConsumer.getInstance().init(kakfaStream, notificationGroupId);

async function startKafka() {
    await KafkaConsumer.getInstance().addSubscription('stripe_webhook', stripeWebhookEventsHandler);
    
    await KafkaProducer.getInstance().connect();

    await KafkaConsumer.getInstance().connect();

    await KafkaConsumer.getInstance().consume();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await KafkaConsumer.getInstance().destroy();
            await KafkaProducer.getInstance().destroy();
            process.exit(0);
        });
    });
}

export default startKafka;