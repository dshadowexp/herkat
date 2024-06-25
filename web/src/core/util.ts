export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

export function getDayName(year: number, month: number, day: number) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(year, month - 1, day);
    return daysOfWeek[date.getDay()];
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPhoneNumber(phoneNumber: string) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedPhoneNumber;
}
// const today = new Date();
// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const day = today.getDate();
// const daysInMonth = getDaysInMonth(year, month);

// const monthName = today.toLocaleString('default', { month: 'long' });

// console.log(`The current month is ${monthName}.`);

// console.log(`There are ${daysInMonth} days in the month of ${month}/${year}.`);

// const allDays: { dayName: string, dayNumber: number}[] = []
// for (let currentDay = day; currentDay <= daysInMonth; currentDay++) {
//     const dayName = getDayName(year, month, currentDay);
//     allDays.push({ dayName: dayName.substring(0, 3).toUpperCase(), dayNumber: currentDay })
// }

// export default function Month() {
    

//     return (
//         <>
//             <h6>{ `${monthName} schedule`.toUpperCase()  }</h6>
//             <div>
//                 {   allDays.map((d, ind) => 
//                         <DayCard key={`${d.dayName}${d.dayNumber}${ind}`} {...d} />
//                     )  
//                 }
//             </div>
//         </>
//     )
// }

// type SetupReqProps = {
//     index: number
//     text: string,
//     canCall: boolean,
//     description: string,
//     onClick: () => void
// }   

// function SetupReq({ index, text, canCall, description, onClick }: SetupReqProps) {
//     return (
//         <Accordion.Item eventKey={`${index}`}>
//             <Accordion.Header> <ExclamationCircle className="mr-2" color="blue" /><span style={{ color: "blue", fontStyle: "italic" }}>{ `${text}` }</span></Accordion.Header>
//             <Accordion.Body>
//                 <div>
//                     <p>{ description }</p>
//                     <Button disabled={!canCall} variant="primary" onClick={onClick}>
//                         <span>Complete</span>
//                     </Button>
//                 </div>
//             </Accordion.Body>
//         </Accordion.Item>
//     )
// }

// <Accordion>
//                     {/* { <SetupReq canCall={stylist !== null} index={0} text="Set your availability" description="The user needds to setup things that will be used for all the best things in the world over here" onClick={() => { navigate('/stylist/setup') }} />} */}
//                 </Accordion>
