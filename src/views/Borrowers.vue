<template>
  <v-container>
    <v-card dark elevation="8" color="#4c4e7e">
      <v-card-title
        primary-title
        class="font-weight-black white--text text-subtitle-1 text-uppercase"
      >
        Prestatarios
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle> Registrar nuevo prestatario </v-card-subtitle>
      <hr color="#fb13c1" />
      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  maxlength="10"
                  outlined
                  v-model="form.firstName"
                  :counter="10"
                  label="Nombre"
                  placeholder="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  maxlength="10"
                  outlined
                  v-model="form.lastName"
                  :counter="10"
                  label="Apellido"
                  placeholder="Apellido"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.email"
                  label="E-mail (Opcional)"
                  placeholder="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  maxlength="11"
                  outlined
                  v-model="form.phone"
                  label="Télefono"
                  counter="11"
                  placeholder="Télefono"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.address"
                  label="Dirección (Opcional)"
                  counter="50"
                  placeholder="Dirección (Opcional)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn dark color="red" @click="clear">Limpiar</v-btn>
              <v-btn type="submit" color="success">Guardar</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card dark elevation="8" color="#4c4e7e" class="mt-6">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="borrowers"
        sort-by="id"
        loading="true"
        :search="search"
        style="background-color: #4c4e7e"
      >
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td>&nbsp;</td>
              <td>{{ item.name.split(" ")[0] }}</td>
              <td>{{ item.name.split(" ")[1] }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.address }}</td>
              <td class="td">
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
                      @click="comfirmDelete(item)"
                      fab
                      x-small
                      class="white--text mr-1"
                      color="red"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar prestatario</span>
                </v-tooltip>
              </td>
            </tr>
          </v-hover>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      @click:outside="cancel"
      @keydown.esc="cancel"
      v-model="dialog"
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card dark color="#4c4e7e">
        <v-toolbar color="#393c5f">
          <v-toolbar-title>Editar datos del prestatario</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pt-8">
          <v-form @submit.prevent="save" ref="editForm">
            <v-text-field
              placeholder="Nombre"
              name="name"
              label="Nombre"
              id="name"
              outlined
              v-model="editForm.name"
            ></v-text-field>
            <v-text-field
              placeholder="Apellido"
              name="lastName"
              label="Apellido"
              id="lastName"
              outlined
              v-model="editForm.lastName"
            ></v-text-field>
            <v-text-field
              placeholder="Email"
              name="email"
              label="Email"
              id="email"
              outlined
              v-model="editForm.email"
            ></v-text-field>
            <v-text-field
              placeholder="Teléfono"
              name="phone"
              label="Teléfono"
              id="phone"
              outlined
              v-model="editForm.phone"
            ></v-text-field>
            <v-text-field
              placeholder="Dirección"
              name="address"
              label="Dirección"
              id="address"
              outlined
              v-model="editForm.address"
            ></v-text-field>
            <v-card-actions>
              <v-btn dark color="red" @click="cancel">Cancelar</v-btn>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="success">Guardar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="480px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Está seguro de eliminar el prestatario?</v-card-title
        >
        <v-card-text>
          Eliminar este prestatario tambien produce la eliminación de los
          prestamos asociados al mismo.
        </v-card-text>
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
  </v-container>
</template>

<script>
export default {
  name: "BorrowersView",
  data: () => ({
    search: "",
    form: {},
    dialog: false,
    editForm: {},
    dialogDelete: false,
    deleteIndex: "",
    editIndex: "",
    itemToDelete: "",
    headers: [
      {},
      {
        text: "Nombre",
        value: "name",
        align: "left",
      },
      {
        text: "Apellido",
        value: "name",
        align: "left",
      },
      {
        text: "E-mail",
        value: "email",
        filterable: false,
        align: "left",
      },
      {
        text: "Télefono",
        value: "phone",
        filterable: false,
        align: "left",
      },
      {
        text: "Dirección",
        value: "address",
        filterable: false,
        align: "left",
      },
      {
        text: "",
        value: "actions",
        sortable: false,
        align: "left",
      },
    ],
    borrowers: [],
  }),
  async created() {
    const vm = this;
    await vm.getBorrowers();
  },

  methods: {
    hoverColors(hover) {
      return {
        color: hover ? "white" : "inherit",
        background: hover ? "#4527A0" : "inherit",
      };
    },
    async submit() {
      try {
        const vm = this;
        // eslint-disable-next-line no-undef
        let response = await axios.post("api/borrowers/store", vm.form);
        vm.borrowers.push(response.data.borrower);
        vm.$refs.form.reset();
      } catch (error) {
        console.log(error);
      }
    },

    async getBorrowers() {
      try {
        const vm = this;
        // eslint-disable-next-line no-undef
        let response = await axios.get("api/borrowers");
        vm.borrowers = response.data.borrowers;
        console.log(vm.borrowers);
      } catch (error) {
        console.log(error);
      }
    },

    clear() {
      const vm = this;
      vm.$refs.form.reset();
    },

    editItem(item) {
      const vm = this;

      vm.editIndex = vm.borrowers.indexOf(item);

      vm.isEdit = true;

      vm.editForm = {
        id: item.id,
        name: item.name.split(" ")[0],
        lastName: item.name.split(" ")[1],
        email: item.email,
        phone: item.phone,
        address: item.address,
      };
      vm.dialog = true;
    },

    async save() {
      const vm = this;
      try {
        // eslint-disable-next-line no-undef
        let response = await axios.post("api/borrowers/edit", vm.editForm);
        if (vm.isEdit) {
          Object.assign(vm.borrowers[vm.editIndex], response.data.borrower);
        } else {
          vm.borrowers.push(response.data.borrower);
        }

        vm.$refs.editForm.reset();
        vm.dialog = !vm.dialog;
      } catch (error) {
        console.log(error);
      }
    },

    cancel() {
      const vm = this;
      vm.dialog = !vm.dialog;
      vm.$refs.form.reset();
    },

    comfirmDelete(item) {
      const vm = this;
      vm.itemToDelete = Object.assign({}, item);
      vm.deleteIndex = vm.borrowers.findIndex((obj) => obj.id === item.id);
      vm.dialogDelete = !vm.dialogDelete;
    },

    cancelItemDelete() {
      const vm = this;
      vm.itemToDelete = Object.assign({}, {});
      vm.deleteIndex = "";
      vm.dialogDelete = !vm.dialogDelete;
    },

    async deleteItem(item) {
      const vm = this;

      try {
        // eslint-disable-next-line no-undef
        await axios.post(`api/borrowers/destroy/${item.id}`);
        vm.$nextTick(() => {
          vm.borrowers.splice(vm.deleteIndex, 1);
        });
        vm.dialogDelete = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    document.title = "Prestatarios";
  },
};
</script>

<style lang="scss" scoped>
.td {
  text-align: left !important;
}
</style>
