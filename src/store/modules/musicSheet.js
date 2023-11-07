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
            state.items = data?.music_sheets || [];
            state.page = data?.meta.current_page || null;
            state.total = data?.meta.last_page || null;
            state.perPage = data?.meta.per_page || null;
        },
        UPDATE_MUSIC_SHEET(state,data) {
            Object.assign(state.items[data.index], data.item);
        },
        ADD_MUSIC_SHEET(state, data) {
            state.items.push(data.item);
        }
    },
    actions: {
        async getMusicSheets({ commit }, page = 1) {
            try {
                let response = await axios.get('api/music-sheets?page=' + page);
                commit("SET_MUSIC_SHEETS", response.data);
            } catch (error) {
                if (error.status === 401) {
                    commit("SET_MUSIC_SHEETS", null);
                }
            }
        },
        async addMusicSheet({ commit }, data) {
            await commit("ADD_MUSIC_SHEET", data);
        },
        async updateMusicSheet({ commit }, data) {
            await commit("UPDATE_MUSIC_SHEET", data);
        }
    },
    modules: {
    }
}