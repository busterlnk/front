import api from "../api";

export const getHistoryGamesByUser = async(userid, sport) => {
    try {
        const formData = new FormData();

        formData.append('userid', userid)

        const response = await api.post(`/history/${sport}_games_user`,
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