import axios from "axios";

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
    }
  },

  actions: {
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
        const response = await axios.post('http://localhost:8082/api/v1/signon', data);
        const id = response.data.id
        if (response.status != 200) {
          commit('SET_ERROR', "Register Error! Status " + response.status);
          console.error("Register Error! Status " + response.status);
          return;
        }
        console.log(id)
        commit('signin/SET_LOGIN', data.login, { root: true })
        commit('signin/SET_PASSWORD', data.password, { root: true })
        await dispatch('signin/signin', router, { root: true })
        commit('CLEAR_ALL_DATA')
      } catch (error) {
        console.error("Ошибка входа:", error);
        commit('SET_ERROR', "Ошибка входа. Проверьте ваши учетные данные.");
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
}