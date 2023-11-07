<template>
    <div class="text-center py-4">
        <v-pagination class="pagination" :total-visible="7" v-model="options.page" :length="options.length"
            circle></v-pagination>
    </div>
</template>
<script>
export default {
    props: {
        page: {
            type: Number,
            default: 1,
            required: true
        },
        length: {
            type: Number,
            required: true
        },
        search: {
            type: String,
            default: '',
            required: true
        }
    },
    data() {
        return {
            options: {
                page: this.page,
                length: this.length
            }
        }
    },
    watch: {
        "options.page": async function () {
            const vm = this;
            const url = (vm.search ?
                "api/music-sheets/search?search=" + encodeURIComponent(vm.search) + "&page=" :
                "api/music-sheets?page=") + encodeURIComponent(vm.options.page);
            await vm.$store.dispatch('getMusicSheets', url);
        },
        "length": async function (newVal, _) {
            const vm = this;
            vm.options.length = newVal;
        }
    }
}
</script>

<style>
.pagination {

    /* for previous and next buttons */
    & .v-pagination__navigation {
        background: #30314f !important;
    }

    /* for page buttons except the active one */
    & .v-pagination__item:not(.v-pagination__item--active) {
        background: #30314f !important;
    }
}
</style>
