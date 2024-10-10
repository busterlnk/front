import api from "../api";

export const getGamesByUser = async(userid, sport) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)

        const response = await api.post(`/${sport}_games_user`,
            formData,
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


export const deleteGame = async(data) => {
    try{
        const response = await api.delete(`/${data.sport}_games/${data.game_id}`,
            {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            })

        return response;
    }catch (e){
        console.error(e)
    }
}

export const createNewGame = async(formData, sport) => {
    try {

        const response = await api.post(`/${sport}/create_game`,
            formData,
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


export const getGameScore = async(gameid, sport) => {
    try {
        const response = await api.get(`/${sport}_games/`+gameid,
            {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            });
        return response;
    }catch (e) {
        console.error(e)
    }
}