import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import musicSheet from "./modules/musicSheet";
import notifications from "./modules/notifications";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbars: [],
  },
  getters: {},
  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
  },
  actions: {
    setSnackbar({ commit }, snackbar) {
      snackbar.showing = true;
      commit("SET_SNACKBAR", snackbar);
    },
  },
  modules: {
    user,
    musicSheet,
    notifications,
  },
});
