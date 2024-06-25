import jwt from 'jsonwebtoken';

const REFRESH_SECRET = process.env.REFRESH_SECRET || '';

export class JWTService {
    private static instance: JWTService;

    private constructor() {}

    public static getInstance(): JWTService {
        if (!JWTService.instance) {
            JWTService.instance = new JWTService();
        }
        return JWTService.instance;
    }

    public generateToken(payload: object,  expiresIn: string): string {
        return jwt.sign(payload, REFRESH_SECRET, { expiresIn });
    }

    public async verifyToken(token: string) {
        const prom = new Promise((resolve, reject) => {
            try {
                resolve(jwt.verify(token, REFRESH_SECRET));
            } catch (error) {
                return reject(null);
            }
        });

        return await prom;
    }
}
