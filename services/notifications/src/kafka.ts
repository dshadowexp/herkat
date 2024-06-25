import { v4 as uuidv4 } from "uuid"; 
import { createKafkaClient, KafkaConsumer } from "@herkat/bolsters";
import { consumeAuthEmails, consumeBookingEmails, consumeUserEmails } from "./consumers/email";
import { consumeSMSMessages } from "./consumers/sms";

const kafkaBrokers = [process.env.KAFKA_BROKER || "localhost:19092"];
const notificationGroupId = `notifications-${uuidv4()}`;
const notificationClientId = 'notifications-service'

const kafkaStream = createKafkaClient(notificationClientId, kafkaBrokers);

KafkaConsumer.getInstance().init(kafkaStream, notificationGroupId);

async function startKafka() {
    await KafkaConsumer.getInstance().addSubscription('send_auth_email', consumeAuthEmails);
    await KafkaConsumer.getInstance().addSubscription('send_user_email', consumeUserEmails);
    await KafkaConsumer.getInstance().addSubscription('send_booking_email', consumeBookingEmails);
    await KafkaConsumer.getInstance().addSubscription('send_sms', consumeSMSMessages);
    
    await KafkaConsumer.getInstance().connect();

    await KafkaConsumer.getInstance().consume();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await KafkaConsumer.getInstance().destroy();
            process.exit(0);
        });
    })
}

export default startKafka;