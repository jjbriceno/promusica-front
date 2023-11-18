<template>
  <v-container>
    <v-card dark elevation="8" style="background-color: #4c4e7e">
      <v-card-title
        primary-title
        class="font-weight-black text-subtitle-1 text-uppercase"
      >
        Partituras
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              fab
              small
              @click="addNew"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar nueva partitura</span>
        </v-tooltip>
      </v-card-title>
      <v-card-subtitle class="white--text">
        Lista de partituras
      </v-card-subtitle>
      <hr color="#fb13c1" />

      <v-dialog
        @click:outside="cancel"
        @keydown.esc="cancel"
        v-model="dialog"
        :overlay="false"
        max-width="700px"
        transition="dialog-transition"
      >
        <v-card dark elevation="8" color="#4c4e7e">
          <v-toolbar dark color="#393c5f">
            <v-toolbar-title
              class="text-uppercase font-weight-black text-subtitle-1"
              >{{
                isEdit ? "Editar partitura" : "Agregar nueva partitura"
              }}</v-toolbar-title
            >
          </v-toolbar>

          <v-card-text class="pt-8">
            <v-form @submit.prevent="save" ref="form">
              <v-text-field
                :error-messages="titleError"
                v-model="form.title"
                placeholder="Título"
                name="title"
                label="Título"
                id="id"
                outlined
              ></v-text-field>

              <v-autocomplete
                :error-messages="authorError"
                v-model="form.authorId"
                item-text="full_name"
                item-value="id"
                outlined
                label="Autor"
                :items="authors"
              ></v-autocomplete>

              <v-autocomplete
                :error-messages="gendersError"
                :items="genders"
                item-text="name"
                item-value="id"
                v-model="form.genderId"
                label="Géneros"
                outlined
              ></v-autocomplete>

              <v-autocomplete
                :error-messages="drawersError"
                :items="drawers"
                item-text="name"
                item-value="id"
                v-model="form.drawerId"
                label="Estante"
                outlined
              ></v-autocomplete>

              <v-autocomplete
                :error-messages="cabinetError"
                :items="cabinets"
                item-text="name"
                item-value="id"
                v-model="form.cabinetId"
                label="Gaveta"
                outlined
              ></v-autocomplete>

              <v-text-field
                :error-messages="cuantityError"
                v-model.number="form.cuantity"
                placeholder="Cantidad"
                name="Cantidad"
                label="Cantidad"
                id="id"
                type="number"
                min="1"
                outlined
              ></v-text-field>

              <v-file-input
                clearable
                show-size
                density="compact"
                prepend-icon="mdi-camera"
                v-model="form.file"
                accept="image/jpeg, image/png, application/pdf"
                label="Imagen de la partitura (.jpeg .png .pdf | max:2MB)"
              ></v-file-input>

              <v-card-actions>
                <v-btn dark color="red" @click="cancel">Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="450px">
        <v-card>
          <v-card-title class="text-h5"
            >¿Está seguro de eliminar la partitura?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="deleteItem(itemToDelete)"
              >Aceptar</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="red" dark @click="cancelItemDelete">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        @click:outside="resetLoan"
        @keydown.esc="resetLoan"
        v-model="loanDialog"
        :overlay="false"
        max-width="700px"
        transition="dialog-transition"
      >
        <v-card dark color="#4c4e7e">
          <v-toolbar dark color="#393c5f">
            <v-toolbar-title
              class="font-weight-black text-subtitle-1 text-uppercase"
            >
              Realizar préstamo
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-6">
            <v-form @submit.prevent="saveLoan" ref="loanForm">
              <v-autocomplete
                :error-messages="borrowerError"
                :items="borrowers"
                item-text="name"
                item-value="id"
                v-model="loan.borrowerId"
                label="Prestatario"
                outlined
              ></v-autocomplete>

              <v-text-field
                :error-messages="loanCuantityError"
                v-model="loan.cuantity"
                placeholder="Cantidad"
                name="Cantidad"
                label="Cantidad"
                id="id"
                type="number"
                min="1"
                :max="loan.maxCuantity"
                outlined
              >
              </v-text-field>

              <DatePicker
                :dateError="dateError"
                @selectedDate="setDate"
              ></DatePicker>

              <v-text-field
                v-model="loan.title"
                placeholder="Título"
                name="title"
                label="Título"
                id="id"
                outlined
                disabled
              ></v-text-field>

              <v-autocomplete
                v-model="loan.authorId"
                item-text="full_name"
                item-value="id"
                outlined
                label="Autor"
                :items="authors"
                disabled
              ></v-autocomplete>

              <v-select
                :items="genders"
                item-text="name"
                item-value="id"
                v-model="loan.genderId"
                label="Géneros"
                outlined
                disabled
              ></v-select>
              <!-- Location -->
              <!-- Estante -->
              <v-select
                :items="drawers"
                item-text="name"
                item-value="id"
                v-model="loan.drawerId"
                label="Estante"
                outlined
                disabled
              ></v-select>
              <!-- Gaveta -->
              <v-select
                :items="cabinets"
                item-text="name"
                item-value="id"
                v-model="loan.cabinetId"
                label="Gaveta"
                outlined
                disabled
              ></v-select>

              <v-card-actions>
                <v-btn dark color="red" @click="resetLoan">Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-card-title>
        <v-text-field
          dark
          @keyup.enter="searchFilter"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        >
        </v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="getMusicSheets"
        sort-by="id"
        :loading="loading"
        :items-per-page="getItemsPerPage"
        hide-default-footer
        style="background-color: #4c4e7e"
      >
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg td" :style="hoverColors(hover)">
              <td class="td">&nbsp;</td>
              <td class="td">{{ item.title }}</td>
              <td class="td">{{ item.author.full_name }}</td>
              <td class="td">
                <v-progress-linear
                  :value="(item.available * 100) / item.cuantity"
                  height="18"
                  color="primary"
                  dark
                  rounded
                >
                  {{ item.available + "/" + item.cuantity }}
                </v-progress-linear>
              </td>
              <td class="td">{{ item.gender.name }}</td>
              <td class="td">
                {{
                  item.location.drawer_name + " " + item.location.cabinet_name
                }}
              </td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      x-small
                      class="white--text mr-1"
                      color="primary"
                      @click="editItem(item)"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar partitura</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      x-small
                      class="white--text mr-1"
                      color="red"
                      @click="comfirmDelete(item)"
                      :disabled="item.available === 0"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar partitura</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :disabled="item.available === 0"
                      fab
                      x-small
                      class="white--text mr-1"
                      color="purple"
                      @click="startLoan(item)"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon> mdi-hand-coin </v-icon>
                    </v-btn>
                  </template>
                  <span>Préstamo</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      x-small
                      class="white--text"
                      color="success"
                      v-on="on"
                      :disabled="!item.music_sheet_file_id"
                      @click="downloadFile(item.music_sheet_file_id)"
                      v-bind="attrs"
                    >
                      <v-icon> mdi-download </v-icon>
                    </v-btn>
                  </template>
                  <span>Descargar</span>
                </v-tooltip>
              </td>
            </tr>
          </v-hover>
        </template>
      </v-data-table>
      <Paginate :search="search" />
    </v-card>
  </v-container>
