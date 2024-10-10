import api from '../api';
import jwt from 'jwt-decode';

export const login = async (formData) => {
    try {
        const response = await api.post('/login',formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        console.log(response);
        localStorage.setItem("refreshToken", response.data.refreshToken)
        localStorage.setItem("jwt", response.data.token);
        return response.data.token;
    } catch (error) {
        console.log(error.response);
    }
}


export const fetchUser = async (authToken) => {
    try {

        const response = await api.get('/get_user',
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