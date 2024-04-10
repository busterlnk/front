import axios from "axios";
// import jwt from 'jsonwebtoken';

export const login = async (formData) => {
    try {
        const response = await axios.post(
            'https://127.0.0.1:8084/api/login',formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        localStorage.setItem("jwt", response.data.token);
        return response.data.token;
    } catch (error) {
        console.log(error.response);
    }
}


export const fetchUser = async (authToken) => {
    try {

        const response = await axios.get(
            // 'https://localhost/auth',
            'https://127.0.0.1:8084/api/get_user',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );
        // console.log(JSON.stringify(response.data))
        // const userIri = response.headers.get('Location');
        localStorage.setItem('userData', JSON.stringify(response.data))
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
}

export const logout = () => {
    try{
        // const response = axios.post(
        //     'https://localhost/logout', null,{
        //         Authorization: 'Bearer '+ localStorage.getItem('token')
        //     }
        // )

    }catch(error) {
        console.log(error.response.data);
    }
}