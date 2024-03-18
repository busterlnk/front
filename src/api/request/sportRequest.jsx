import axios from 'axios'

export const getSports = async () => {
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

        return response.data['hydra:member'];
    } catch (error) {
        console.log(error.response);
    }
}

export const getSportById = async (id) => {
    try {
        const response = await axios.get(
            'https://127.0.0.1:8000/api/sports/'+id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

export const getGamesByUser = async(userid, sportid) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)
        formData.append('sportid', sportid);

        const response = await axios.post(
            'https://127.0.0.1:8000/api/games_user',
            formData,
            {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );

        console.log(response.status)
        return response;
    } catch (error) {
        console.log(error.response);
    }

}

export const createNewGame = async(formData) => {
    try {

        const response = await axios.post(
            'https://127.0.0.1:8000/api/create_game',
            formData,
            {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );

        console.log(response)
        return response;
    } catch (error) {
        console.log(error.response);
    }
}