import { v4 as uuidv4 } from "uuid"; 
import { createKafkaClient, KafkaConsumer, KafkaProducer } from "@herkat/bolsters";

const kafkaBrokers = [process.env.KAFKA_BROKER || "localhost:19092"];
const geoGroupId = `service-geo-${uuidv4()}`;
const geoClientId = 'geo-service';

const kakfaStream = createKafkaClient(geoClientId, kafkaBrokers);

KafkaConsumer.getInstance().init(kakfaStream, geoGroupId);

KafkaProducer.getInstance().init(kakfaStream);

async function startKafka() {    
    await KafkaProducer.getInstance().connect();

    await KafkaConsumer.getInstance().connect();

    await KafkaConsumer.getInstance().consume();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await KafkaProducer.getInstance().destroy();
            await KafkaConsumer.getInstance().destroy();
            process.exit(0);
        });
    });
}

export default startKafka;