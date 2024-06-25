import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// Define an error handling middleware function
export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log the error to the console
    console.error(err.stack);

    // Send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
};
