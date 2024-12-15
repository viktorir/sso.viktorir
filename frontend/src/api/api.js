import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import store from "@/store";
import router from "@/router";

const api = axios.create({
    baseURL: 'http://localhost:8082/api/v1',
    timeout: 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshAuthLogic = async (failedRequest) => {
    try {
        const newAccessToken = await store.dispatch('auth/refreshAccessToken');
        
        if (!newAccessToken) {
            throw new Error('Не удалось получить новый токен');
        }

        failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        return Promise.resolve();
    } catch (error) {
        console.error("Не удалось обновить токен:", error);
        router.push('/signin');
        return Promise.reject(error);
    }
};

createAuthRefreshInterceptor(api, refreshAuthLogic);

api.interceptors.request.use(
    (config) => {
        const accessToken = store.getters['auth/accessToken'];
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;