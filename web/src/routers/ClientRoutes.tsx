import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"

export default function ClientRoutes() {
    const { isStylist } = useAuth();

    return (
        isStylist ? <Navigate to="/stylist" /> : <Outlet /> 
    )
}
