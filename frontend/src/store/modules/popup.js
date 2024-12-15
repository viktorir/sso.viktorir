import { uuid }  from 'vue-uuid';

export default {
  namespaced: true,
  state: {
    popups: []
  },

  getters: {
    popups: (state) => state.popups
  },

  mutations: {
    ADD_POPUP(state, popup) {
      state.popups.push(popup)
      if (state.popups.length > 5) { 
        state.popups.shift();
      }
    },
    REMOVE_POPUP(state, id) {
      state.popups = state.popups.filter(popup => popup.id !== id);
    }
  },

  actions: {
    showPopup({ commit }, { type, heading, message, duration = 5000 }) {
      const id = uuid.v4();
      commit('ADD_POPUP', { id, type, heading, message });

      setTimeout(() => {
        commit('REMOVE_POPUP', id);
      }, duration);
    }
  }
}