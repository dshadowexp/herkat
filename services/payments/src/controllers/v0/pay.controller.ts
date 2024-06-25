import { Request, Response } from "express";
import { findAccountByUid } from "../../repository/accounts.repository";
import StripeService from "../../services/stripe";
import { createTransaction } from "../../repository/transactions.repository";
import { validateCreatePayRequest } from "../../validations/pay.validation";

export const createDestinationIntent = async (req: Request, res: Response) => {
    const { error, value } = validateCreatePayRequest(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const { destinatinId, amount, currency, orderId, paymentMethodId: methodId } = value;

    const destinationAccount = await findAccountByUid(destinatinId);
    if (!destinationAccount) {
        return res.status(404).send({ message: "Destination account not found" });
    }

    const { stripeAccountId: destinationId } = destinationAccount;
    
    const { uid } = req.user!;
    const customerAccount = await findAccountByUid(uid);
    let customerId;
    if (customerAccount) {
        customerId = customerAccount.stripeAccountId;
    }

    const paymentIntent = await StripeService.getInstance().destinationCharge(
        Number(amount),
        currency,
        destinationId,
        orderId,
        methodId,
        customerId,
    );

    await createTransaction({
        externalRef: paymentIntent.id,
        description: '',
        amount: Number(amount),
        currency,
        destinationId,
        orderId,
        methodId,
        customerId
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
}