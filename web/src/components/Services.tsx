/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useStylist } from "../contexts/stylist";
import { getServicesSummary } from "../apis/services";
import { useAuth } from "../contexts/auth";
import { Service } from "../core/domains";
import ServiceCard from "./cards/ServicesCard";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Services() {
    const navigate = useNavigate();
    const { stylist } = useStylist();
    const { authToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        setLoading(true);
        if (stylist) {
            getServicesSummary(stylist?.id, authToken, signal)
                .then((services) => {
                    setServices(services);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        
        return () => {
            abortControllerRef.current?.abort();
        }
    }, []);

    const handleAddService = () => {
        navigate('/stylist/service');
    }

    return (
        <>
            <div className="mt-4 mb-2 w-100">
                <h6>SERVICES</h6>
                {
                    loading ? 
                    <Loading /> : 
                    services.map((serv) => (
                        <ServiceCard key={serv.id} service={serv} />
                    ))
                }
                <Button className="w-100" onClick={handleAddService}>Add Service</Button>
            </div>
        </>
    )
}