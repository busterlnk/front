import React, {useState} from 'react';
import {Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import axios from "axios";
import {fetchUser, login} from '../api/request/agentRequest';
import {useAuth} from "../context/AuthContext";

import '../styles/login.css';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setLogin } = useAuth();

    const navigate = useNavigate();

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value);
        } else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = {username: username, password:password};

        login(formData).then(
            (response) => {
                setLogin(response)
                fetchUser(response).then((user) => {
                    if(user){
                        navigate('/home');
                    }
                })
            }
        )

        // try{
        //     const response = await axios.post('https://127.0.0.1:8000/api/login',
        //     {username: username, password: password});
        //     console.log(response);
        // }catch(error){
        //
        // }
    }

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
                    <div className="form-group mb-3">
                        <input type="text"
                               className="form-control"
                               id="username"
                               name="username"
                               placeholder="Correo Electronico"
                               value={username}
                               onChange={handleChange}
                               required/>
                    </div>
                    <div className="form-group mb-2">
                        <input type="password"
                               className="form-control"
                               name="password"
                               id="password"
                               placeholder="Contraseña"
                               value={password}
                               onChange={handleChange}
                               required/>
                    </div>
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </>
    );
}

export default Login;