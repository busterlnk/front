import React, {useEffect, useState} from 'react';
import '../styles/header.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {useAuth} from "../context/AuthContext";
import sanRemoImage from '../images/sanRemo.ico';
import {getSports} from "../api/request/sportRequest";

const Header = () => {

    const { isLoggedIn, logout } = useAuth();

    const sports = [{id: 1, name: 'Padel'},{id:2, name: 'Tenis'}];

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="logo" href="/home">
                    <img src={sanRemoImage} alt="San Remo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className='navbar-container'>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        {sports &&
                            <NavDropdown title="Deportes" id="sports-dropdown">
                                {sports.map((sport, index) => (
                                    <NavDropdown key={index} title={sport.name} id={`sport-dropdown-${index}`} drop='end' >
                                        <NavDropdown.Item href={`/sports/${sport.id}`}>Partidos</NavDropdown.Item>
                                        {/*<NavDropdown.Item href={`/sports/${sport.id}/tournaments`}>Torneos</NavDropdown.Item>*/}
                                        <NavDropdown.Item href={`/sports/${sport.id}/history`}>Historial</NavDropdown.Item>
                                    </NavDropdown>
                                ))}
                            </NavDropdown>
                        }
                    </Nav>
                        {isLoggedIn ? (
                            <Nav>
                                <NavDropdown title="Mi cuenta" id="account-dropdown" drop='start'>
                                    <NavDropdown.Item href="/account">Perfil</NavDropdown.Item>
                                    {/*<NavDropdown.Item href="/settings">Configuraciones</NavDropdown.Item>*/}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout" onClick={(e) => { e.preventDefault(); logout(); }}>Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav.Link href="/login">Iniciar sesión</Nav.Link>
                        )}
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
