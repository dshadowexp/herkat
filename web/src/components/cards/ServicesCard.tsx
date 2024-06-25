/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement } from "react";

import { Gender, Service, ServiceType, Session } from "../../core/domains";
import { BuildingFill, DropletHalf, HousesFill, Palette, PersonStanding, PersonStandingDress, Scissors, StopwatchFill, Water } from "react-bootstrap-icons";
import { Button, Card, Stack } from "react-bootstrap";

const serviceTypeIcons: Record<ServiceType, ReactElement> = {
    'trim': <Scissors />,
    'braid': <Water />,
    'color': <Palette />,
    'treatment': <DropletHalf />
}

const genderTypeIcons: Record<Gender, ReactElement> = {
    'male': <PersonStanding />,
    'female': <PersonStandingDress />
}

const sessionTypeIcons: Record<Session, ReactElement> = {
    'inperson': <HousesFill />,
    'inoffice': <BuildingFill />
}

type ServiceCardProps = {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <>
            <Card className="mb-2 w-100">
                <Card.Body className="d-flex w-100 align-items-center">
                    <Stack direction="horizontal" className="w-100" gap={3}>
                        <div>
                            <img
                                alt=""
                                src="/logo.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top"
                            />
                        </div>
                        <div className="vr" />
                        <div className="flex w-100 align-items-start mx-auto">
                            <div className="mb-2 w-100 d-flex justify-content-between align-items-center">
                                <div>
                                    <span>
                                        {service.price.toLocaleString('en-US', { 
                                            style: 'currency', 
                                            currency: service.currency.toUpperCase() 
                                        })} 
                                    </span>
                                </div>
                                <div className="vr"></div>
                                <div className="d-flex align-items-center">
                                    <StopwatchFill />
                                    <span>{service.duration}mins</span>
                                </div>
                            </div>
                            <div className="mb-2 d-flex align-items-center justify-content-between">
                                {serviceTypeIcons[service.type]}
                                <div className="vr"></div>
                                <div className="d-flex align-items-center">
                                    {service.genders.map((gen) => (
                                        <div key={gen}>{genderTypeIcons[gen]}</div>
                                    ))}
                                </div>
                                <div className="vr"></div>
                                <div className="d-flex align-items-center">
                                    {service.sessions.map((ses) => (
                                        <div key={ses}>{sessionTypeIcons[ses]}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <Button variant="outline-success" className="w-100">Edit</Button>
                                <Button variant="outline-danger" className="w-100">Delete</Button>
                            </div>
                        </div>
                    </Stack>
                </Card.Body>
            </Card>
        </>
    )
}
