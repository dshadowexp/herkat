import { useMemo } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Availability } from "../../core/domains";
import { Trash } from "react-bootstrap-icons";
import { capitalize } from "../../core/util";

function generateTimes(startHour: number, endHour: number) {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour}:00`);
    }
    return times;
}
const times = generateTimes(7, 22);

type AvailabilityItemData = {
    day: string,
    startTime: string,
    endTime: string,
}

type AvailabilityItemProps = AvailabilityItemData & {
    removeAvailability: (day: string) => void
    editAvailability: (avail: Availability) => void
}

export default function DayAvailability({ day, startTime, endTime, editAvailability, removeAvailability }: AvailabilityItemProps) {
    const endTimes = useMemo(() => {
        if (startTime) {
            return times.filter(t => Number(t.split(':')[0]) > Number(startTime.split(':')[0]));
        }
        return [];
    }, [startTime])

    return (
        <InputGroup className="mb-2">
            <InputGroup.Text>{ capitalize(day) }</InputGroup.Text>
            <Form.Select value={startTime} onChange={(e) => { editAvailability({day, startTime: e.target.value, endTime}) }}>
                {times.map((time) => (
                    <option key={time} value={time}>{ time }</option>
                ))}
            </Form.Select>
            <Form.Select value={endTime} onChange={(e) => { editAvailability({day, endTime: e.target.value, startTime}) }}>
                {endTimes.map((time) => (
                    <option key={time} value={time}>{ time }</option>
                ))}
            </Form.Select>
            <Button type="button" variant="outline-danger" onClick={() => removeAvailability(day)}>
                <Trash color="red" />
            </Button>
        </InputGroup>
    )
}