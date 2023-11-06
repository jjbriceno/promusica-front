export default {
    state: {
        items: [],
        page: null,
        total: null,
        perPage: null
    },
    getters: {
    },
    mutations: {
        SET_MUSIC_SHEETS(state, data) {
            state.items = data.music_sheets;
            state.page = data.meta.current_page;
            state.total = data.meta.last_page;
            state.perPage = data.meta.per_page;
        }
    },
    actions: {
        async getMusicSheets({ commit }, page) {
            try {
                let response = await axios.get('api/music-sheets?page=' + page);
                console.log(response.data);
                commit("SET_MUSIC_SHEETS", response.data);
            } catch (error) {
                if (error.status === 401) {
                    commit("SET_MUSIC_SHEETS", null);
                }
            }
        }
    },
    modules: {
    }
}