import { Request, Response } from 'express';

export const getStripeConfig = async (req: Request, res: Response) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE || '';

    if (!publishableKey) {
        throw new Error('Publishable key is absent');
    }

    res.status(200).send({ data: { publishableKey }});
}