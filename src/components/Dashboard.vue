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
            <v-form>
              <v-text-field
                placeholder="Título"
                name="title"
                label="Título"
                id="id"
                outlined></v-text-field>
              <v-select
                :items="authors"
                v-model="author_id"
                label="Autor"
                outlined></v-select>
              <v-select
                :items="genders"
                v-model="gender_id"
                label="Géneros"
                outlined></v-select>
              <!-- Location -->
              <!-- Archivador -->
              <v-select
                :items="drawers"
                v-model="drawer_id"
                label="Archivador"
                outlined></v-select>
              <!-- Gaveta -->
              <v-select
                :items="cabinets"
                v-model="cabinets_id"
                label="Gaveta"
                outlined></v-select>
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
        :items="users"
        sort-by="id"
        loading="true"
        :search="search">
        <template v-slot:item="{ item }">
          <v-hover v-slot="{ hover }">
            <tr class="on-hover-bg" :style="hoverColors(hover)">
              <td>{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.author }}</td>
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
              <td>{{ item.gender }}</td>
              <td>{{ item.location }}</td>
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
import axios from 'axios';

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
      users: [],
    };
  },
  async created() {
    const vm = this;
    vm.users = [
      {
        id: 1,
        title: 'Civil Brand',
        author: 'Ariella Rains',
        cuantity: 61,
        gender: 'Drama',
        location: 'F9-A4-42-52-D1-6C',
      },
      {
        id: 2,
        title: 'Night Tide',
        author: 'Vaughan Laird-Craig',
        cuantity: 15,
        gender: 'Drama',
        location: '6A-C0-F6-24-70-C3',
      },
      {
        id: 3,
        title: 'Sicily! (Sicilia!)',
        author: 'Haleigh Chaldecott',
        cuantity: 31,
        gender: 'Drama',
        location: 'B1-E5-25-88-D3-36',
      },
      {
        id: 4,
        title: 'Dinner Rush',
        author: 'Meggy Elkins',
        cuantity: 38,
        gender: 'Drama',
        location: 'CE-B4-9E-60-A6-92',
      },
      {
        id: 5,
        title: 'Stranger, The (Straniero, Lo)',
        author: 'Quint Cheel',
        cuantity: 88,
        gender: 'Drama',
        location: '35-7D-7D-61-7C-4A',
      },
      {
        id: 6,
        title: 'Chameleon, The ',
        author: 'Dev Baldoni',
        cuantity: 63,
        gender: 'Drama',
        location: 'DD-05-9C-38-DF-3A',
      },
      {
        id: 7,
        title: 'Suburbia',
        author: 'Issy Rimell',
        cuantity: 81,
        gender: 'Drama',
        location: '17-C4-28-45-40-A5',
      },
      {
        id: 8,
        title: 'Care Bears Movie, The',
        author: 'Vita Logan',
        cuantity: 4,
        gender: 'Animation|Children|Fantasy',
        location: 'C3-4A-1F-4C-E3-1B',
      },
      {
        id: 9,
        title: 'Amen',
        author: 'Harlene Dronsfield',
        cuantity: 47,
        gender: 'Drama|Musical',
        location: '34-5A-F6-02-F7-F7',
      },
      {
        id: 10,
        title: 'Gatekeepers, The',
        author: 'Tracey Anning',
        cuantity: 82,
        gender: 'Documentary',
        location: 'E7-B8-0E-65-21-3E',
      },
      {
        id: 11,
        title: 'Sex & the Other Man',
        author: "Marquita O'Carrol",
        cuantity: 31,
        gender: 'Comedy|Drama',
        location: 'C0-BE-AE-A1-D7-AF',
      },
      {
        id: 12,
        title: 'Dragon Gate Inn (Dragon Inn) (Long men kezhan)',
        author: "Zach O' Clovan",
        cuantity: 88,
        gender: 'Action|Adventure',
        location: 'C8-E3-D8-8D-9B-C1',
      },
      {
        id: 13,
        title: 'Opening Night',
        author: 'Maritsa Shortall',
        cuantity: 21,
        gender: 'Drama',
        location: 'FB-29-49-53-3C-55',
      },
      {
        id: 14,
        title: "McHale's Navy",
        author: 'Thane Neising',
        cuantity: 4,
        gender: 'Comedy|War',
        location: '95-92-9D-FA-4F-66',
      },
      {
        id: 15,
        title: 'Jellyfish (Meduzot)',
        author: 'Derby Reicherz',
        cuantity: 61,
        gender: 'Drama',
        location: '15-D4-4E-AD-DB-33',
      },
      {
        id: 16,
        title: 'Up Periscope',
        author: 'Ida Issacson',
        cuantity: 47,
        gender: 'Action|Drama|War',
        location: 'DC-9E-C3-45-93-27',
      },
      {
        id: 17,
        title: 'Candleshoe',
        author: 'Peyton Doeg',
        cuantity: 79,
        gender: 'Adventure|Children|Comedy',
        location: '61-1A-80-5F-9F-10',
      },
      {
        id: 18,
        title: 'Lassie Come Home',
        author: 'Elnore Boldecke',
        cuantity: 64,
        gender: 'Adventure|Children|Drama',
        location: '6D-0F-0F-03-B7-46',
      },
      {
        id: 19,
        title: 'Beverly Hills Chihuahua 2',
        author: 'Carlita Herculson',
        cuantity: 51,
        gender: 'Children|Comedy',
        location: 'E0-18-9D-03-BC-FF',
      },
      {
        id: 20,
        title: 'Waking Madison ',
        author: 'Libbi Clemmen',
        cuantity: 53,
        gender: 'Drama',
        location: '33-8F-98-13-71-D0',
      },
      {
        id: 21,
        title: 'Beats Being Dead (Dreileben - Etwas Besseres als den Tod)',
        author: 'Orlan Plain',
        cuantity: 9,
        gender: 'Drama',
        location: '86-61-0D-49-7D-97',
      },
      {
        id: 22,
        title: 'Professional, The (Le professionnel)',
        author: 'Carolan Stobie',
        cuantity: 100,
        gender: 'Action|Drama|Thriller',
        location: 'F2-1A-52-DA-C3-FF',
      },
      {
        id: 23,
        title: 'Grey Gardens',
        author: 'Sherm Jammet',
        cuantity: 85,
        gender: 'Drama',
        location: '15-8B-C3-EE-35-7A',
      },
      {
        id: 24,
        title: 'Switch, The',
        author: 'Talia McKall',
        cuantity: 89,
        gender: 'Comedy|Romance',
        location: '8C-AE-AE-2D-EC-0D',
      },
      {
        id: 25,
        title: 'Personal Best',
        author: 'Minni Cluer',
        cuantity: 80,
        gender: 'Drama',
        location: 'CA-5D-21-16-50-DF',
      },
      {
        id: 26,
        title: 'Primal',
        author: 'Jordana Ponsford',
        cuantity: 92,
        gender: 'Horror|Thriller',
        location: '4F-4D-88-D2-9D-FC',
      },
      {
        id: 27,
        title: "Sharpe's Sword",
        author: 'Tedd Lampbrecht',
        cuantity: 48,
        gender: 'Action|Adventure|War',
        location: 'ED-02-73-50-D7-C6',
      },
      {
        id: 28,
        title: 'Monsters University',
        author: 'Noak Lanchester',
        cuantity: 45,
        gender: 'Adventure|Animation|Comedy',
        location: 'F1-A5-DE-80-BE-9D',
      },
      {
        id: 29,
        title: 'Letter, The',
        author: 'Dal Judgkins',
        cuantity: 14,
        gender: 'Drama|Film-Noir',
        location: '30-BC-0A-3A-8C-85',
      },
      {
        id: 30,
        title: 'Rio Bravo',
        author: 'Rad Kermath',
        cuantity: 82,
        gender: 'Western',
        location: '40-AB-54-19-25-C3',
      },
      {
        id: 31,
        title: 'First Deadly Sin, The',
        author: 'Tyrone Buffey',
        cuantity: 19,
        gender: 'Thriller',
        location: '27-01-4A-30-98-53',
      },
      
    ];
  
    /** API call to backend */
    // let response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users"
    // );
    // response = await response.json();
    // response.filter((user) => {
    //     vm.users.push({
    //         id: user.id,
    //         name: user.name,
    //         username: user.username,
    //         email: user.email,
    //         address: user.address.street,
    //         phone: user.phone,
    //         website: user.website,
    //         company: user.company.name,
    //         cuantity: 25,
    //     });
    // });
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
