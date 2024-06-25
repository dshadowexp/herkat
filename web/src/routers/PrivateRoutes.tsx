import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"

export default function PrivateRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}
