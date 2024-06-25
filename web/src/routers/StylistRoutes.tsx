import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"
import { StylistProvider } from "../contexts/stylist";

export default function StylistRoutes() {
    const { isStylist } = useAuth();

    return (
        isStylist ? <StylistProvider> <Outlet /> </StylistProvider>  : <Navigate to="/client" />
    )
}
