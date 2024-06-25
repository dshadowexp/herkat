
import DayCard from "./DayCard";

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

function getDayName(year: number, month: number, day: number) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(year, month - 1, day);
    return daysOfWeek[date.getDay()];
}

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysInMonth = getDaysInMonth(year, month);

const monthName = today.toLocaleString('default', { month: 'long' });

console.log(`The current month is ${monthName}.`);

console.log(`There are ${daysInMonth} days in the month of ${month}/${year}.`);

const allDays: { dayName: string, dayNumber: number}[] = []
for (let currentDay = day; currentDay <= daysInMonth; currentDay++) {
    const dayName = getDayName(year, month, currentDay);
    allDays.push({ dayName: dayName.substring(0, 3).toUpperCase(), dayNumber: currentDay })
}

export default function Month() {
    

    return (
        <>
            <h6>{ `${monthName} schedule`.toUpperCase()  }</h6>
            <div>
                {   allDays.map((d, ind) => 
                        <DayCard key={`${d.dayName}${d.dayNumber}${ind}`} {...d} />
                    )  
                }
            </div>
        </>
    )
}
