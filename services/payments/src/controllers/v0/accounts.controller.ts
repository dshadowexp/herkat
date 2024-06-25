import { pick } from "lodash";
import { Request, Response } from "express";
import { createPaymentAccount, findAccountByUid } from "../../repository/accounts.repository";
import StripeService from "../../services/stripe";
import { FirebaseService } from "@herkat/bolsters";
import { validateCreateAccountRequest } from "../../validations/account.validation";

export const createAccount = async (req: Request, res: Response) => {
    // Get User details
    const { uid } = req.user!;
    const { error, value } = validateCreateAccountRequest(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const { country } = value;
    const user = await FirebaseService.getInstance().getAuthUser(uid);
    const { email, displayName } = user;

    if (!email || !displayName) {
        return res.status(404).send({ message: 'Missing profile account' })
    }

    let account, accountLink;
    try {
        account = await StripeService.getInstance().createConnectAccount({ 
            email, country, name: displayName
        });

        accountLink = await StripeService.getInstance().createAccountLink(account.id);
    } catch (error) {
        return res.status(404).send({ message: "Error occured creating account link"});
    }
    
    await createPaymentAccount(uid, account.id);
    
    res.status(303).send({data: { url: accountLink.url }});
}

export const getAccount = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    const account = await findAccountByUid(uid);
    if (!account) {
        return res.status(404).send({ message: "Invalid request" });
    }

    res.status(200).send({ data: { account: pick(account, ['detailsSubmitted', 'chargesEnabled', 'payoutsEnabled']) }});
}

export const getAccountLink = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    const account = await findAccountByUid(uid);
    if (!account) {
        return res.status(404).send({ message: "Invalid request" });
    }

    let accountLink;
    try {
        accountLink = await StripeService.getInstance().createAccountLink(account.stripeAccountId);
    } catch (error) {
        return res.status(404).send({ message: "Error occured creating account link" });
    }

    res.status(303).send({data: { url: accountLink.url }});
}

export const createAccountSession = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    const account = await findAccountByUid(uid);
    if (!account) {
        return res.status(404).send({ message: "Invalid request" });
    }

    let session;
    try {
        session = await StripeService.getInstance().createAccountSession(account.stripeAccountId);
    } catch (error) {
        return res.status(404).send({ message: "Error occured creating session" });
    }

    const publishableKey = process.env.STRIPE_PUBLISHABLE || '';

    if (!publishableKey) {
        throw new Error('Publishable key is absent');
    }

    res.status(201).send({ data: { clientSecret: session.client_secret, publishableKey } });
}

export const getAccountBalance = async (req: Request, res: Response) => {
    const { uid } = req.user!;

    const account = await findAccountByUid(uid);
    if (!account) {
        return res.status(404).send({ message: "Invalid request" });
    }

    let balance;
    try {
        balance = await StripeService.getInstance().getAccountBalance(account.stripeAccountId);
    } catch (error) {
        return res.status(404).send({ message: "Error occured getting balance" });
    }

    const { available } = balance;
    res.status(201).send({ data: { balance: available[0] } });
}