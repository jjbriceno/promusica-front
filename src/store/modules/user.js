import router from "@/router";

export default {
    state: {
        user: null,
        auth: false
    },
    getters: {
        user(state) {
            return state.user;
        },
        auth(state) {
            return state.auth;
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user || null;
        },
        SET_AUTH(state, auth) {
            state.auth = auth
        }
    },
    actions: {
        async logout({ commit }) {
            await axios.post('logout');
            await commit("SET_USER", {})
            await commit("SET_AUTH", false);
            await router.push('/');
        },

        async login({ dispatch }, credentials) {
            await axios.get('sanctum/csrf-cookie');
            let response = await axios.post('login', credentials);
            if (response.status === 204) {
                await dispatch("getUser");
                await router.push('dashboard');
            }
        },
        // TODO check back end to see if user is authenticated
        async getUser({ commit }) {
            try {
                let response = await axios.get('api/user');
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
                    await router.push('login');
                }
            }
        }
    },
    modules: {
    }
}