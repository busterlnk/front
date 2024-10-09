import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicRoute({ children }) {
    const { isLoggedIn } = useAuth();

    // Si la sesi?n est? iniciada, redirigir a /home
    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    // Si no est? autenticado, permite el acceso a la ruta p?blica
    return children ? children : <Outlet />;
}
