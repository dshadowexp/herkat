/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

const PAYMENTS_URL = 'http://localhost:3002/api/v0/payments';

function PaymentCard() {
    const stripe = useStripe();
    const elements = useElements();
    const { authToken } = useAuth();
    const [booking, setBooking] = useState<{ price: number, name: string }>({ price: 0, name: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        const timeOut = setTimeout(() => {
            setBooking({  price: 19.99, name: 'Hair Trim' });
            setLoading(false);
        }, 2000);

        return () => { clearTimeout(timeOut) }
    }, [])

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (elements === null || stripe === null) {
            return;
        }   

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement);

        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            setErrorMessage(submitError.message);
        }

        const { price } = booking;

        const res = await fetch(`${PAYMENTS_URL}/pay/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                currency: 'cad',
                amount: price,
                paymentMethodType: "card"
            })
        });

        if (!res.ok) {
            console.log(res);
            return;
        }

        const { clientSecret } = await res.json();
        console.log('client secret:', clientSecret);

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/success`
            }
        });

        console.log(error);
    }

    return (
        <div style={{ minWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2>Payment</h2>
                    {loading ? <span>Loading...</span> : `${booking.name}: ${booking.price}`}
                    <Form id="payment-form" onSubmit={handleOnSubmit}>
                        <CardElement />
                        <Button className="mt-2" type="submit" disabled={!stripe || !elements || loading}>
                            Pay
                        </Button>
                    </Form>
                    { errorMessage && <div>{ errorMessage }</div>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default function Pay() {
    const { authToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pK, setPK] = useState('');
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
    const abortControllerRef = useRef<AbortController | null>(null);
    
    useEffect(() => {
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        async function getPK() {
            try {
                setLoading(true);
                const response = await fetch(`${PAYMENTS_URL}/config/stripe`, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('invalid request');
                } 
                
                const { publishableKey } = (await response.json()).data;
                setPK(publishableKey);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            } 
        }

        getPK();

        return () => {
            abortControllerRef.current?.abort();
        }
    }, [])

    useEffect(() => {
        if (pK && !stripePromise) {      
            setStripePromise(loadStripe(pK));
        }
    }, [pK, stripePromise]);

    return (
        loading ? 
        <div>loading...</div> : 
        ( 
            pK && stripePromise ? 
            <Elements stripe={stripePromise}>
                <PaymentCard />
            </Elements> : 
            <div>Loading payment...</div>
        )
    )
}



