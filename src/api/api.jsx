import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        originalRequest._retry = true;  // marcar que este request ya intent? reautenticarse
        try {
            const refreshResponse = await api.post('/token/refresh', {
                refreshToken: localStorage.getItem('refreshToken')  // asumiendo que guardas el token de refresco aqu?
            });
            console.log(refreshResponse)

            const { token, refreshToken } = refreshResponse.data;
            localStorage.setItem('jwt', token);
            localStorage.setItem('refreshToken', refreshToken);

            // Actualiza el token en la cabecera de la solicitud original
            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            // Reintenta la solicitud original con el nuevo token
            return api(originalRequest);
        } catch (refreshError) {
            console.error('Unable to refresh token', refreshError);
            localStorage.removeItem('jwt');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';  // redirigir al usuario al login
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

export default api;