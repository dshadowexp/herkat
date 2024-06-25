import { Request, Response } from "express";
import StripeService from "../../services/stripe";
import { findAccountByUid } from "../../repository/accounts.repository";

export const addPaymentMethod = async (req: Request, res: Response) => {
    const { cardToken } = req.body;
    if (!cardToken) {
        return res.status(400).send({ message: 'Invalid request' });
    }

    const { uid } = req.user!;
    const account = await findAccountByUid(uid);
    if (!account) {
        return res.status(400).send({ message: 'Account not found' });
    }

    const { stripeAccountId } = account;
    const paymentMethodId = await StripeService.getInstance().createPaymentMethod(stripeAccountId, cardToken);
    res.status(201).send({ message: "Payment method added successfully", data: { methodId: paymentMethodId } });
}

export const getPaymentMethods = async (req: Request, res: Response) => {
    const { uid } = req.user!;
    const account = await findAccountByUid(uid);
    if (!account) {
        return res.status(400).send({ message: 'Account not found' });
    }

    const { stripeAccountId } = account;
    const methods = await StripeService.getInstance().listPaymentMethods(stripeAccountId);
    res.status(200).send({ data: { methods }});
}

export const removePaymentMethod = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Missing payment method id" });
    }

    await StripeService.getInstance().removePaymentMethod(id);
    return res.status(206).send({ message: "Payment method removed" });
}