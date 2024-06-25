import { createClient } from "redis";

class RedisService {
    private static _instance: RedisService;
    private _client: ReturnType<typeof createClient> | undefined;

    private constructor() {}

    public static getInstance(): RedisService {
        if (!RedisService._instance) {
            RedisService._instance = new RedisService();
        }
        return RedisService._instance;
    }

    public init(redisConfig: Record<string, any>) {
        if (this._client) {
            return;
        }
        
        this._client = createClient(redisConfig);

        this._client.on('error', function (err: Error) {
            console.error('Error from Redis:', err);
        });

        this._client.on('ready', function () {
            console.log('Redis client is ready!');
        });
    }

    async connect() {
        this.handleClient();
        await this._client!.connect();
    }

    async disconnect() {
        this.handleClient();
        await this._client!.disconnect();
    }

    async getData(key: string): Promise<string | null | undefined> {
        return await this._client?.get(key);
    }

    async setData(key: string, value: string) {
        await this._client?.set(key, value);
    }

    async setTransientData(key: string, value: string, expiresIn: number) {
        await this._client?.setEx(key, expiresIn * 60, value);
    }

    async removeData(key: string) {
        await this._client?.del(key);
    }

    get client() {
        this.handleClient();
        return this._client;
    }

    private handleClient() {
        if (!this._client) {
            throw new Error('Not connected to Redis. Call connect first!');
        }
    }
}

export default RedisService;