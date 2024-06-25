/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Stack } from "react-bootstrap"
import { Pencil, Wifi, WifiOff } from "react-bootstrap-icons";
import { Availability } from "../../core/domains";
import { useNavigate } from "react-router-dom";
import { getAvailability } from "../../apis/availability";
import { useAuth } from "../../contexts/auth";
import { getDayName } from "../../core/util";

const startData: Availability = {
    day: '',
    startTime: '',
    endTime: '',
}

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const dayName = getDayName(year, month, day);

export default function AvailabilityCard() {
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState<Availability>(startData);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        setLoading(true);
        
        getAvailability(authToken, dayName.substring(0, 3).toLowerCase(), signal)
            .then((avail) => {
                setAvailability(avail);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            abortControllerRef.current?.abort();
        }
    }, [])

    const online = useMemo(() => {
        return true;
    }, [availability])

    return (
        <>
            <div className="mb-2">
                <Card>
                    <Card.Body className="d-flex">
                        <Stack direction="horizontal" className="w-100" gap={3}>
                            <div>{ online ? <Wifi color="green" /> : <WifiOff color="grey" /> } </div>
                            <div className="vr" />
                            <div className="w-100 d-flex justify-content-between align-items-center mx-auto">
                                <div>
                                    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                        { `${availability.day.toUpperCase()}: ${availability.startTime} - ${availability.endTime}`  }
                                    </span>
                                </div>
                                <Button size="sm" variant="secondary" disabled={loading} onClick={() => { navigate('/stylist/availability') }}>
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
