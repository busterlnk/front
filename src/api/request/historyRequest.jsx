import axios from "axios";

export const gethistoryGameByUser = async(userid, sportid) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)
        formData.append('sportid', sportid);

        const response = await axios.post(
            'https://127.0.0.1:8000/api/history/games_user',
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