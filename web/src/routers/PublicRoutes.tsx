import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"

export default function PublicRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? <Navigate to="/" /> : <Outlet /> 
    )
}
