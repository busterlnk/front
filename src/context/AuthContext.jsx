// AuthContext.js
import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(null);

    // Cargar el estado inicial de localStorage o cualquier otra lógica de autenticación
    React.useEffect(() => {
        const userLoggedIn = localStorage.getItem('token') !== null;
        setLoggedIn(userLoggedIn);
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
