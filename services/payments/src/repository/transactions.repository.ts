import { getTransactionModel } from ".";

export async function createTransaction(transactionData: {
    externalRef: string,
    description: string
    orderId: string
    destinationId: string
    customerId?: string
    methodId?: string
    amount: number
    currency: string
}) {
    try {
        // const transaction = await getTransactionModel().create({
        //     data: { ...transactionData }
        // });

        return transactionData;
    } catch (error) {
        throw error;
    }
}

export async function updateTransaction(uid: string, data: any) {
    try {
        
    } catch (error) {
        throw error;
    }
}