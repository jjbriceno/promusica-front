export default {
    state: {
        user: null,
        auth: false
    },
    getters: {
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user || null;
            state.auth = Boolean(user);
        }
    },
    actions: {
        async logout({ commit }) {
            await axios.post('logout');
            commit("SET_USER", null)
        },

        async login({ dispatch }, credentials) {
            await axios.get('sanctum/csrf-cookie').then(async () => {
                await axios.post('login', credentials).then(async (response) => {
                    if (response.status === 200) {
                        await dispatch("getUser");
                    }
                });
            });
        },
        async getUser({ commit }) {
            try {
                let response = await axios.get('api/user');
                if (response.status === 200) {
                    commit("SET_USER", response.data);
                }
            } catch (error) {
                if (error.status === 401) {
                    commit("SET_USER", null);
                }
            }
        }
    },
    modules: {
    }
}