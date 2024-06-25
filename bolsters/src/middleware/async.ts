import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define a middleware function to wrap async controller functions
export const asyncHandler = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
