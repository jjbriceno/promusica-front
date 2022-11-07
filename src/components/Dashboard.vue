<template>
  <v-container>
    <v-card elevation="8" class="">
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
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
              v-on="on">
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar nueva partitura</span>
        </v-tooltip>
      </v-card-title>
      <v-card-subtitle> Lista de partituras </v-card-subtitle>
      <hr style="color: #4527a0" />
      <v-dialog
        @click:outside="cancel"
        @keydown.esc="cancel"
        v-model="dialog"
        :overlay="false"
        max-width="700px"
        transition="dialog-transition">
        <v-card class="">
          <v-toolbar dark color="#4527a0">
            <v-toolbar-title>{{
              isEdit ? 'Editar partitura' : 'Agregar nueva partitura'
            }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-8">
            <v-form @submit.prevent="save" ref="form">
              <v-text-field
                v-model="form.title"
                placeholder="Título"
                name="title"
                label="Título"
                id="id"
                outlined></v-text-field>
              <v-autocomplete
                v-model="form.authorId"
                item-text="full_name"
                item-value="id"
                outlined
                label="Autor"
                :items="authors"></v-autocomplete>
              <v-select
                :items="genders"
                item-text="name"
                item-value="id"
                v-model="form.genderId"
                label="Géneros"
                outlined></v-select>
              <!-- Location -->
              <!-- Estante -->
              <v-select
                :items="drawers"
                item-text="name"
                item-value="id"
                v-model="form.drawerId"
                label="Estante"
                outlined></v-select>
              <!-- Gaveta -->
              <v-select
                :items="cabinets"
                item-text="name"
                item-value="id"
                v-model="form.cabinetId"
                label="Gaveta"
                outlined></v-select>
              <v-text-field
                v-model.number="form.cuantity"
                placeholder="Cantidad"
                name="Cantidad"
                label="Cantidad"
                id="id"
                type="number"
                min="1"
                outlined></v-text-field>
              <v-card-actions>
                <v-btn type="submit" color="primary">Guardar</v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="cancel">Cancelar</v-btn>
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
        transition="dialog-transition">
        <v-card>
          <v-toolbar dark color="#4527a0">
            <v-toolbar-title> Realizar préstamo </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-6">
            <v-form @submit.prevent="saveLoan" ref="loanForm">
              <v-autocomplete
                :items="borrowers"
                item-text="name"
                item-value="id"
                v-model="loan.borrowerId"
                label="Prestatario"
                outlined></v-autocomplete>
              <v-text-field
                v-model.number="loan.cuantity"
                placeholder="Cantidad"
                name="Cantidad"
                label="Cantidad"
                id="id"
                type="number"
                min="1"
                :max="loan.maxCuantity"
                outlined></v-text-field>
              <DatePicker @selectedDate="setDate"></DatePicker>
              <v-text-field
                v-model="loan.title"
                placeholder="Título"
                name="title"
                label="Título"
                id="id"
                outlined
                disabled></v-text-field>
              <v-autocomplete
                v-model="loan.authorId"
                item-text="full_name"
                item-value="id"
                outlined
                label="Autor"
                :items="authors"
                disabled></v-autocomplete>
              <v-select
                :items="genders"
                item-text="name"
                item-value="id"
                v-model="loan.genderId"
                label="Géneros"
                outlined
                disabled></v-select>
              <!-- Location -->
              <!-- Estante -->
              <v-select
                :items="drawers"
                item-text="name"
                item-value="id"
                v-model="loan.drawerId"
                label="Estante"
                outlined
                disabled></v-select>
              <!-- Gaveta -->
              <v-select
                :items="cabinets"
                item-text="name"
                item-value="id"
                v-model="loan.cabinetId"
                label="Gaveta"
                outlined
                disabled></v-select>
              <v-card-actions>
                <v-btn type="submit" color="primary">Guardar</v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="resetLoan">Cancelar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="musicSheets"
        sort-by="id"
        loading="true"
        :search="search">
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td>{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.author.full_name }}</td>
              <td class="td">
                <v-progress-linear
                  :value="item.available"
                  height="12"
                  color="primary"
                  dark
                  rounded>
                  {{ item.available }}
                </v-progress-linear>
              </td>
              <td>{{ item.gender.name }}</td>
              <td>
                {{
                  item.location.drawer_name + ' ' + item.location.cabinet_name
                }}
              </td>
              <td class="td">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      class="white--text mr-1"
                      color="primary"
                      @click="editItem(item)"
                      v-on="on"
                      v-bind="attrs">
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar partitura</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      class="white--text mr-1"
                      color="red"
                      @click="comfirmDelete(item)"
                      :disabled="item.available === 0"
                      v-on="on"
                      v-bind="attrs">
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
                      small
                      class="white--text"
                      color="purple"
                      @click="startLoan(item)"
                      v-on="on"
                      v-bind="attrs">
                      <v-icon> mdi-hand-coin </v-icon>
                    </v-btn>
                  </template>
                  <span>Préstamo</span>
                </v-tooltip>
              </td>
            </tr>
          </v-hover>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import DatePicker from './DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      form: {},
      isEdit: false,
      editIndex: -1,
      dialogDelete: false,
      itemToDelete: '',
      deleteIndex: '',
      authors: '',
      genders: '',
      drawers: '',
      cabinets: '',
      borrowers: '',
      search: '',
      dateModal: false,
      dialog: false,
      loanDialog: false,
      loanIndex: '',
      loanCuantity: '',
      loan: {},
      headers: [
        {
          text: 'Id',
          value: 'id',
          filterable: false,
          align: 'left',
        },
        {
          text: 'Título',
          value: 'title',
          align: 'left',
        },
        {
          text: 'Autor',
          value: 'author.full_name',
          align: 'left',
        },
        {
          text: 'Cantidad',
          value: 'available',
          filterable: false,
          align: 'center',
        },
        {
          text: 'Género',
          value: 'gender.name',
          filterable: false,
          align: 'left',
        },
        {
          text: 'Ubicación',
          value: 'location.drawer_name',
          filterable: false,
          align: 'left',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      musicSheets: [],
      errors: [],
    };
  },
  async created() {
    const vm = this;
    await vm.getMusicSheets();
    await vm.getAuthors();
    await vm.getGenders();
    await vm.getDrawers();
    await vm.getCabinets();
    await vm.getBorrowers();
  },
  methods: {
    hoverColors(hover) {
      return {
        color: hover ? 'white' : 'inherit',
        background: hover ? '#4527A0' : 'inherit',
      };
    },

    async getMusicSheets() {
      const vm = this;
      try {
        let response = await axios.get('api/music-sheets');
        vm.musicSheets = response.data.music_sheet;
      } catch (error) {}
    },

    async getAuthors() {
      const vm = this;
      try {
        let response = await axios.get('api/authors');
        vm.authors = response.data.authors;
      } catch (error) {}
    },

    async getGenders() {
      const vm = this;
      try {
        let response = await axios.get('api/genders');
        vm.genders = response.data.genders;
      } catch (error) {}
    },

    async getDrawers() {
      const vm = this;
      try {
        let response = await axios.get('api/drawers');
        vm.drawers = response.data.drawers;
      } catch (error) {}
    },

    async getCabinets() {
      const vm = this;
      try {
        let response = await axios.get('api/cabinets');
        vm.cabinets = response.data.cabinets;
      } catch (error) {}
    },

    async getBorrowers() {
      const vm = this;
      try {
        let response = await axios.get('api/borrowers');
        vm.borrowers = response.data.borrowers;
        console.log(vm.borrowers);
      } catch (error) {}
    },

    async save() {
      const vm = this;
      try {
        let response = await axios.post(
          `api/music-sheets/${vm.isEdit ? 'edit' : 'store'}`,
          {
            ...vm.form,
          }
        );
        if (vm.isEdit) {
          Object.assign(vm.musicSheets[vm.editIndex], response.data.item);
        } else {
          vm.musicSheets.push(response.data.item);
        }

        vm.$refs.form.reset();
        vm.dialog = !vm.dialog;
      } catch (error) {
        console.log(error);
      }
    },

    cancel() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.reset();
    },

    reset() {
      const vm = this;
      vm.form = Object.assign({}, {});
    },

    comfirmDelete(item) {
      const vm = this;
      vm.itemToDelete = Object.assign({}, item);
      vm.deleteIndex = vm.musicSheets.findIndex((obj) => obj.id === item.id);
      vm.dialogDelete = !vm.dialogDelete;
    },

    cancelItemDelete() {
      const vm = this;
      vm.itemToDelete = Object.assign({}, {});
      vm.deleteIndex = '';
      vm.dialogDelete = !vm.dialogDelete;
    },

    editItem(item) {
      const vm = this;

      vm.editIndex = vm.musicSheets.indexOf(item);

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
        await axios.post(`api/music-sheets/destroy/${item.id}`);
        vm.$nextTick(() => {
          vm.musicSheets.splice(vm.deleteIndex, 1);
        });
        vm.dialogDelete = false;
      } catch (error) {}
    },

    addNew() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.isEdit = false;
    },

    startLoan(item) {
      const vm = this;
      vm.loanDialog = !vm.loanDialog;
      vm.loanIndex = vm.musicSheets.indexOf(item);
      vm.loan = {
        id: item.id,
        title: item.title,
        authorId: item.author.id,
        genderId: item.gender.id,
        locationId: item.location.id,
        drawerId: parseInt(item.location.drawer_id),
        cabinetId: parseInt(item.location.cabinet_id),
        cuantity: vm.loanCuantity,
        maxCuantity: item.available,
      };
    },

    async saveLoan() {
      try {
        const vm = this;
        let response = await axios.post('api/loan/store', { ...vm.loan });
        vm.loanCuantity = vm.loan.cuantity;
        vm.musicSheets[vm.loanIndex].available -= vm.loanCuantity;

        let updateResponse = await axios.post(`api/music-sheets/update`, {
          id: vm.loan.id,
          cuantity: vm.loan.cuantity,
        });

        vm.$refs.loanForm.reset();
        vm.loanDialog = !vm.loanDialog;
        console.log(vm.loanCuantity);
      } catch (error) {}
    },

    resetLoan() {
      const vm = this;
      vm.loan = Object.assign({}, {});
      vm.loanDialog = !vm.loanDialog;
    },

    setDate(date) {
      const vm = this;
      vm.loan.deliveryDate = date;
    },
  },
  mounted() {
    document.title = 'Partituras';
  },
};
</script>

<style lang="scss">
.td {
  text-align: center !important;
}
// .on-hover-bg {
//     display: table-row;
// }

// .on-hover-bg:hover {
//     color: white !important;
//     background: #1565c0 !important;
// }
</style>
