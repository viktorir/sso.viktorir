import api from "@/api/api";

export default {
	namespaced: true,

	state: {
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null, // Временно храню в ls, тк куки не работают адекватно
	},

	getters: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
	},

	mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
    },
    SET_REFRESH_TOKEN(state, payload) {
      state.refreshToken = payload;
    },
	},

	actions: {
    setTokens({ commit }, { accessToken, refreshToken }) {
      commit('SET_ACCESS_TOKEN', accessToken);
      localStorage.setItem('access_token', accessToken);
      commit('SET_REFRESH_TOKEN', refreshToken);
      localStorage.setItem('refresh_token', refreshToken)
    },
    clearTokens({ commit }) {
      commit('SET_ACCESS_TOKEN', null);
      localStorage.removeItem('access_token');
      commit('SET_REFRESH_TOKEN', null);
      localStorage.removeItem('refresh_token')
    },
    async refreshAccessToken({ state, commit, dispatch }) {
      try {
        const data = {
          refresh_token: state.refreshToken
        }
        const response = await api.post('/refresh', data);
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        dispatch('jwtTokens/setTokens', {accessToken, refreshToken}, {root: true})
        return accessToken;
      } catch (error) {
        console.error("Ошибка обновления токена:", error);
        commit('jwtTokens/clearTokens');
        //Cookies.remove('refresh_token'); - пока не работаю с куками
      }
    },
	}
}