import { useMemo } from "react";
import { Availability } from "../../core/domains";
import DayAvailability from "./DayAvailability";
import DaysSelect from "./DaysSelect";

const daysList: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

type SetAvailabilityProps = {
    availabilities: Availability[]
    addAvailability: (day: string) => void
    removeAvailability: (day: string) => void
    editAvailability: (avail: Availability) => void
}

export default function SetAvailability({ availabilities, addAvailability, removeAvailability, editAvailability }: SetAvailabilityProps) {
    const availList = useMemo(() => {
        return availabilities.sort((a, b) => daysList.indexOf(a.day) - daysList.indexOf(b.day))
    }, [availabilities]);

    return (
        <div>
            <DaysSelect 
                availabilities={availabilities} 
                addDay={addAvailability} 
            />
            {
                availList.map((avail) => (
                    <DayAvailability 
                        {...avail}
                        key={avail.day}  
                        editAvailability={editAvailability} 
                        removeAvailability={removeAvailability}
                    />
                ))
            }
        </div>
    )
}
