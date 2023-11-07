import Vue from 'vue'; // this should be at the top level

export default {
    state: {
        items: [],
        currentPage: null,
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
        UPDATE_MUSIC_SHEET(state,data) {
            Object.assign(state.items[data.index], data.item);
        },
        ADD_MUSIC_SHEET(state, data) {
            state.items.push(data.item);
        }
    },
    actions: {
        async getMusicSheets({ commit }, url) {
            try {
                let response = await axios.get(url);
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
        },
        async setMusicSheets({ commit }, data) {
            await commit("SET_MUSIC_SHEETS", data);
        },
    },
    modules: {
    }
}