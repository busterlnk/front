import api from "../api";

export const sendGameScore = async (gameid, score, sport) => {
    try {
        const response = await api.patch(`/${sport}_games/`+gameid,score,
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

export const sendGameWinner = async (gameid, score, sport) => {
    try {
        const formData = new FormData();
        formData.append('gameid', gameid);
        formData.append('winner', score.winner);

        const response = await api.post(`/${sport}/set_winner`,formData,
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

export const resetGame = async (gameid, sport) => {
    try {
        const formData = new FormData();
        formData.append('gameid', gameid);
        const response = await api.post(`/${sport}/reset_game`,formData,
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