import api from "@/api/api";

export default {
  namespaced: true,

  state: {
    isAutorized: false,
    accessToken: localStorage.getItem('access_token') || null,
  },

  getters: {
    isAutorized: (state) => state.isAutorized,
    accessToken: (state) => state.accessToken,
  },

  mutations: {
    SET_AUTORIZED(state) {
      state.isAutorized = true
    },
    SET_ACCESS_TOKEN(state, token) {
      localStorage.setItem('access_token', token);
      state.accessToken = token;
    },
    SET_UNAUTORIZED(state) {
      state.isAutorized = false
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
        switch (response.status) {
          case 401:
            commit('SET_UNAUTORIZED')
            return;
          case 200:
            commit('SET_AUTORIZED')
            return;
        
          default:
            throw new Error("Ошибка проверки авторизации, код " + response.status)
        }
      } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        throw error;
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
        commit('CLEAR_ACCESS_TOKEN');
      }
    },
  },
};