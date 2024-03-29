import axios from 'axios'

export const sendGameScore = async (gameid, score) => {
    try {
        const response = await axios.patch(
            'https://127.0.0.1:8000/api/games/'+gameid,score,
            {
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );

        return response.data['hydra:member'];
    } catch (error) {
        console.log(error.response);
    }
}

export const resetGame = async (gameid) => {
    try {
        const formData = new FormData();
        formData.append('gameid', gameid);
        const response = await axios.post(
            'https://127.0.0.1:8000/api/reset_game',formData,
            {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );

        return response;
    } catch (error) {
        console.log(error.response);
    }
}