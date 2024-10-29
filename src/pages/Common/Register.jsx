import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {fetchUser, register} from '../../api/request/agentRequest';
import { useAuth } from "../../context/AuthContext";

import '../../styles/login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
    const [error, setError] = useState('');
    const { setRegister } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Limpiar el error si las contraseñas coinciden
        setError('');

        try {
            const response = await register({
                username: formData.username,
                plainPassword: formData.password,
                email: formData.email
            });

            setRegister(response);
            const user = await fetchUser(response);
            if (user) {
                navigate('/home');
            }
        } catch (error) {
            setError("Hubo un error en el registro. Inténtalo nuevamente.");
            console.error(error);
        }
    }

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="login-bg">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-header text-center">
                        <h2>Registro</h2>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Usuario"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button className="login-button" type="submit">
                        Registrarse
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Register;
