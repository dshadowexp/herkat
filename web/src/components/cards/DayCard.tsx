import { Badge, Button, Card, Stack } from "react-bootstrap";
import { getDayName } from "../../core/util";
import { useEffect, useState } from "react";
import { Google } from "react-bootstrap-icons";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const dayName = getDayName(year, month, day).substring(0, 3).toUpperCase();

type BookingSummary = {
    id: string
    session: string
    profileUrl: string
    startTime: string
    endTime: string
}

export default function DayCard() {
    const [bookings, setBookings] = useState<BookingSummary[]>([]);

    useEffect(() => {
        setBookings([]);
    }, [])

    return (
        <div>
            <h6>TODAY</h6>
            <Card className="mb-2">
                <Card.Body>
                    <Stack direction="horizontal" className="w-100 d-flex align-items-center" gap={2}>
                        <div className="flex align-items-center" style={{ textAlign: 'center' }}>
                            <div ><span style={{ fontSize: "10px" }}>{dayName.toUpperCase()}</span></div>
                            <h2 style={{ color: "#1570ef" }}>{day}</h2>
                        </div>
                        <div className="vr" />
                        <div className="d-flex justify-content-start align-items-start gap-1" style={{ flexWrap: "wrap" }}>
                            {
                                bookings.length < 1 ?
                                <span style={{ fontWeight: "bold" }}>No bookings today</span> :
                                bookings.map((value,ind) => (
                                    <Badge key={`${dayName}${day}${value}${ind}`} bg="light" text="dark">
                                        <div className="d-flex gap-1">
                                            <div>{value.startTime}-{value.endTime}</div>
                                        </div>
                                    </Badge>
                                ))
                            }
                        </div>
                    
                    </Stack>
                </Card.Body>
            </Card>
            <Button variant="outline-primary" className="w-100">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <Google />
                    <div>Connect Google Calendar</div>
                </div>
            </Button>
        </div>
    )
}
