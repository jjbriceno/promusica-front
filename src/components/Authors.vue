<template>
    <v-container>
        <v-card elevation="8" class="rounded-xl">
            <v-card-title
                primary-title
                class="font-weight-black primary--text text-subtitle-1 text-uppercase"
            >
                Autores
                <v-spacer></v-spacer>
                <v-btn color="success" fab small @click="dialog = !dialog">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle> Lista de autores </v-card-subtitle>
            <hr style="color: #4527a0" />
            <v-dialog
                v-model="dialog"
                :overlay="false"
                max-width="700px"
                transition="dialog-transition"
            >
                <v-card class="rounded-xl">
                    <v-toolbar dark color="#4527a0">
                        <v-toolbar-title>Agregar Nuevo Autor</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="pt-8">
                        <v-form>
                            <v-text-field
                                name="name"
                                label="Nombre"
                                id="id"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                name="last_name"
                                label="Apellido"
                                id="id"
                                outlined
                            ></v-text-field>
                        </v-form>
                        <v-card-actions>
                            <v-btn color="success">Guardar</v-btn>
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
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="authors"
                sort-by="id"
                loading="true"
                :search="search"
            >
                <template v-slot:item="{ item }">
                    <v-hover v-slot="{ hover }">
                        <tr class="on-hover-bg" :style="hoverColors(hover)">
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.cuantity }}</td>
                            <td>
                                <v-btn
                                    fab
                                    small
                                    class="white--text"
                                    color="primary"
                                >
                                    <v-icon> mdi-pencil </v-icon>
                                </v-btn>
                                <v-btn
                                    fab
                                    small
                                    class="white--text"
                                    color="red"
                                >
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
            search: "",
            dialog: false,
            headers: [
                {
                    text: "Id",
                    value: "id",
                    filterable: false,
                    align: "center",
                },
                {
                    text: "Nombre",
                    value: "name",
                    align: "center",
                },
                {
                    text: "Partituras",
                    value: "cuantity",
                    filterable: false,
                    align: "center",
                },
                {
                    text: "Acciones",
                    value: "actions",
                    sortable: false,
                    align: "center",
                },
            ],
            authors: [],
        };
    },
    async created() {
        const vm = this;
        vm.authors = [
            {
                id: 1,
                name: "Veronica Stading",
                cuantity: 95,
            },
            {
                id: 2,
                name: "Alvin Tewes",
                cuantity: 58,
            },
            {
                id: 3,
                name: "Joanna Crier",
                cuantity: 85,
            },
            {
                id: 4,
                name: "Augustus Roark",
                cuantity: 79,
            },
            {
                id: 5,
                name: "Ruddy Creaven",
                cuantity: 24,
            },
            {
                id: 6,
                name: "Micah Madge",
                cuantity: 34,
            },
            {
                id: 7,
                name: "Reggis Blaschek",
                cuantity: 13,
            },
            {
                id: 8,
                name: "Marinna Boate",
                cuantity: 13,
            },
            {
                id: 9,
                name: "Appolonia Seide",
                cuantity: 12,
            },
            {
                id: 10,
                name: "Christi Braidon",
                cuantity: 16,
            },
            {
                id: 11,
                name: "Sela Jervoise",
                cuantity: 64,
            },
            {
                id: 12,
                name: "Carleton Scudamore",
                cuantity: 13,
            },
            {
                id: 13,
                name: "Wynn Gorrick",
                cuantity: 12,
            },
            {
                id: 14,
                name: "Janeta Clutterbuck",
                cuantity: 99,
            },
            {
                id: 15,
                name: "Goldina Coolbear",
                cuantity: 60,
            },
            {
                id: 16,
                name: "Holly Adiscot",
                cuantity: 28,
            },
            {
                id: 17,
                name: "Farrell Vasyushkhin",
                cuantity: 88,
            },
            {
                id: 18,
                name: "Willette Williamson",
                cuantity: 66,
            },
            {
                id: 19,
                name: "Josephina Worsalls",
                cuantity: 32,
            },
            {
                id: 20,
                name: "Morley Telling",
                cuantity: 92,
            },
            {
                id: 21,
                name: "Anabal Vossgen",
                cuantity: 69,
            },
            {
                id: 22,
                name: "Waldemar Kondrachenko",
                cuantity: 24,
            },
            {
                id: 23,
                name: "Frederic Kerswill",
                cuantity: 63,
            },
            {
                id: 24,
                name: "Wilton Leithgoe",
                cuantity: 86,
            },
            {
                id: 25,
                name: "Shandie Hale",
                cuantity: 29,
            },
            {
                id: 26,
                name: "Danya Bracco",
                cuantity: 51,
            },
            {
                id: 27,
                name: "Guenna Coogan",
                cuantity: 23,
            },
            {
                id: 28,
                name: "Madelena Deeley",
                cuantity: 76,
            },
            {
                id: 29,
                name: "Berni Pechell",
                cuantity: 54,
            },
            {
                id: 30,
                name: "Desmond Fidell",
                cuantity: 79,
            },
            {
                id: 31,
                name: "Colas Goude",
                cuantity: 32,
            },
            {
                id: 32,
                name: "Grata Crisford",
                cuantity: 49,
            },
            {
                id: 33,
                name: "Fletch Peploe",
                cuantity: 25,
            },
            {
                id: 34,
                name: "Lorrin Maylor",
                cuantity: 76,
            },
            {
                id: 35,
                name: "Gabbey Doak",
                cuantity: 5,
            },
            {
                id: 36,
                name: "Carlo McLachlan",
                cuantity: 82,
            },
            {
                id: 37,
                name: "Noreen Desport",
                cuantity: 82,
            },
            {
                id: 38,
                name: "Leonore Medford",
                cuantity: 69,
            },
            {
                id: 39,
                name: "Sher Costerd",
                cuantity: 12,
            },
            {
                id: 40,
                name: "Estevan Tynnan",
                cuantity: 65,
            },
            {
                id: 41,
                name: "Konstanze Gotcher",
                cuantity: 10,
            },
            {
                id: 42,
                name: "Burg Brooksby",
                cuantity: 69,
            },
            {
                id: 43,
                name: "Robenia Klimschak",
                cuantity: 48,
            },
            {
                id: 44,
                name: "Leda Pitsall",
                cuantity: 95,
            },
            {
                id: 45,
                name: "Crawford Ropkes",
                cuantity: 3,
            },
            {
                id: 46,
                name: "Audrie Arndt",
                cuantity: 1,
            },
            {
                id: 47,
                name: "Corabella Newvill",
                cuantity: 37,
            },
            {
                id: 48,
                name: "Carol Billson",
                cuantity: 19,
            },
            {
                id: 49,
                name: "Ashia Odhams",
                cuantity: 62,
            },
            {
                id: 50,
                name: "Onida Khoter",
                cuantity: 91,
            },
            {
                id: 51,
                name: "Edvard McDonnell",
                cuantity: 67,
            },
            {
                id: 52,
                name: "Delilah Wanley",
                cuantity: 64,
            },
            {
                id: 53,
                name: "Marinna Degue",
                cuantity: 2,
            },
            {
                id: 54,
                name: "Glynnis Blasiak",
                cuantity: 85,
            },
            {
                id: 55,
                name: "Melissa Willoughey",
                cuantity: 67,
            },
            {
                id: 56,
                name: "Glynn Penna",
                cuantity: 75,
            },
            {
                id: 57,
                name: "Alayne Ainger",
                cuantity: 30,
            },
            {
                id: 58,
                name: "Calli Roust",
                cuantity: 12,
            },
            {
                id: 59,
                name: "Jemimah Borgne",
                cuantity: 43,
            },
            {
                id: 60,
                name: "Garvy Suttie",
                cuantity: 24,
            },
            {
                id: 61,
                name: "Annecorinne Chatenier",
                cuantity: 7,
            },
            {
                id: 62,
                name: "Yurik Baddiley",
                cuantity: 89,
            },
            {
                id: 63,
                name: "Kellen Dransfield",
                cuantity: 15,
            },
            {
                id: 64,
                name: "Hillyer Eisold",
                cuantity: 6,
            },
            {
                id: 65,
                name: "Kally Scardafield",
                cuantity: 36,
            },
            {
                id: 66,
                name: "Genevieve Mullenger",
                cuantity: 25,
            },
            {
                id: 67,
                name: "Vania Allcock",
                cuantity: 90,
            },
            {
                id: 68,
                name: "Anallise Pollicote",
                cuantity: 68,
            },
            {
                id: 69,
                name: "Lacie Margetts",
                cuantity: 13,
            },
            {
                id: 70,
                name: "Karim Eriksson",
                cuantity: 79,
            },
            {
                id: 71,
                name: "Marketa Deal",
                cuantity: 40,
            },
            {
                id: 72,
                name: "Catriona Blesing",
                cuantity: 21,
            },
            {
                id: 73,
                name: "Ransom Nare",
                cuantity: 54,
            },
            {
                id: 74,
                name: "Tito Gallyhaock",
                cuantity: 16,
            },
            {
                id: 75,
                name: "Rouvin Marshman",
                cuantity: 34,
            },
            {
                id: 76,
                name: "Andre Manon",
                cuantity: 70,
            },
            {
                id: 77,
                name: "Flossy Duthy",
                cuantity: 83,
            },
            {
                id: 78,
                name: "Alfredo McCorkell",
                cuantity: 23,
            },
            {
                id: 79,
                name: "Bryn Pett",
                cuantity: 69,
            },
            {
                id: 80,
                name: "Gertrude Holberry",
                cuantity: 79,
            },
            {
                id: 81,
                name: "Selia Buttel",
                cuantity: 78,
            },
            {
                id: 82,
                name: "Ferdinand Bedward",
                cuantity: 58,
            },
            {
                id: 83,
                name: "Clem Grisdale",
                cuantity: 64,
            },
            {
                id: 84,
                name: "Clementius Dundon",
                cuantity: 4,
            },
            {
                id: 85,
                name: "Bale Dinnage",
                cuantity: 42,
            },
            {
                id: 86,
                name: "Tiphanie Mathou",
                cuantity: 63,
            },
            {
                id: 87,
                name: "Rice Dorkins",
                cuantity: 14,
            },
            {
                id: 88,
                name: "Clayson Thairs",
                cuantity: 71,
            },
            {
                id: 89,
                name: "Fionna Dyott",
                cuantity: 10,
            },
            {
                id: 90,
                name: "Dame Ahlf",
                cuantity: 13,
            },
            {
                id: 91,
                name: "Ferdy Itzkin",
                cuantity: 96,
            },
            {
                id: 92,
                name: "Skipp Strevens",
                cuantity: 33,
            },
            {
                id: 93,
                name: "Cecilius Hegdonne",
                cuantity: 55,
            },
            {
                id: 94,
                name: "Stoddard BoHlingolsen",
                cuantity: 43,
            },
            {
                id: 95,
                name: "Moise Boylan",
                cuantity: 95,
            },
            {
                id: 96,
                name: "Missie Mico",
                cuantity: 12,
            },
            {
                id: 97,
                name: "Cordell Rohlfs",
                cuantity: 80,
            },
            {
                id: 98,
                name: "Ozzy Sperry",
                cuantity: 62,
            },
            {
                id: 99,
                name: "Meryl Cruikshank",
                cuantity: 14,
            },
            {
                id: 100,
                name: "Jacqui Kenneway",
                cuantity: 64,
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
                color: hover ? "white" : "inherit",
                background: hover ? "#4527A0" : "inherit",
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
