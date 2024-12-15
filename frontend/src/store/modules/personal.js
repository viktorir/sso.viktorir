import { jwtDecode } from "jwt-decode";
import api from "@/api/api";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    user: {},
    services: [],
    isUserLoading: false,
    isServicesLoading: false,
    error: null,
  },

  getters: {
    user: (state) => state.user || {},
    services: (state) => state.services || [],
    isUserLoading: (state) => state.isUserLoading,
    isServicesLoading: (state) => state.isServicesLoading,
    error: (state) => state.error,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_SERVICES(state, services) {
      state.services = services;
    },
    SET_USER_LOADING(state, payload) {
      state.isUserLoading = payload;
    },
    SET_SERVICES_LOADING(state, payload) {
      state.isServicesLoading = payload;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchUser({ commit, getters, dispatch }) {
      if (getters.isUserLoading) return;

      commit("SET_USER_LOADING", true);
      commit("SET_ERROR", null);

      try {
        // Получаем токен
        const accessToken = getters["auth/accessToken"] || await dispatch("auth/refreshAccessToken", null, { root: true });
        if (!accessToken) {
          dispatch("popup/showPopup", { type: "error", heading: "Не авторизован", message: "Токен авторизации не найден" }, { root: true });
          commit("SET_ERROR", "Token not found!");
          router.push("/signin");
          return;
        }

        const decodedToken = jwtDecode(accessToken);
        const userLogin = decodedToken.login;

        // Запрос на получение данных пользователя
        const response = await api.get(`/user?login=${userLogin}`);
        const user = response.data.user;

        commit("SET_USER", user);
      } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        commit("SET_ERROR", "Не удалось получить данные пользователя.");
        router.push("/");
        commit("SET_USER", {});
      } finally {
        commit("SET_USER_LOADING", false);
      }
    },

    async fetchServices({ commit, getters, dispatch }) {
      if (getters.isServicesLoading) return;

      commit("SET_SERVICES_LOADING", true);
      commit("SET_ERROR", null);

      try {
        // Получаем токен
        const accessToken = getters["auth/accessToken"] || await dispatch("auth/refreshAccessToken", null, { root: true });
        if (!accessToken) {
          dispatch("popup/showPopup", { type: "error", heading: "Не авторизован", message: "Токен авторизации не найден" }, { root: true });
          commit("SET_ERROR", "Token not found!");
          router.push("/signin");
          return;
        }

        const decodedToken = jwtDecode(accessToken);
        const rolesMap = new Map(Object.entries(decodedToken.roles));

        // Запрос на получение сервисов
        const response = await api.get(`/service`);
        const services = response.data.services;

        services.forEach((service) => {
          service.roles = rolesMap.get(service.name) || [];
        });

        commit("SET_SERVICES", services);
      } catch (error) {
        console.error("Ошибка получения данных сервисов:", error);
        commit("SET_ERROR", "Не удалось получить данные сервисов.");
        dispatch("popup/showPopup", { type: "error", heading: "Ошибка получения данных сервисов", message: error.message || error }, { root: true });
        commit("SET_SERVICES", []);
      } finally {
        commit("SET_SERVICES_LOADING", false);
      }
    },
  },
};