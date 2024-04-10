import axios from 'axios'

export const sendPadelGameScore = async (gameid, score) => {
    try {
        const response = await axios.patch(
            'http://localhost:8087/api/padel_games/'+gameid,score,
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

export const sendPadelGameWinner = async (gameid, score) => {
    try {
        const formData = new FormData();
        formData.append('gameid', gameid);
        formData.append('winner', score.winner);

        const response = await axios.post(
            'http://localhost:8087/api/padel/set_winner',formData,
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

export const resetPadelGame = async (gameid) => {
    try {
        const formData = new FormData();
        formData.append('gameid', gameid);
        const response = await axios.post(
            'http://localhost:8087/api/padel/reset_game',formData,
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