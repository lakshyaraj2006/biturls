import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestRoutes = () => {
    const { auth } = useAuth();
    
    return (
        !auth?.authToken ? <Outlet /> : <Navigate to="/" />
    )
}

export default GuestRoutes;