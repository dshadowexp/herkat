/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getAccountBalance } from "../../apis/payment"
import { useAuth } from "../../contexts/auth"
import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrencyDollar } from "react-bootstrap-icons";

export default function PayoutCard() {
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [balance, setBalance] = useState('0.00');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAccountBalance(authToken)
            .then((value) => {
                if (value) {
                    const bal = value.amount.toLocaleString('en-US', { 
                        style: 'currency', 
                        currency: value.currency.toUpperCase() 
                    })
                    setBalance(bal);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])
    
    return (
        <div className="mb-2">
            <Card>
                <Card.Body className="d-flex">
                    <Stack direction="horizontal" className="w-100" gap={3}>
                        <div><CurrencyDollar color="#1570ef" /></div>
                        <div className="vr" />
                        <div className="w-100 d-flex justify-content-between align-items-center mx-auto">
                            <div><span>{balance}</span></div>
                            <Button 
                                variant="primary" 
                                disabled={loading} 
                                onClick={() => { navigate('/stylist/payment-account') }}
                            >
                                Cashout
                            </Button>
                        </div>
                    </Stack>

                </Card.Body>
            </Card>
        </div>
    )
}
