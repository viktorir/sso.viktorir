import api from "@/api/api";

export default {
  namespaced: true,

  state: {
    login: null,
    phoneNumber: null,
    email: null,
    lastName: null,
    firstName: null,
    fatherName: null,
    password: null,
    passwordRepeat: null,
    isLoading: false,
    error: null
  },

  getters: {
    login: (state) => state.login,
    phoneNumber: (state) => state.phoneNumber,
    email: (state) => state.email,
    lastName: (state) => state.lastName,
    firstName: (state) => state.firstName,
    fatherName: (state) => state.fatherName,
    password: (state) => state.password,
    passwordRepeat: (state) => state.passwordRepeat,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  },

  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload;
    },
    SET_PHONE_NUMBER(state, payload) {
      state.phoneNumber = payload;
    },
    SET_EMAIL(state, payload) {
      state.email = payload;
    },
    SET_LAST_NAME(state, payload) {
      state.lastName = payload;
    },
    SET_FIRST_NAME(state, payload) {
      state.firstName = payload;
    },
    SET_FATHER_NAME(state, payload) {
      state.fatherName = payload;
    },
    SET_PASSWORD(state, payload) {
      state.password = payload;
    },
    SET_PASSWORD_REPEAT(state, payload) {
      state.passwordRepeat = payload;
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
      state.phoneNumber = null;
      state.email = null;
      state.lastName = null;
      state.firstName = null;
      state.fatherName = null;
      state.fatherName = null;
      state.password = null;
      state.passwordRepeat = null;
    }
  },

  actions: {
    updateLogin({ commit }, payload) {
      commit('SET_LOGIN', payload)
    },
    updatePhoneNumber({ commit }, payload) {
      commit('SET_PHONE_NUMBER', payload)
    },
    updateEmail({ commit }, payload) {
      commit('SET_EMAIL', payload)
    },
    updateLastName({ commit }, payload) {
      commit('SET_LAST_NAME', payload)
    },
    updateFirstName({ commit }, payload) {
      commit('SET_FIRST_NAME', payload)
    },
    updateFatherName({ commit }, payload) {
      commit('SET_FATHER_NAME', payload)
    },
    updatePassword({ commit }, payload) {
      commit('SET_PASSWORD', payload)
    },
    updatePasswordRepeat({ commit }, payload) {
      commit('SET_PASSWORD_REPEAT', payload)
    },
    async signup({ commit, state, dispatch }, router) {
      const data = {
        login: state.login,
        email: state.email,
        phone_number: state.phoneNumber,
        password: state.password,
        first_name: state.firstName,
        last_name: state.lastName,
        father_name: state.fatherName
      }

      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      try {
        const response = await api.post('/signon', data);
        if (response.status != 200) {
          commit('SET_ERROR', "Register Error! Status " + response.status);
          console.error("Register Error! Status " + response.status);
          window.$notification.error({
            title: 'Ошибка регистрации!',
            content: 'Упс, что то не так.',
            duration: 3000
          });
          return;
        }

        commit('signIn/SET_LOGIN', data.login, { root: true })
        commit('signIn/SET_PASSWORD', data.password, { root: true })
        window.$notification.success({
          title: 'Регистрация успешна!',
          content: 'Спасибо!',
          duration: 3000 
        });
        await dispatch('signIn/signin', { router: router, querys: null }, { root: true })
        commit('CLEAR_ALL_DATA')
      } catch (error) {
        commit('SET_ERROR', "Ошибка регистрации. Проверьте ваши данные.");
        console.log(error)
        window.$notification.error({
          title: 'Ошибка регистрации',
          content: 'Проверьте ваши данные и повторите попытку.',
          duration: 3000
        });
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
}