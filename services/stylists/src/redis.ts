import { RedisService } from "@herkat/bolsters";

const remoteRedisConfig = { 
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    } 
};

RedisService.getInstance().init(remoteRedisConfig)

async function startRedis() {
    await RedisService.getInstance().connect();

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    signals.forEach((signal) => {
        process.on(signal, async () => {
            await RedisService.getInstance().disconnect();
            process.exit(0);
        });
    });
}

export default startRedis;