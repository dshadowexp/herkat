/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react"
import { useAuth } from "../contexts/auth"
import { Button, Form, ListGroup } from "react-bootstrap"
import { Pen, Trash } from "react-bootstrap-icons"
import { createAvailability, deleteAvailability, getAvailabilities, updateAvailability } from "../apis/availability"
import useToggle from "../hooks/useToggle";

type Day = 'mon'| 'tue'| 'wed'| 'thu'| 'fri'| 'sat'| 'sun' | ''
type Availability = {
    day: Day,
    startTime: string
    endTime: string
}

type AvailabilityStepData = {
    active: boolean
    isEditing: boolean
    data: Availability
    availabilities: Availability[]
}

type AvailabilityStepProps = AvailabilityStepData & {
    onUpdate: (field: Partial<Availability>) => void
    onEditChange: () => void
    onAvailabilityChange: (data: Availability) => void
}

const daysList: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const daysMap: Record<Day, string> = { 'mon': 'Monday', 'tue': 'Tuesday', 'wed': 'Wednesday', 'thu': 'Thursday', 'fri': 'Friday', 'sat': 'Saturday', 'sun': 'Sunday', '': '' }
function generateTimes(startHour: number, endHour: number) {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour}:00`);
    }
    return times;
}
const times = generateTimes(5, 23);
const initData: Availability = {
    day: '',
    startTime: '',
    endTime: '',
}

function AvailabilityForm({ active, data, onUpdate, isEditing, availabilities, onEditChange, onAvailabilityChange }: AvailabilityStepProps) {

    const daysToSelect = useMemo(() => {
            return daysList.filter(da => !availabilities.find(av => av.day === da))
    }, [availabilities]);

    const endTimes = useMemo(() => {
        return times.filter(t => Number(t.split(':')[0]) > Number(data.startTime.split(':')[0]));
    }, [data.startTime])

    const handleAddAvailability = async () => {
        if (data.day && data.startTime && data.endTime) {
            onAvailabilityChange(data);
        } else {
            console.log('Please select day, start time, and end time.');
        }
    }

    return (
        <>
            <div className="d-flex gap-1">
                <Form.Select disabled={!active || isEditing} value={data.day} onChange={e => onUpdate({ day: e.target.value as Day })}>
                    <option value="">Day</option>
                    {daysToSelect.map((currDay) => (
                        <option key={currDay} value={currDay}>{ daysMap[currDay] }</option>
                    ))}
                </Form.Select>
                <Form.Select disabled={!active} value={data.startTime} onChange={e => onUpdate({ startTime: e.target.value })}>
                    <option value="">Start</option>
                    {times.map((time) => (
                        <option key={time} value={time}>{ time }</option>
                    ))}
                </Form.Select>
                <Form.Select disabled={!active} value={data.endTime} onChange={e => onUpdate({ endTime: e.target.value })}>
                    <option value="">End</option>
                    {endTimes.map((time) => (
                        <option key={time} value={time}>{ time }</option>
                    ))}
                </Form.Select>
            </div>
            <div className="d-flex justify-space-between mt-2 gap-2">
                <Button disabled={!active} className="w-100" variant="primary" onClick={handleAddAvailability}>{ isEditing ? 'Update' : 'Add' }</Button>
                {
                    isEditing && (
                        <Button disabled={!active} size="sm" variant="secondary" onClick={onEditChange}>
                            Cancel
                        </Button>
                    )
                }
            </div>

        </>        
    )
}

type AvailabilityItemProps = Availability & {
    active: boolean,
    underEditing: Day,
    onRemove: () => void
    onEdit: () => void
}

function AvailabilityItem({ day, startTime, endTime, active, underEditing, onEdit, onRemove }: AvailabilityItemProps) {
    return (
        <>
            <ListGroup.Item as="li">
                <div className="d-flex justify-content-between align-items-center">
                    { !active && (underEditing == day) && <Pen color="grey" /> }
                    <div className="d-flex ms-2 me-auto align-items-center">
                        <span style={{ color: "#1570ef" }}>{day.toUpperCase()}</span>: {startTime} - {endTime}
                    </div>
                    <div className="d-flex gap-2">
                        <Button disabled={!active}  className="mr-2" size="sm" variant={!active ? "outline-secondary" : "outline-success"} onClick={onEdit}>
                            <Pen color={!active ? "grey" : "green"} />
                        </Button>
                        <div className="vr" />
                        <Button disabled={!active} size="sm" variant={!active ? "outline-secondary" : "outline-danger"} onClick={onRemove}>
                            <Trash color={!active ? "grey" : "red"}  />
                        </Button>
                    </div>
                </div>
            </ListGroup.Item>
        </>
    )
}

function customSort(a: Availability, b: Availability) {
    return daysList.indexOf(a.day) - daysList.indexOf(b.day);
}

export default function Availability() {
    const { authToken } = useAuth();
    const { value, on, off } = useToggle(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Availability>(initData)
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const abortControllerRef = useRef<AbortController | null>(null);

    const sortedAvailabilities = useMemo(() => {
        return availabilities.sort(customSort)
    }, [availabilities]);

    useEffect(() => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        setLoading(true)
        getAvailabilities(authToken, signal)
            .then((avails) => {
                setAvailabilities(avails);
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

    const addAvailability = (data: Availability) => {
        setLoading(true);
        createAvailability(authToken, data)
            .then((avail) => {
                setAvailabilities(prev => {
                    return [...prev, avail];
                });
                setFormData(initData);
            })
            .catch((error) => {
                console.log('Inside add new', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const editAvailability = (data: Availability) => {
        setLoading(true);
        updateAvailability(authToken, data)
            .then((avail) => {
                setAvailabilities(prev => {
                    return prev.map((p) => {
                        if (p.day === avail.day) return avail;
                        return p
                    })
                });
                setFormData(initData);
            })
            .catch((error) => {
                console.log('Inside add new', error);
            })
            .finally(() => {
                setLoading(false);
                off();
            })
    }

    const removeAvailability = (day: Day) => {
        setLoading(true);
        deleteAvailability(authToken, day)
            .then(() => {
                setAvailabilities(prev => {
                    return prev.filter(p => p.day !== day);
                })
            })
            .catch((error) => {
                console.log('Inside add new', error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const updateData = (fields: Partial<Availability>) => {
        setFormData(prevData => {
            return { ...prevData, ...fields };
        })
    }

    return (
        <div className="mt-2" style={{ width: "100%" }}>  
            <h2>Availability</h2>
            <p>Set the days and working hours</p>
            <ListGroup as="ul" className="mt-2 mb-2">
                {
                    availabilities && sortedAvailabilities.map((av) => {
                        return (
                            <AvailabilityItem 
                                key={av.day} 
                                active={!loading && !value} 
                                underEditing={formData.day}
                                day={av.day} 
                                startTime={av.startTime} 
                                endTime={av.endTime} 
                                onEdit={() => { on(); setFormData(av); }}
                                onRemove={() => removeAvailability(av.day)}
                            />
                        )
                    })
                }
            </ListGroup>
            {
                availabilities.length < 7 &&
                <AvailabilityForm 
                    isEditing={value} 
                    active={!loading} 
                    data={formData}
                    availabilities={availabilities}
                    onUpdate={updateData}
                    onEditChange={() => { off(), setFormData(initData) }} 
                    onAvailabilityChange={ value ? editAvailability : addAvailability } 
                />
            }
            
        </div>
    )
}