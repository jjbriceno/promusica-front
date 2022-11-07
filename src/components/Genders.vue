<template>
  <v-container>
    <v-card elevation="8" class="">
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
        Géneros Musicales
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
          <span>Agregar nuevo género</span>
        </v-tooltip>
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
            <v-toolbar-title>{{
              isEdit ? 'Editar género' : 'Agregar nuevo género'
            }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-8">
            <v-form @submit.prevent="save" ref="form">
              <v-text-field
                v-model="form.genderName"
                name="name"
                label="Nombre"
                placeholder="Nombre"
                id="id"
                outlined></v-text-field>
              <v-card-actions>
                <v-btn type="submit" color="primary">Guardar</v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="error" @click="dialog = !dialog"
                  >Cancelar</v-btn
                >
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
        :items="genders"
        sort-by="id"
        loading="true"
        :search="search">
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td class="td">{{ item.id }}</td>
              <td class="td">{{ item.name }}</td>
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
                  <span>Editar género</span>
                </v-tooltip>
                <!-- <v-btn fab small class="white--text" color="red">
                  <v-icon> mdi-delete </v-icon>
                </v-btn> -->
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
          value: 'name',
          align: 'center',
        },
        {
          text: '',
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
    await vm.getGenders();
  },
  mounted() {
    document.title = 'Géneros';
  },

  methods: {
    async getGenders() {
      const vm = this;
      let response = await axios.get('api/genders');
      vm.genders = response.data.genders;
      console.log(response.data);
    },
    addNew() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.isEdit = false;
    },
    async save() {
      const vm = this;
      try {
        let response = await axios.post(
          `api/genders/${vm.isEdit ? 'edit' : 'store'}`,
          { ...vm.form }
        );
        if (vm.isEdit) {
          Object.assign(vm.genders[vm.editIndex], response.data.gender);
        } else {
          vm.genders.push(response.data.gender);
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
      vm.editIndex = vm.genders.findIndex((obj) => obj.id === item.id);

      vm.isEdit = true;

      vm.form = {
        id: item.id,
        genderName: item.name,
      };
      vm.dialog = true;
    },
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
.td {
  text-align: center !important;
}
</style>
