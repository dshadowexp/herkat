import { Request, Response } from "express";
import StripeService from "../../services/stripe";
import { KafkaProducer } from "@herkat/bolsters";

export const stripeWebhookHandler = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = await StripeService.getInstance().constructEvent(req.body, sig as string);
    } catch (err) {
        console.error('Error verifying webhook signature:', err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }

    await KafkaProducer.getInstance().produce('stripe_webhook', event);

    res.json({ received: true });
}