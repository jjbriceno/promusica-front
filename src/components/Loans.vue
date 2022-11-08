<template>
  <v-container>
    <v-card>
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
        Préstamos
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle> Lista de préstamos </v-card-subtitle>
      <hr style="color: #4527a0" />
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
        :items="loans"
        sort-by="id"
        loading="true"
        :search="search">
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.loans.length }}</td>
              <td>{{ item.total_music_sheets }}</td>
              <td class="td">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      class="white--text mr-1"
                      color="red"
                      v-on="on"
                      @click="comfirmDelete(item)"
                      v-bind="attrs">
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar préstamo(s)</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      class="white--text mr-1"
                      color="cyan"
                      v-on="on"
                      @click="viewLoanDetails(item)"
                      v-bind="attrs">
                      <v-icon> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  <span>Detalles</span>
                </v-tooltip>
              </td>
            </tr>
          </v-hover>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="460px">
        <v-card>
          <v-card-title class="text-h5"
            >¿Está seguro de eliminar el préstamo?</v-card-title
          >
          <v-card-text class="text-justify">
            Eliminar este prestamo reintegra las partituras y estarán
            disponibles para realizar nuevos prestamos. Asegúrese de tener estas
            partituras antes de eliminar este préstamo.
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

      <v-dialog v-model="confirmReturnDialog" max-width="300px">
        <v-card>
          <v-card-title class="text-h5">¿Retonar partitura(s)?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="confirmReturnLoan"
              >Aceptar</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="red" dark @click="cancelReturn">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        @click:outside="cancel"
        @keydown.esc="cancel"
        v-model="viewDetailsDialog"
        :overlay="false"
        max-width="1000px"
        transition="dialog-transition">
        <v-card class="">
          <v-toolbar dark color="#4527a0">
            <v-toolbar-title>{{ borrowerName }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-8">
            <v-data-table
              :headers="dialogHeaders"
              :items="borrowerLoans"
              sort-by="id"
              loading="true"
              :search="search">
              <template v-slot:item="{ item }">
                <v-hover v-slot="{ hover }">
                  <tr class="on-hover-bg" :style="hoverColors(hover)">
                    <td>{{ item.id }}</td>
                    <td>{{ item.loan_info.author }}</td>
                    <td>{{ item.loan_info.title }}</td>
                    <td>{{ item.loan_date }}</td>
                    <td>{{ item.delivery_date }}</td>
                    <td>{{ item.cuantity }}</td>
                    <td class="td">
                      <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
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
                      </v-tooltip> -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="returnLoan(item)"
                            icon
                            small
                            class="white--text mr-1"
                            color="green"
                            v-on="on"
                            v-bind="attrs">
                            <v-icon> mdi-inbox-arrow-down </v-icon>
                          </v-btn>
                        </template>
                        <span>Entregar partituras</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </v-hover>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mt-2" dark color="error" @click="cancel"
                >Cerrar</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    deleteIndex: '',
    editIndex: '',
    itemToDelete: '',
    borrowerName: '',
    viewDetailsDialog: false,
    confirmReturnDialog: false,
    returningLoan: {},
    headers: [
      {
        text: 'Id',
        value: 'id',
        filterable: false,
      },
      {
        text: 'Prestatario',
        value: 'name',
      },
      {
        text: 'Prestamos activos',
        value: 'loans',
      },
      {
        text: 'N° de partituras',
        value: 'total_music_sheets',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
      },
    ],

    dialogHeaders: [
      {
        text: 'Id',
        value: 'id',
        filterable: false,
      },
      {
        text: 'Título',
        value: 'loan_info.title',
      },
      {
        text: 'Autor',
        value: 'loan_info.author',
      },
      {
        text: 'Fecha de préstamo',
        value: 'loan_date',
      },
      {
        text: 'Fecha de entrega',
        value: 'delivery_date',
      },
      {
        text: 'N° de partituras',
        value: 'cuantity',
      },
      {
        text: 'Acciones',
        value: 'actions',
        sortable: false,
        align: 'center',
      },
    ],
    loans: [],
    borrowerLoans: [],
  }),

  methods: {
    /**
     *
     */
    async confirmReturnLoan() {
      try {
        const vm = this;
        let response = await axios.post('api/loan/return', {
          ...vm.returningLoan,
        });
        vm.$nextTick(() => {
          vm.borrowerLoans = response.data.loans;
          vm.loans = response.data.borrowers;
          console.log(vm.borrowerLoans, vm.loans);
        });
        vm.confirmReturnDialog = !vm.confirmReturnDialog;
      } catch (error) {}
    },
    /**
     *
     */
    cancelReturn() {
      const vm = this;
      vm.confirmReturnDialog = !vm.confirmReturnDialog;
      vm.returningLoan = Object.assign({}, {});
    },
    /**
     *
     */
    returnLoan(item) {
      const vm = this;

      vm.confirmReturnDialog = !vm.confirmReturnDialog;

      let key = JSON.parse(item.music_sheets_borrowed_amount);

      console.log(key);

      let musicSheetId = Object.keys(key)[0];

      vm.returningLoan = {
        musicSheetId: musicSheetId,
        loanId: item.id,
        cuantity: item.cuantity,
      };

      console.log(musicSheetId[0], item.id, vm.borrowerId);
    },
    /**
     *
     * @param {*} item
     */
    viewLoanDetails(item) {
      const vm = this;
      vm.viewDetailsDialog = !vm.viewDetailsDialog;
      vm.borrowerName = item.name;
      vm.borrowerLoans = item.loans;
      vm.borrowerId = item.id;
      console.log('borrower_id', vm.borrowerId);
    },

    /**
     *
     */
    cancel() {
      const vm = this;
      vm.viewDetailsDialog = !vm.viewDetailsDialog;
    },

    /**
     *
     * @param {*} item
     */
    comfirmDelete(item) {
      const vm = this;
      vm.itemToDelete = Object.assign({}, item);
      vm.deleteIndex = vm.loans.findIndex((obj) => obj.id === item.id);
      vm.dialogDelete = !vm.dialogDelete;
    },

    /**
     *
     */
    cancelItemDelete() {
      const vm = this;
      vm.itemToDelete = Object.assign({}, {});
      vm.deleteIndex = '';
      vm.dialogDelete = !vm.dialogDelete;
    },

    /**
     *
     * @param {*} item
     */
    async deleteItem(item) {
      const vm = this;

      try {
        let response = await axios.post(`api/loan/destroy/${item.id}`);
        vm.$nextTick(() => {
          vm.loans.splice(vm.deleteIndex, 1);
          vm.loans = response.data.loans;
        });
        vm.dialogDelete = false;
      } catch (error) {}
    },

    /**
     *
     */
    async getLoans() {
      try {
        const vm = this;
        let response = await axios.get('api/loan');
        vm.loans = response.data.loans;
        console.log(vm.loans);
      } catch (error) {}
    },

    /**
     *
     * @param {*} hover
     */
    hoverColors(hover) {
      return {
        color: hover ? 'white' : 'inherit',
        background: hover ? '#4527A0' : 'inherit',
      };
    },
  },
  async created() {
    const vm = this;
    await vm.getLoans();
  },

  mounted() {
    document.title = 'Préstamos';
  },
};
</script>

<style scoped>
.td {
  text-align: center !important;
}
</style>
