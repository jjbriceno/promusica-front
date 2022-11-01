<template>
  <v-container>
    <v-card elevation="8" class="">
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
        Partituras
        <v-spacer></v-spacer>
        <v-btn color="success" fab small @click="dialog = !dialog">
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle> Lista de partituras </v-card-subtitle>
      <hr style="color: #4527a0" />
      <v-dialog
        v-model="dialog"
        :overlay="false"
        max-width="700px"
        transition="dialog-transition">
        <v-card class="">
          <v-toolbar dark color="#4527a0">
            <v-toolbar-title>Agregar Nueva Partitura</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-8">
            <v-form @submit.prevent="submit" ref="form">
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
                <v-btn type="submit" color="primary" @click="save"
                  >Guardar</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="cancel">Cancelar</v-btn>
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
              <td>
                <v-progress-linear
                  :value="item.cuantity"
                  height="12"
                  color="green"
                  dark
                  rounded>
                  {{ item.cuantity }}
                </v-progress-linear>
              </td>
              <td>{{ item.gender.name }}</td>
              <td>
                {{
                  item.location.drawer_name + ' ' + item.location.cabinet_name
                }}
              </td>
              <td>
                <v-btn fab small class="white--text" color="primary">
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
                <v-btn fab small class="white--text" color="red">
                  <v-icon> mdi-delete </v-icon>
                </v-btn>
              </td>
            </tr>
          </v-hover>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        authorId: '',
        genderId: '',
        drawerId: '',
        cabinetId: '',
        cuantity: '',
      },
      authors: '',
      genders: '',
      drawers: '',
      cabinets: '',
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Id',
          value: 'id',
          filterable: false,
          align: 'center',
        },
        {
          text: 'Título',
          value: 'title',
          align: 'center',
        },
        {
          text: 'Autor',
          value: 'author',
          align: 'center',
        },
        {
          text: 'Cantidad',
          value: 'cuantity',
          filterable: false,
          align: 'center',
        },
        {
          text: 'Género',
          value: 'gender',
          filterable: false,
          align: 'center',
        },
        {
          text: 'Ubicación',
          value: 'location',
          filterable: false,
          align: 'center',
        },
        {
          text: 'Acciones',
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

    async save() {
      const vm = this;
      try {
        let response = await axios.post('api/music-sheets/store', {
          ...vm.form,
        });
        vm.musicSheets.push(response.data.item);
        this.$refs.form.reset();
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
      vm.form = {
        title: '',
        authorId: '',
        genderId: '',
        drawerId: '',
        cabinetId: '',
        cuantity: '',
      };
    },
  },
};
</script>

<style lang="scss">
td {
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
