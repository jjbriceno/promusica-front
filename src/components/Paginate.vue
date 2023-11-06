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
            default: 1
        },
        length: {
            type: Number,
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
            await vm.$store.dispatch('getMusicSheets', vm.options.page);
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
