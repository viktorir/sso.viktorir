import axios from "axios";
import store from '../store';

const api = axios.create({
    baseURL: 'http://localhost:8082/api/v1',
    timeout: 1000,
    withCredentials: true
})



api.interceptors.request.use(
    (config) => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.warn("Access token is not available from the local storage!");
            accessToken = store.getters['jwtTokens/accessToken'];
        }
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        } 

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await store.dispatch('jwtTokens/refreshAccessToken');

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Не удалось обновить токен:", refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default api;