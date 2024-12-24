import axios from "axios";
import store from "@/store";

const api = axios.create({
    baseURL: 'https://sso.viktorir.ru/api/v1',
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

api.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 401 && store.getters['auth/isAuthorized']) {
      try {
        store.commit('auth/SET_UNAUTHORIZED', null, {root: true})
        const newToken = await store.dispatch('auth/refreshAccessToken');
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config); // Повторяем запрос с новым токеном
      } catch (err) {
        store.dispatch('auth/signOut'); // Если обновление токена не удалось
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  });

export default api;