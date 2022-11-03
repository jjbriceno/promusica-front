<template>
  <v-container>
    <v-card elevation="8" class="">
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
        Géneros Musicales
        <v-spacer></v-spacer>
        <v-btn color="success" fab small @click="dialog = !dialog">
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle> Lista de géneros musicales </v-card-subtitle>
      <hr style="color: #4527a0" />
      <v-dialog
        v-model="dialog"
        :overlay="false"
        max-width="700px"
        transition="dialog-transition">
        <v-card class="">
          <v-toolbar dark color="#4527a0">
            <v-toolbar-title>Agregar Nuevo Género Musical</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-8">
            <v-form>
              <v-text-field
                name="name"
                label="Nombre"
                id="id"
                outlined></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn color="primary">Guardar</v-btn>
              <v-btn dark color="error" @click="dialog = !dialog"
                >Cancelar</v-btn
              >
            </v-card-actions>
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
        :items="genders"
        sort-by="id"
        loading="true"
        :search="search">
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
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
          text: 'Nombre',
          value: 'name',
          align: 'center',
        },
        {
          text: 'Acciones',
          value: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      genders: [],
    };
  },
  async created() {
    const vm = this;
    let response = await axios.get('api/genders');
    vm.genders = response.data.genders;
    console.log(response.data);
  },
  methods: {
    hoverColors(hover) {
      return {
        color: hover ? 'white' : 'inherit',
        background: hover ? '#4527A0' : 'inherit',
      };
    },
  },
};
</script>

<style>
td {
  text-align: center !important;
}
</style>
