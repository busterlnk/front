import React, {useState} from 'react';
import '../styles/header.css';
import {useAuth} from "../context/AuthContext";
import sanRemoImage from '../images/sanRemo.jpg';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {

    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <img src={sanRemoImage} alt=""/>
                </div>
                <ul className="nav-center">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/sports">Deportes</a></li>
                    <li><a href="/history">Historial</a></li>
                </ul>
                <div className="nav-right">
                    {isLoggedIn  ?
                        <>
                            <a href="/account" className="nav-button">Mi cuenta</a>
                            <a href="/logout" onClick={logout} className="nav-button">Cerrar sesión</a>
                        </>
                    :
                        <a href="/login" className="nav-button">Iniciar sesión</a>
                    }

                </div>
            </nav>
        </header>
    );
};

export default Header;
