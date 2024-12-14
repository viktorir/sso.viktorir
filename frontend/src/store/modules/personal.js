import { jwtDecode } from "jwt-decode";
import api from "@/api/api";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    user: null,
    isLoading: false,
    error: null
  },

  getters: {
    user: (state) => state.user,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload
    }
  },

  actions: {
    async fetchUser ({ commit, getters }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          console.warn("Access token is not available from the local storage!");
          accessToken = getters['jwtTokens/accessToken'];
        } 
        if (!accessToken) {
          commit('SET_ERROR', 'Token not found!');
          router.push('/signin')
          return;
        }
            
        const decodedToken = jwtDecode(accessToken);
        const userLogin = decodedToken.login;

        const response = await api.get(`/user?login=${userLogin}`);
        const user = response.data.user

        commit('SET_USER', user)
            
      } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        commit('SET_ERROR', 'Не удалось получить данные пользователя.');
        commit('SET_USER', {})
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
}