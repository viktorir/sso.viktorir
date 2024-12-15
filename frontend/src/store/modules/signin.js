import api from "@/api/api";

export default {
  namespaced: true,
  state: {
    login: null,
    password: null,
    redirect_url: null,
    isLoading: false,
    error: null
  },

  getters: {
    login: (state) => state.login,
    password: (state) => state.password,
    redirect_url: (state) => state.redirect_url,
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
    SET_REDIRECT_URL(state, payload) {
      state.redirect_url = payload;
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
      state.redirect_url =  null;
    }
  },

  actions: {
    async signin({ commit, getters, dispatch }, {router, querys}) {
      if (querys && querys.redirect_url) commit('SET_REDIRECT_URL', querys.redirect_url);

      const data = {
        login: getters['login'],
        password: getters['password'],
        redirect_url: getters['redirect_url']
      };
      console.log(data.redirect_url)

      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      try {
        const response = await api.post('/signin', data);
        console.log()
        if(response.status == 200 && data.redirect_url) {
          window.location.href = data.redirect_url
        } else {
          const accessToken = response.data.access_token
          commit('auth/SET_ACCESS_TOKEN', accessToken, {root: true})
          router.push('/personal');
  
          dispatch('popup/showPopup', {type: 'succes', message: 'Авторизация успешна!'}, {root: true})
        }
        commit('CLEAR_ALL_DATA');
      } catch (error) {
        commit('SET_ERROR', "Ошибка входа.");
        console.error("Ошибка входа:", error);
        dispatch('popup/showPopup', {type: 'error', heading: 'Ошибка входа', message: error}, {root: true})
        
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
}