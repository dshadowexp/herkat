import { Kafka, logLevel } from "kafkajs";

const createKafkaClient = (clientId: string, brokers: string[]) => {
    return new Kafka({
        clientId,
        brokers,
        logLevel: logLevel.INFO
    });
}

export default createKafkaClient