import { getAccountModel, retrievePrismaClient } from ".";

export async function createPaymentAccount(uid: string, stripeAccountId: string) {
    try {
        const user = await getAccountModel().create({
            data: { uid, stripeAccountId }
        });

        return user;
    } catch (error) {
        throw error;
    }
}

export async function findAccountByUid(uid: string) {
    try {
        const user = await retrievePrismaClient().account.findUnique({
            where: {
                uid
            }
        });

        return user;
    } catch (error) {
        return null;
    }
}

export async function updateAccountByStripeAccountId(
    stripeAccountId: string, 
    data: {
        chargesEnabled: boolean,
        payoutsEnabled: boolean,
        detailsSubmitted: boolean
    }
) {
    try {
        await retrievePrismaClient().account.update({
            where: { stripeAccountId },
            data: {...data}
        });
    } catch (error) {
        return null
    }
}