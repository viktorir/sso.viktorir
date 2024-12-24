export default {
    namespaced: true,
    state: {
        theme: localStorage.getItem('app_theme') || 'dark',
        locale: localStorage.getItem('app_locale') || 'en'
    },
    getters: {
        theme: (state) => state.theme,
        locale: (state) => state.locale
    },
    mutations: {
        SET_THEME(state, theme) {
            state.theme = theme;
            localStorage.setItem('app_theme', theme)
        },
        SET_LOCALE(state, locale) {
            state.locale = locale;
            localStorage.setItem('app_locale', locale)
        },
    },
    actions: {
        setTheme({ commit }, theme) {
            commit('SET_THEME', theme);
        },
        setLocale({ commit }, locale) {
            commit('SET_LOCALE', locale);
        },
    },
}