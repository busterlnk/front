import axios from 'axios'

export const getSports = async (formData) => {
    try {
        const response = await axios.get(
            'https://127.0.0.1:8000/api/sports',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );

        localStorage.setItem("token", response.data.token);
        return response.data['hydra:member'];
    } catch (error) {
        console.log(error.response);
    }
}