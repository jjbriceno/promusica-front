<template>
  <v-container>
    <v-card elevation="8" class="">
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
        Autores
        <v-spacer></v-spacer>
        <v-btn color="success" fab small @click="addNew">
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle> Lista de autores </v-card-subtitle>
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
            <v-form ref="form" @submit.prevent="save">
              <v-text-field
                v-model="form.fullName"
                placeholder="Nombre completo"
                name="name"
                label="Nombre completo"
                id="id"
                outlined></v-text-field>
              <v-card-actions>
                <v-btn type="submit" color="primary">Guardar</v-btn>
                <v-btn dark color="error" @click="cancel">Cancelar</v-btn>
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
        :items="authors"
        sort-by="id"
        loading="true"
        :search="search">
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td>{{ item.id }}</td>
              <td>{{ item.full_name }}</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      class="white--text mr-1"
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                      @click="editItem(item)">
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar autor</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="comfirmDelete(item)"
                      fab
                      small
                      class="white--text"
                      color="red"
                      v-on="on"
                      v-bind="attrs">
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar autor</span>
                </v-tooltip>
              </td>
            </tr>
          </v-hover>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogDelete" max-width="450px">
        <v-card>
          <v-card-title class="text-h5"
            >¿Está seguro de eliminar el autor?</v-card-title
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      form: {},
      isEdit: false,
      editIndex: '',
      itemToDelete: '',
      deleteIndex: '',
      headers: [
        {
          text: 'Id',
          value: 'id',
          filterable: false,
          align: 'center',
        },
        {
          text: 'Nombre',
          value: 'full_name',
          align: 'center',
        },
        {
          text: 'Acciones',
          value: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      authors: [],
    };
  },
  async created() {
    const vm = this;
    let response = await axios.get('api/authors');
    vm.authors = response.data.authors;
  },
  methods: {
    hoverColors(hover) {
      return {
        color: hover ? 'white' : 'inherit',
        background: hover ? '#4527A0' : 'inherit',
      };
    },

    async save() {
      const vm = this;
      try {
        let response = await axios.post(
          `api/authors/${vm.isEdit ? 'edit' : 'store'}`,
          { ...vm.form }
        );
        if (vm.isEdit) {
          Object.assign(vm.authors[vm.editIndex], response.data.author);
        } else {
          vm.authors.push(response.data.author);
        }

        vm.$refs.form.reset();
        vm.dialog = !vm.dialog;
      } catch (error) {
        console.log(error);
      }
    },

    editItem(item) {
      const vm = this;
      console.log(item);
      vm.editIndex = vm.authors.findIndex((obj) => obj.id === item.id);

      vm.isEdit = true;

      vm.form = {
        id: item.id,
        fullName: item.full_name,
      };
      vm.dialog = true;
    },

    cancel() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.form = Object.assign({}, {});
      vm.$refs.form.reset();
    },

    addNew() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.isEdit = false;
    },

    async deleteItem(item) {
      const vm = this;

      try {
        await axios.post(`api/authors/destroy/${item.id}`);
        vm.$nextTick(() => {
          vm.authors.splice(vm.deleteIndex, 1);
        });
        vm.dialogDelete = false;
      } catch (error) {}
    },

    cancelItemDelete() {
      const vm = this;
      vm.itemToDelete = Object.assign({}, {});
      vm.deleteIndex = '';
      vm.dialogDelete = !vm.dialogDelete;
    },

    comfirmDelete(item) {
      const vm = this;
      vm.itemToDelete = Object.assign({}, item);
      vm.deleteIndex = vm.authors.findIndex((obj) => obj.id === item.id);
      vm.dialogDelete = !vm.dialogDelete;
    },
  },
};
</script>

<style>
td {
  text-align: center !important;
}
</style>
