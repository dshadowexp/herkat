import { Request } from "express";

declare global {
    namespace Express {
        export interface Request {
            user?: { uid: string, role?: string, type?: string };
        }
    }
}