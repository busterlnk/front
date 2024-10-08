import axios from 'axios'

export const getGamesByUser = async(userid, sport) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)

        const response = await axios.post(
            `http://localhost/api/${sport}_games_user`,
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
        const response = await axios.delete(
            'http://localhost/api/'+data.sport+'_games/'+data.game_id,
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

        const response = await axios.post(
            `http://localhost/api/${sport}/create_game`,
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
        const response = await axios.get(
            `http://localhost/api/${sport}_games/`+gameid,
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