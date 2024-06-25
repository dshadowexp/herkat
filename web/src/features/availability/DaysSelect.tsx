import { Badge } from "react-bootstrap";
import { Availability } from "../../core/domains";

const daysList: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

type DaySelectProps = {
  availabilities: Availability[]
  addDay: (day: string) => void
}

export default function DaysSelect({ availabilities, addDay }: DaySelectProps) {

  return (
    <div className="mb-3 d-flex gap-2">
        {
            daysList.map((day) => {
              const isSelected = availabilities.find((a) => a.day === day) !== undefined;
              return (
                <Badge 
                  key={day}
                  bg={isSelected ? "primary" : "secondary"}
                  onClick={() => addDay(day)}
                >
                  { day.substring(0, 1).toUpperCase() }
                </Badge>
              )
            })
        }
    </div>
  )
}
