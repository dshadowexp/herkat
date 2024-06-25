/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap"
import { GeoAlt, Pencil } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { getCurrentAddress } from "../../apis/geo";
import { useAuth } from "../../contexts/auth";

export default function LocationCard() {
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('');

    useEffect(() => {
        setLoading(true);
        getCurrentAddress(authToken)
            .then((location) => {
                setCurrentLocation(location);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    return (
        <>
            <div className="mb-2">
                <Card>
                    <Card.Body className="d-flex">
                        <Stack direction="horizontal" className="w-100" gap={3}>
                            <div><GeoAlt color="#1570ef" /></div>
                            <div className="vr" />
                            <div className="w-100 d-flex justify-content-between align-items-center mx-auto">
                                <div>
                                    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                        { currentLocation ? currentLocation : "Your location..." }
                                    </span>
                                </div>
                                <Button size="sm" variant="primary" disabled={loading} onClick={() => { navigate('/stylist/payment-account') }}>
                                    <Pencil color="white" />
                                </Button>
                            </div>
                        </Stack>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
