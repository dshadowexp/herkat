import { Request, Response, NextFunction } from "express";

export const authenticate = (decodeToken: (token: string) => Promise<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const token = authorization.split(" ")[1];

        // Verify token and extract user info
        const decodedToken = await decodeToken(token);
        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}