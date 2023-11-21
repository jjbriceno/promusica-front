import router from "@/router";
import axios from "@/plugins/axios";

export default {
  state: {
    user: {},
    auth: false,
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
  },
  actions: {
    async logout({ commit }) {
      try {
        let response = await axios.post("logout");
        if (response.status === 200) {
          await commit("SET_USER", {});
          await commit("SET_AUTH", false);
          await router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async login({ commit }, credentials) {
      try {
        await axios.get("sanctum/csrf-cookie");
        let response = await axios.post("login", credentials);
        if (response.status === 200) {
          await commit("SET_USER", response.data.user);
          await commit("SET_AUTH", true);
          await router.push("dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // TODO check back end to see if user is authenticated
    // async getUser({ commit }) {
    //   try {
    //     let response = await auth.get("api/user", {
    //       headers: {
    //         Authorization: `Bearer ${this.getters.getAccessToken}`,
    //       },
    //     });
    //     if (response.status === 200) {
    //       await commit("SET_USER", response.data);
    //       await commit("SET_AUTH", true);
    //       return true;
    //     }
    //   } catch (error) {
    //     if (error.response.status === 401 || error.response.status === 419) {
    //       console.log("User is not authenticated", error.response.status);
    //       await commit("SET_USER", {});
    //       await commit("SET_AUTH", false);
    //       await commit("SET_ACCESS_TOKEN", null);
    //       return false;
    //     }
    //   }
    // },
  },
  modules: {},
};
