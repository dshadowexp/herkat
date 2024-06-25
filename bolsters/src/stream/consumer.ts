import { Kafka, Admin, Consumer, logLevel } from "kafkajs";

class KafkaConsumer {
    private static _instance: KafkaConsumer;
    private _admin: Admin | undefined;
    private _consumer: Consumer | undefined;
    private _subs: Record<string, (data: any) => Promise<void>>;
    private _groupId: string;

    private constructor() {
        this._subs = {};
        this._groupId = '';
    }

    public static getInstance() {
        if (!KafkaConsumer._instance) {
            KafkaConsumer._instance = new KafkaConsumer();
        }

        return KafkaConsumer._instance;
    }

    public init(kafka: Kafka, groupId: string) {
        if (this._consumer) {
            return KafkaConsumer._instance;
        }

        this._groupId = groupId;
        this._admin = kafka.admin();
        this._consumer = kafka.consumer({ groupId  });
    }

    public async connect() {
        this._handleClient();

        await this._consumer?.connect();
        console.log('Kafka consumer successfully connected');
    }

    public async addSubscription(topicName: string, handler: (data: any) => Promise<void>) {
        this._handleClient();

        this._subs[topicName] = handler;
        await this._consumer?.subscribe({ 
            topic: topicName, 
            fromBeginning: false 
        });
    }

    public async consume() {
        this._handleClient();

        await this._consumer?.run({
            eachMessage: async ({ topic, message }) => {
                if (!message || !message.value) {
                    return;
                }

                const data = JSON.parse(message.value.toString());
                
                const topicHandler = this._subs[topic];

                if (topicHandler) {
                    await topicHandler(data);
                }
            }
        });
    }

    public async destroy() {
        this._handleClient();
        await this._consumer?.disconnect();
        await this._admin?.deleteGroups([this._groupId])
    }

    private _handleClient() {
        if (!this._admin || !this._consumer) {
            throw new Error('KafkaConfig says call init first');
        }
    }
}

export const asyncWrapper = (handler: (data: any) => Promise<void>) => async (data: any) => {
    try {
        await handler(data);
    } catch (error) {
        console.log(error);
    }
}

export default KafkaConsumer;