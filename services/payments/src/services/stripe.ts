import Stripe from "stripe";

const STRIPE_SECRECT = process.env.STRIPE_SECRET || "";
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET || "";
const APPLICATION_PORTION = 0.1;

class StripeService {
    private static _instance: StripeService;
    private _stripe: Stripe;

    private constructor() {
        this._stripe = new Stripe(STRIPE_SECRECT, {
            apiVersion: '2024-04-10',
        });
    }

    public static getInstance() {
        if (!StripeService._instance) {
            StripeService._instance = new StripeService();
        }

        return StripeService._instance; 
    }

    async constructEvent(body: string | Buffer, signature: string) {
        try {
            const event = this._stripe.webhooks.constructEvent(body, signature, STRIPE_ENDPOINT_SECRET);
            return event;
        } catch (error) {
            throw error;
        }
    }

    async createCustomer(name: string, email: string) {
        try {
            const customer = await this._stripe.customers.create({ name, email });
            return customer.id;
        } catch (error) {
            console.log('Error creating customer', error);
            throw error;
        }
    }

    async createConnectAccount(accountData: {country: string, email: string, name: string}) {
        try {
            const { email, country, name } = accountData;

            const account = await this._stripe.accounts.create({ 
                email: email,
                country: country,
                type: 'express',
                business_type: 'individual',
                business_profile: {
                    mcc: '7230',
                    name: name,
                    url: 'https://herkat-site.webflow.io/',
                    support_email: email,
                },
                capabilities: {
                    transfers: { requested: true }
                }, 
                tos_acceptance: {
                    service_agreement: country === 'US' ? 'full' : 'recipient'
                }
            });

            return account;
        } catch (error) {
            console.log('Error creating customer', error);
            throw error;
        }
    }

    async createAccountLink(accountId: string) {
        try {
            const accountLink = await this._stripe.accountLinks.create({
                account: accountId,
                refresh_url: 'http://localhost:5173/stylist/payment-account',
                return_url: 'http://localhost:5173/stylist',
                type: 'account_onboarding',
                collect: 'eventually_due'
            });

            return accountLink;
        } catch (error) {
            console.log('Error creating account link', error);
            throw error;
        }
    }

    async createAccountSession(accountId: string) {
        try {
            const accountSession = await this._stripe.accountSessions.create({
                account: accountId,
                components: {
                    payouts: {
                        enabled: true,
                        features: {
                            instant_payouts: true,
                            standard_payouts: true,
                            edit_payout_schedule: true,
                        }
                    }
                }
            });

            return accountSession;
        } catch (error) {
            console.log('Error creating account session', error);
            throw error;
        }
    }

    async getAccountBalance(accountId: string) {
        try {
            const accountSession = await this._stripe.balance.retrieve({
                stripeAccount: accountId,
            });

            return accountSession;
        } catch (error) {
            console.log('Error creating account session', error);
            throw error;
        }
    }

    async createPaymentMethod(customerId: string, cardToken: string) {
        try {
            const paymentMethod = await this._stripe.paymentMethods.create({
                customer: customerId,
                type: 'card',
                card: {
                    token: cardToken,
                }
            });

            return paymentMethod.id;
        } catch (error) {
            console.log('Error creating payment method', error);
            throw error;
        }
    }

    async removePaymentMethod(paymentMethodId: string) {
        try {
            await this._stripe.paymentMethods.detach(paymentMethodId);
        } catch (error) {
            console.log('Error removing payment method', error);
            throw error;
        }
    }

    async listPaymentMethods(customerId: string) {
        try {
            const paymentMethods = await this._stripe.paymentMethods.list({
                customer: customerId,
                type: 'card',
            });

            return paymentMethods.data;
        } catch (error) {
            console.log('Error listing payment methods', error);
            throw error;
        }
    }

    async destinationCharge(
        amount: number,
        currency: string,
        destinationId: string,
        orderId: string,
        paymentMethodId?: string,
        customerId?: string,
    ) {
        const convertedAmount = this._convertToCents(amount);
        const applicationFeeAmount = this._applicationFee(convertedAmount);
        
        try {
            const paymentIntent = await this._stripe.paymentIntents.create({
                amount: convertedAmount,
                payment_method: paymentMethodId,
                customer: customerId,
                confirm: true,
                currency,
                application_fee_amount: applicationFeeAmount,
                metadata: {
                    order_id: orderId
                },
                transfer_data: {
                    destination: destinationId
                }
            });

            return paymentIntent;
        } catch (error) {
            console.log("Error creating destination intent charge", error);
            throw error;
        }
    }

    async createSubscription(customerId: string, priceId: string) {
        try {
          // Create subscription
          const subscription = await this._stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
          });

          return subscription;
        } catch (error) {
          console.error('Error creating subscription:', error);
          throw error;
        }
      }

    private _convertToCents(amount: number) {
        return amount * 100;
    }

    private _applicationFee(amount: number) {
        return APPLICATION_PORTION * amount;
    }
}

export default StripeService;