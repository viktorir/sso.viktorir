import api from "@/api/api";

export default {
  namespaced: true,

  state: {
    isAuthorized: localStorage.getItem('is_authorized') === "true" || false,
    accessToken: localStorage.getItem('access_token') || null,
  },

  getters: {
    isAuthorized: (state) => state.isAuthorized,
    accessToken: (state) => state.accessToken,
  },

  mutations: {
    SET_AUTHORIZED(state) {
      state.isAuthorized = true
      localStorage.setItem('is_authorized', true)
    },
    SET_ACCESS_TOKEN(state, token) {
      localStorage.setItem('access_token', token);
      state.accessToken = token;
    },
    SET_UNAUTHORIZED(state) {
      state.isAuthorized = false
      localStorage.setItem('is_authorized', false)
    },
    CLEAR_ACCESS_TOKEN(state) {
      localStorage.removeItem('access_token');
      state.accessToken = null;
    },
  },

  actions: {
    async checkAuthorization({ commit }) {
      try {
        const response = await api.post('/refresh');
        if (response.status == 200 || response.status == 204) {
          commit('SET_AUTHORIZED')
          return
        } else {
          throw new Error("Ошибка проверки авторизации, код " + response.status)
        }
      } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        commit('SET_UNAUTHORIZED')
      }
    },

    async refreshAccessToken({ commit }) {
      try {
        const response = await api.post('/refresh');
        const accessToken = response.data?.access_token;

        if (!accessToken) {
          throw new Error("Токен отсутствует в ответе сервера");
        }

        commit('SET_ACCESS_TOKEN', accessToken);
        return accessToken;
      } catch (error) {
        console.error("Ошибка обновления токена:", error);
        commit('SET_UNAUTHORIZED')
        commit('CLEAR_ACCESS_TOKEN');
        throw error;
      }
    },

    async signOut({ commit }) {
      try {
        
        await api.post('/signout');
      } catch (error) {
        console.error("Ошибка выхода:", error);
      } finally {
        commit('SET_UNAUTHORIZED')
        commit('CLEAR_ACCESS_TOKEN');
      }
    },
  },
};