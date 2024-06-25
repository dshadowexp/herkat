import { Request, Response, NextFunction } from 'express';

// Define a middleware function to check if the user is authorized
export const authorize = (allowedRoles: string[], allowedTypes: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role, type } = req.user!;

        if (allowedRoles.length > 0) {
            const inRoles = allowedRoles.find(r => r === role);
            if (!inRoles) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
        }

        if (allowedTypes.length > 0) {
            const inTypes = allowedTypes.find(t => t === type);
            if (!inTypes) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
        }

        next();
    };
};
