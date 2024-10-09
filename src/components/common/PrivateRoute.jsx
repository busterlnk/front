import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn === null) {
        return <div>Loading...</div>; // Muestra un loader mientras se valida el JWT
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
}
