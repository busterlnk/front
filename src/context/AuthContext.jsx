// AuthContext.js
import React, { useState, createContext, useContext } from 'react';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de instalar esta librería si no lo has hecho: npm install jwt-decode

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(null);

    // Verificar si el token es válido
    const validateToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now(); // Verifica si el token ha expirado
            return !isExpired;
        } catch (error) {
            return false;
        }
    };

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && validateToken(token)) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const setLogin = (token) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