</template>

<script>
import DatePicker from "../components/DatePicker.vue";
import Paginate from "../components/Paginate.vue";

export default {
  name: "MusicSheetsView",
  components: {
    DatePicker,
    Paginate,
  },
  data() {
    return {
      form: {},
      file: [],
      isEdit: false,
      editIndex: -1,
      dialogDelete: false,
      itemToDelete: "",
      deleteIndex: "",
      authors: "",
      genders: "",
      drawers: "",
      cabinets: "",
      borrowers: "",
      search: "",
      dateModal: false,
      dialog: false,
      loanDialog: false,
      loanIndex: "",
      loanCuantity: "",
      loan: {
        musicSheetId: "",
        title: "",
        authorId: "",
        genderId: "",
        locationId: "",
        drawerId: "",
        cabinetId: "",
        available: "",
        cuantity: "",
        maxCuantity: "",
      },
      headers: [
        {},
        {
          text: "Título",
          value: "title",
        },
        {
          text: "Autor",
          value: "author.full_name",
        },
        {
          text: "Disponible / Total",
          value: "available",
          filterable: false,
        },
        {
          text: "Género",
          value: "gender.name",
          filterable: false,
        },
        {
          text: "Ubicación",
          value: "location.drawer_name",
          filterable: false,
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ],
      music_sheets: [],
      errors: {
        title: "",
        authorId: "",
        cabinetId: "",
        cuantity: "",
        drawerId: "",
        genderId: "",
      },
      loanErrors: {
        borrowerId: "",
        cuantity: "",
        deliveryDate: "",
      },
      routes: ["authors", "genders", "drawers", "cabinets", "borrowers"],
      loading: false,
    };
  },
  async created() {
    const vm = this;
    vm.loading = true;
    [
      { authors: vm.authors },
      { genders: vm.genders },
      { drawers: vm.drawers },
      { cabinets: vm.cabinets },
      { borrowers: vm.borrowers },
    ] = await Promise.all(vm.routesArray);
    vm.loading = false;
  },
  computed: {
    dateError() {
      const vm = this;
      return !vm.loan.deliveryDate && vm.loanErrors.deliveryDate[0]
        ? vm.loanErrors.deliveryDate[0]
        : "";
    },
    borrowerError() {
      const vm = this;
      return !vm.loan.borrowerId && vm.loanErrors.borrowerId[0]
        ? vm.loanErrors.borrowerId[0]
        : "";
    },
    loanCuantityError() {
      const vm = this;
      return !vm.loan.cuantity && vm.loanErrors.cuantity[0]
        ? vm.loanErrors.cuantity[0]
        : "";
    },
    getMusicSheets() {
      const vm = this;
      return vm.$store.getters.getMusicSheets;
    },
    getItemsPerPage() {
      const vm = this;
      return vm.$store.getters.getItemsPerPage;
    },
    routesArray() {
      const vm = this;
      return vm.routes
        .map((route) => {
          // eslint-disable-next-line no-undef
          return axios.get("api/" + route);
        })
        .map(async (promise) => {
          const result = await promise;
          return result.data;
        });
    },
    titleError() {
      const vm = this;
      return !vm.form.title && vm.errors.title[0] ? vm.errors.title[0] : "";
    },
    authorError() {
      const vm = this;
      return !vm.form.authorId && vm.errors.authorId[0]
        ? vm.errors.authorId[0]
        : "";
    },
    cabinetError() {
      const vm = this;
      return !vm.form.cabinetId && vm.errors.cabinetId[0]
        ? vm.errors.cabinetId[0]
        : "";
    },
    gendersError() {
      const vm = this;
      return !vm.form.genderId && vm.errors.genderId[0]
        ? vm.errors.genderId[0]
        : "";
    },
    drawersError() {
      const vm = this;
      return !vm.form.drawerId && vm.errors.drawerId[0]
        ? vm.errors.drawerId[0]
        : "";
    },
    cabinetsError() {
      const vm = this;
      return !vm.form.cabinetId && vm.errors.cabinetId[0]
        ? vm.errors.cabinetId[0]
        : "";
    },
    cuantityError() {
      const vm = this;
      return !vm.form.cuantity && vm.errors.cuantity[0]
        ? vm.errors.cuantity[0]
        : "";
    },
  },
  methods: {
    async searchFilter() {
      const vm = this;
      if (vm.search) {
        console.log("hay search");
        try {
          await vm.$store.dispatch(
            "getMusicSheets",
            `api/music-sheets/search?search=${encodeURIComponent(vm.search)}`
          );
          console.log(
            "searchFilter",
            `api/music-sheets/search?search=${encodeURIComponent(vm.search)}`
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    async downloadFile(file_id) {
      try {
        // eslint-disable-next-line no-undef
        const response = await axios.get(`api/sheet-file/download/${file_id}`, {
          responseType: "blob",
        });

        const filename = response.headers["content-disposition"]
          .match(/filename=(.+)$/)[1]
          .replace(/"/g, "");
        const fileExt = response.headers["content-type"].split("/")[1];
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.style.display = "none";
        downloadLink.href = url;
        downloadLink.download = `${filename}.${fileExt}`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },

    hoverColors(hover) {
      return {
        color: hover ? "white" : "inherit",
        background: hover ? "#4527A0" : "inherit",
      };
    },

    async save() {
      const vm = this;
      vm.resetErrors();
      try {
        const formData = new FormData();
        let keys = Object.keys(vm.form);
        keys.forEach((key) => {
          formData.append(key, vm.form[key]);
        });
        const data = {
          formData: formData,
          isEdit: vm.isEdit,
          url: `api/music-sheets/${vm.isEdit ? "edit" : "store"}`,
          index: vm.editIndex,
        };
        await vm.$store.dispatch("saveMusicSheet", data);
        // eslint-disable-next-line no-undef
        // let response = await axios.post(
        //   `/music-sheets/${vm.isEdit ? "edit" : "store"}`,
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );
        // let data = {};
        // if (vm.isEdit) {
        //   data = { index: vm.editIndex, item: response.data.item };
        //   await vm.$store.dispatch("updateMusicSheet", data);
        // } else {
        //   data = { item: response.data.item };
        //   await vm.$store.dispatch("addMusicSheet", data);
        // }
        vm.$refs.form.reset();
        vm.dialog = !vm.dialog;
      } catch (error) {
        vm.errors = error.response.data.errors;
        console.log(error);
      }
    },

    cancel() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.resetErrors();
      vm.reset();
    },

    resetErrors() {
      const vm = this;
      vm.errors = {
        title: "",
        authorId: "",
        cabinetId: "",
        cuantity: "",
        drawerId: "",
        genderId: "",
        file: "",
      };
    },

    reset() {
      const vm = this;
      vm.form = Object.assign({}, {});
    },

    comfirmDelete(item) {
      const vm = this;
      vm.itemToDelete = Object.assign({}, item);
      // TODO: Remove item from store
      vm.deleteIndex = vm.$store.state.musicSheet.items.findIndex(
        (obj) => obj.id === item.id
      );
      vm.dialogDelete = !vm.dialogDelete;
    },

    cancelItemDelete() {
      const vm = this;
      vm.itemToDelete = Object.assign({}, {});
      vm.deleteIndex = "";
      vm.dialogDelete = !vm.dialogDelete;
    },

    editItem(item) {
      const vm = this;
      vm.editIndex = vm.$store.state.musicSheet.items.indexOf(item);
      vm.isEdit = true;
      vm.form = {
        id: item.id,
        title: item.title,
        authorId: item.author.id,
        genderId: item.gender.id,
        locationId: item.location.id,
        drawerId: parseInt(item.location.drawer_id),
        cabinetId: parseInt(item.location.cabinet_id),
        cuantity: item.cuantity,
      };
      vm.dialog = true;
    },

    async deleteItem(item) {
      const vm = this;
      try {
        // eslint-disable-next-line no-undef
        await axios.post(`music-sheets/destroy/${item.id}`);
        // TODO: Remove item from store
        vm.$nextTick(() => {
          vm.music_sheets.splice(vm.deleteIndex, 1);
        });
        vm.dialogDelete = false;
      } catch (error) {
        console.log(error);
      }
    },

    addNew() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.isEdit = false;
    },

    startLoan(item) {
      const vm = this;
      vm.loanDialog = !vm.loanDialog;
      vm.loanIndex = vm.$store.state.musicSheet.items.indexOf(item);
      vm.loan = {
        musicSheetId: item.id,
        title: item.title,
        authorId: item.author.id,
        genderId: item.gender.id,
        locationId: item.location.id,
        drawerId: parseInt(item.location.drawer_id),
        cabinetId: parseInt(item.location.cabinet_id),
        available: item.available,
        cuantity: vm.loanCuantity,
        maxCuantity: item.available,
      };
    },
    resetLoanErrors() {
      const vm = this;
      vm.loanErrors = {
        borrowerId: "",
        cuantity: "",
        deliveryDate: "",
      };
    },

    async saveLoan() {
      const vm = this;
      vm.resetLoanErrors();
      try {
        let {
          data: { music_sheet },
          // eslint-disable-next-line no-undef
        } = await axios.post("loan/store", vm.loan);
        await vm.$store.dispatch("updateMusicSheet", {
          index: vm.loanIndex,
          item: music_sheet,
        });
        vm.$refs.loanForm.reset();
        vm.loanDialog = !vm.loanDialog;
      } catch (error) {
        vm.loanErrors = error.response.data.errors;
        console.log(error);
      }
    },

    resetLoan() {
      const vm = this;
      vm.resetLoanErrors();
      vm.loan = Object.assign({}, {});
      vm.loanDialog = !vm.loanDialog;
    },

    setDate(date) {
      const vm = this;
      vm.loan.deliveryDate = date;
    },
  },
  watch: {
    "loan.cuantity": function (newVal) {
      const vm = this;
      if (newVal > vm.loan.maxCuantity) {
        vm.loan.cuantity = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.td {
  text-align: left !important;
}
</style>
