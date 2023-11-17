import router from "@/router";
import auth from "@/plugins/auth";

export default {
  state: {
    user: {},
    auth: false,
    accessToken: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    auth(state) {
      return state.auth;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user || null;
    },
    SET_AUTH(state, auth) {
      state.auth = auth;
    },
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    async logout({ commit }) {
      let response = await auth.post("logout", {
        headers: {
          Authorization: `Bearer ${this.getters.getAccessToken}`,
        },
      });
      if (response.status === 200) {
        await commit("SET_ACCESS_TOKEN", null);
        await commit("SET_USER", {});
        await commit("SET_AUTH", false);
        await router.push("/");
      }
    },

    async login({ commit }, credentials) {
      await auth.get("sanctum/csrf-cookie");
      let response = await auth.post("login", credentials);
      if (response.status === 200) {
        await commit("SET_ACCESS_TOKEN", response.data.access_token);
        await commit("SET_USER", response.data.user);
        await commit("SET_AUTH", true);
        await router.push("dashboard");
      }
    },
    // TODO check back end to see if user is authenticated
    async getUser({ commit }) {
      try {
        let response = await auth.get("api/user", {
          headers: {
            Authorization: `Bearer ${this.getters.getAccessToken}`,
          },
        });
        if (response.status === 200) {
          await commit("SET_USER", response.data);
          await commit("SET_AUTH", true);
          return true;
        }
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 419) {
          console.log("User is not authenticated", error.response.status);
          await commit("SET_USER", {});
          await commit("SET_AUTH", false);
          await commit("SET_ACCESS_TOKEN", null);
          return false;
        }
      }
    },
  },
  modules: {},
};
