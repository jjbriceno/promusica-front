export default {
    state: {
        items: [],
        currentPage: 1,
        lastPage: null,
        total: null,
        perPage: null
    },
    getters: {
        getTotalPages(state) {
            return state.lastPage;
        },
        getCurrentPage(state) {
            return state.currentPage;
        },
        getMusicSheets(state) {
            return state.items;
        },
        getItemsPerPage(state) {
            return state.perPage;
        },
        getItemIndex(state, item) {
            return state.items.indexOf(item);
        }
    },
    mutations: {
        SET_MUSIC_SHEETS(state, data) {
            state.items = data?.music_sheets || [];
            state.currentPage = data?.meta.current_page || null;
            state.lastPage = data?.meta.last_page || null;
            state.perPage = data?.meta.per_page || null;
            state.total = data?.meta.total || null;
        },
        UPDATE_MUSIC_SHEET(state, data) {
            Object.assign(state.items[data.index], data.item);
        },
        ADD_MUSIC_SHEET(state, data) {
            state.items.push(data.item);
        },
        SET_CURRENT_PAGE(state, data) {
            state.currentPage = data;
        },
    },
    actions: {
        async getMusicSheets({ commit }, url) {

            try {
                let { data } = await axios.get(url);
                await commit("SET_MUSIC_SHEETS", data);
            } catch (error) {
                if (error.status === 401) {
                    await commit("SET_MUSIC_SHEETS", null);
                }
            }
        },
        async addMusicSheet({ commit }, data) {
            await commit("ADD_MUSIC_SHEET", data);
        },
        async updateMusicSheet({ commit }, data) {
            await commit("UPDATE_MUSIC_SHEET", data);
        },
        async setMusicSheets({ commit }, data) {
            await commit("SET_MUSIC_SHEETS", data);
        },
        async setCurrentPage({ commit }, data) {
            await commit("SET_CURRENT_PAGE", data);
        },
    },
    modules: {
    }
}