type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

interface Availability {
    day: Day,
    startTime: string,
    endTime: string
}

export interface SetupStylistData {
    uid: string,
    location: string
    availabilities: Availability[]
}