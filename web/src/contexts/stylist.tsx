/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./auth";
import { createStylist, getStylist } from "../apis/stylists";
import Loading from "../components/Loading";

interface Stylist {
    id: string;
    bookings: number,
    reviews: number,
    rating: number,
    verified: boolean,
} 

interface StylistContextType {
    stylist: Stylist | null
    setupStylist: ((_: string) => Promise<void>) | null
}

const INITIAL_STYLIST = {
    stylist: null,
    setupStylist: null,
}

const StylistContext = createContext<StylistContextType>(INITIAL_STYLIST);

export function useStylist() {
    return useContext(StylistContext);
}

interface StylistContextProps {
    children: React.ReactNode;
}

export function StylistProvider({ children }: StylistContextProps) {
    const { authToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [stylist, setStylist] = useState<Stylist | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        abortControllerRef.current = new AbortController();

        setLoading(true);
        getStylist(authToken, abortControllerRef.current.signal)
            .then((sty) => {
                setStylist(sty);
            })
            .catch((error) => {
                // console.log(error)
            }).finally(() => {
                setLoading(false);
            });

        return () => {
            abortControllerRef.current?.abort();
        }
    }, [])

    async function setupStylist(data: string) {
        try {
            const sty = await createStylist(authToken, data);
            setStylist(sty);
        } catch (error) {
            console.log(error);
        }
    }

    const value = { 
        stylist,
        setupStylist
    };

    return (
        <StylistContext.Provider value={value}>
            { loading ? <Loading /> : children }
        </StylistContext.Provider>
    )
}