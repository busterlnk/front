import axios from 'axios'

export const getPadelGamesByUser = async(userid, sportid) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)
        formData.append('sportid', sportid);

        const response = await axios.post(
            'http://localhost:8087/api/padel_games_user',
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

export const getTenisGamesByUser = async(userid, sportid) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)
        formData.append('sportid', sportid);

        const response = await axios.post(
            'http://localhost:8087/api/games_user',
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
        const sport = data.name.toLowerCase();
        const response = await axios.delete(
            'http://localhost:8087/api/'+sport+'_games/'+data.game_id,
            {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            })

        return response;
    }catch (e){
        console.error(e.error)
    }
}

export const createNewPadelGame = async(formData) => {
    try {

        const response = await axios.post(
            'http://localhost:8087/api/padel/create_game',
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


export const createNewTenisGame = async(formData) => {
    try {

        console.log('ss');
        // const response = await axios.post(
        //     'http://localhost:8087/api/padel/create_game',
        //     formData,
        //     {
        //         headers: {
        //             'Content-Type': 'application/ld+json',
        //             Authorization: `Bearer ${localStorage.getItem('jwt')}`
        //         },
        //     }
        // );
        //
        // console.log(response)
        // return response;
    } catch (error) {
        console.log(error.response);
    }
}

export const getGameScore = async(gameid) => {
    try {
        const response = await axios.get(
            'http://localhost:8087/api/padel_games/'+gameid,
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