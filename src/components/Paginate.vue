<template>
  <div class="text-center py-4">
    <v-pagination
      class="pagination"
      :total-visible="7"
      v-model="getCurrentPage"
      :length="$store.state.musicSheet.lastPage"
      circle
    ></v-pagination>
  </div>
</template>
<script>
export default {
  name: "PaginateComponent",
  props: {
    search: {
      type: String,
      default: "",
      required: false,
    },
  },
  data() {
    const vm = this;
    return {
      options: {
        search: vm.search,
      },
    };
  },
  async created() {
    const vm = this;
    const url = "api/music-sheets?page=1";
    await vm.$store.dispatch("getMusicSheets", url);
  },
  computed: {
    getCurrentPage: {
      get() {
        const vm = this;
        return vm.$store.state.musicSheet.currentPage;
      },
      async set(value) {
        const vm = this;
        await vm.$store.dispatch("setCurrentPage", value);
      },
    },
  },
  watch: {
    getCurrentPage: async function (newVal) {
      const vm = this;
      vm.options.search && (vm.options.search = vm.search.trim());
      if (vm.search && newVal === 1) {
        return;
      }
      const url =
        (vm.search
          ? "api/music-sheets/search?search=" +
            encodeURIComponent(vm.search) +
            "&page="
          : "api/music-sheets?page=") + encodeURIComponent(newVal);
      await vm.$store.dispatch("getMusicSheets", url);
    },
    length: async function (newVal) {
      const vm = this;
      vm.options.length = newVal;
    },
    search: async function (newVal) {
      if (!newVal) {
        const vm = this;
        await vm.$store.dispatch("getMusicSheets", "api/music-sheets?page=1");
      }
    },
  },
};
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
