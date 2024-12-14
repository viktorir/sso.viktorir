import axios from 'axios'

export default {
  namespaced: true,
  state: {
    login: null,
    password: null,
    isLoading: false,
    error: null
  },

  getters: {
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
  },

  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload;
    },
    SET_PASSWORD(state, payload) {
      state.password = payload;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    CLEAR_ALL_DATA(state) {
      state.login = null;
      state.password = null;
    }
  },

  actions: {
    async signin({ commit, state, dispatch }, router) {
      const data = {
        login: state.login,
        password: state.password
      };

      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      try {
        const response = await axios.post('http://localhost:8082/api/v1/signin', data);
        const refreshToken = response.data.refresh_token;
        const accessToken = response.data.access_token
        dispatch('jwtTokens/setTokens', {accessToken, refreshToken}, {root: true})
        router.push('/personal');
        commit('CLEAR_ALL_DATA');
      } catch (error) {
        console.error("Ошибка входа:", error);
        commit('SET_ERROR', "Ошибка входа. Проверьте ваши учетные данные.");
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
}