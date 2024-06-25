import { Kafka, Partitioners, Producer, logLevel } from "kafkajs";

class KakfaProducer {
    private static _instance: KakfaProducer;
    private _producer: Producer | undefined;

    private constructor() {}

    public static getInstance() {
        if (!KakfaProducer._instance) {
            KakfaProducer._instance = new KakfaProducer();
        }

        return KakfaProducer._instance; 
    }

    public init(kafka: Kafka) {
        if (this._producer) {
            return KakfaProducer._instance;
        } 

        this._producer = kafka.producer({ 
            createPartitioner: Partitioners.DefaultPartitioner 
        });
    }

    public async connect() {
        this._handleClient();

        await this._producer?.connect();
        console.log('Kafka producer successfully connected');
    }

    public async produce(topic: string, payload: object, key='') {
        this._handleClient();

        try {
            const message = JSON.stringify(payload)
            await this._producer?.send({
                topic,
                messages: [{ key, value: message}],
            });
        } catch (error) {
            console.log('Error KafkaConfig produce', error);
        }
    }

    public async destroy() {
        this._handleClient();
        await this._producer?.disconnect();
    }

    private _handleClient() {
        if (!this._producer) {
            throw new Error('KafkaConfig says call init first');
        }
    }
}

export default KakfaProducer;