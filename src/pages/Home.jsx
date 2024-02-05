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
                console.log(response)
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
                <title>Home</title>
            </Helmet>
            <div className="home">
            </div>
        </>
    );
}

export default Login;