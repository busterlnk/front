import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { fetchUser, login } from '../../api/request/agentRequest';
import { useAuth } from "../../context/AuthContext";

import '../../styles/login.css';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const { setLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors

        try {
            await login(formData).then(async(response) => {
                if(response.status === 200){
                    setLogin(response.data.token);
                    const user = await fetchUser();
                    if (user) navigate('/home');
                }
            })

        } catch (err) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="login-bg">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-header text-center">
                        <h2>Iniciar Sesión</h2>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Correo Electrónico"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-2">
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
                    <Button className="login-button" type="submit">
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Login;
