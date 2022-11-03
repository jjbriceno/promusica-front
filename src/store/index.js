import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    auth: false
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.auth = Boolean(user);
    }
  },
  actions: {
    async logout({ commit }) {
      await axios.post('logout');
      commit("SET_USER", null)
    },

    async login({ dispatch }, credentials) {
      await axios.get('sanctum/csrf-cookie');
      await axios.post('login', { ...credentials });
      return dispatch("getUser");
    },
    async getUser({ commit }) {
      try {
        let response = await axios.get('api/user');
        commit("SET_USER", response.data);
      } catch (error) {
        if (error.status === 401) {
          commit("SET_USER", null);
        }
      }
    }
  },
  modules: {
  }
})
