<template>
    <v-container>
        <v-card elevation="8" class="rounded-xl">
            <v-card-title
                primary-title
                class="font-weight-black primary--text text-subtitle-1 text-uppercase"
            >
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
                transition="dialog-transition"
            >
                <v-card class="rounded-xl">
                    <v-toolbar dark color="#4527a0">
                        <v-toolbar-title>Agregar Nuevo Género Musical</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="pt-8">
                        <v-form>
                            <v-text-field
                                name="name"
                                label="Nombre"
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
                :items="genders"
                sort-by="id"
                loading="true"
                :search="search"
            >
                <template v-slot:item="{ item }">
                    <v-hover v-slot="{ hover }">
                        <tr class="on-hover-bg" :style="hoverColors(hover)">
                            <td>{{ item.id }}</td>
                            <td>{{ item.gender }}</td>
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
                    value: "gender",
                    align: "center",
                },
                {
                    text: "Acciones",
                    value: "actions",
                    sortable: false,
                    align: "center",
                },
            ],
            genders: [],
        };
    },
    async created() {
        const vm = this;
        vm.genders = [
            {
                id: 1,
                gender: "Fire Protection",
            },
            {
                id: 2,
                gender: "Epoxy Flooring",
            },
            {
                id: 3,
                gender: "Site Furnishings",
            },
            {
                id: 4,
                gender: "Landscaping & Irrigation",
            },
            {
                id: 5,
                gender: "Rebar & Wire Mesh Install",
            },
            {
                id: 6,
                gender: "Overhead Doors",
            },
            {
                id: 7,
                gender: "Asphalt Paving",
            },
            {
                id: 8,
                gender: "Painting & Vinyl Wall Covering",
            },
            {
                id: 9,
                gender: "Prefabricated Aluminum Metal Canopies",
            },
            {
                id: 10,
                gender: "Soft Flooring and Base",
            },
            {
                id: 11,
                gender: "Rebar & Wire Mesh Install",
            },
            {
                id: 12,
                gender: "Masonry & Precast",
            },
            {
                id: 13,
                gender: "Site Furnishings",
            },
            {
                id: 14,
                gender: "Framing (Wood)",
            },
            {
                id: 15,
                gender: "Ornamental Railings",
            },
            {
                id: 16,
                gender: "Fire Sprinkler System",
            },
            {
                id: 17,
                gender: "Waterproofing & Caulking",
            },
            {
                id: 18,
                gender: "RF Shielding",
            },
            {
                id: 19,
                gender: "Drywall & Acoustical (FED)",
            },
            {
                id: 20,
                gender: "Drilled Shafts",
            },
            {
                id: 21,
                gender: "Electrical",
            },
            {
                id: 22,
                gender: "HVAC",
            },
            {
                id: 23,
                gender: "Electrical",
            },
            {
                id: 24,
                gender: "Plumbing & Medical Gas",
            },
            {
                id: 25,
                gender: "Painting & Vinyl Wall Covering",
            },
            {
                id: 26,
                gender: "Structural and Misc Steel (Fabrication)",
            },
            {
                id: 27,
                gender: "Exterior Signage",
            },
            {
                id: 28,
                gender: "Glass & Glazing",
            },
            {
                id: 29,
                gender: "Overhead Doors",
            },
            {
                id: 30,
                gender: "Exterior Signage",
            },
            {
                id: 31,
                gender: "Asphalt Paving",
            },
            {
                id: 32,
                gender: "Glass & Glazing",
            },
            {
                id: 33,
                gender: "Granite Surfaces",
            },
            {
                id: 34,
                gender: "Electrical and Fire Alarm",
            },
            {
                id: 35,
                gender: "Glass & Glazing",
            },
            {
                id: 36,
                gender: "Glass & Glazing",
            },
            {
                id: 37,
                gender: "Fire Protection",
            },
            {
                id: 38,
                gender: "Drilled Shafts",
            },
            {
                id: 39,
                gender: "Glass & Glazing",
            },
            {
                id: 40,
                gender: "Sitework & Site Utilities",
            },
            {
                id: 41,
                gender: "Asphalt Paving",
            },
            {
                id: 42,
                gender: "Drilled Shafts",
            },
            {
                id: 43,
                gender: "Wall Protection",
            },
            {
                id: 44,
                gender: "Elevator",
            },
            {
                id: 45,
                gender: "Prefabricated Aluminum Metal Canopies",
            },
            {
                id: 46,
                gender: "Landscaping & Irrigation",
            },
            {
                id: 47,
                gender: "Landscaping & Irrigation",
            },
            {
                id: 48,
                gender: "RF Shielding",
            },
            {
                id: 49,
                gender: "Framing (Wood)",
            },
            {
                id: 50,
                gender: "RF Shielding",
            },
            {
                id: 51,
                gender: "Granite Surfaces",
            },
            {
                id: 52,
                gender: "Ornamental Railings",
            },
            {
                id: 53,
                gender: "Masonry & Precast",
            },
            {
                id: 54,
                gender: "Prefabricated Aluminum Metal Canopies",
            },
            {
                id: 55,
                gender: "Framing (Steel)",
            },
            {
                id: 56,
                gender: "Sitework & Site Utilities",
            },
            {
                id: 57,
                gender: "Site Furnishings",
            },
            {
                id: 58,
                gender: "Framing (Steel)",
            },
            {
                id: 59,
                gender: "Electrical and Fire Alarm",
            },
            {
                id: 60,
                gender: "Temp Fencing, Decorative Fencing and Gates",
            },
            {
                id: 61,
                gender: "Roofing (Metal)",
            },
            {
                id: 62,
                gender: "Glass & Glazing",
            },
            {
                id: 63,
                gender: "Framing (Wood)",
            },
            {
                id: 64,
                gender: "Prefabricated Aluminum Metal Canopies",
            },
            {
                id: 65,
                gender: "Temp Fencing, Decorative Fencing and Gates",
            },
            {
                id: 66,
                gender: "Framing (Steel)",
            },
            {
                id: 67,
                gender: "Drywall & Acoustical (MOB)",
            },
            {
                id: 68,
                gender: "Marlite Panels (FED)",
            },
            {
                id: 69,
                gender: "Electrical and Fire Alarm",
            },
            {
                id: 70,
                gender: "Curb & Gutter",
            },
            {
                id: 71,
                gender: "Construction Clean and Final Clean",
            },
            {
                id: 72,
                gender: "RF Shielding",
            },
            {
                id: 73,
                gender: "Asphalt Paving",
            },
            {
                id: 74,
                gender: "Masonry & Precast",
            },
            {
                id: 75,
                gender: "Sitework & Site Utilities",
            },
            {
                id: 76,
                gender: "Rebar & Wire Mesh Install",
            },
            {
                id: 77,
                gender: "Exterior Signage",
            },
            {
                id: 78,
                gender: "Roofing (Metal)",
            },
            {
                id: 79,
                gender: "Plumbing & Medical Gas",
            },
            {
                id: 80,
                gender: "Plumbing & Medical Gas",
            },
            {
                id: 81,
                gender: "Electrical and Fire Alarm",
            },
            {
                id: 82,
                gender: "Overhead Doors",
            },
            {
                id: 83,
                gender: "Drywall & Acoustical (FED)",
            },
            {
                id: 84,
                gender: "Structural and Misc Steel (Fabrication)",
            },
            {
                id: 85,
                gender: "Granite Surfaces",
            },
            {
                id: 86,
                gender: "Framing (Wood)",
            },
            {
                id: 87,
                gender: "Elevator",
            },
            {
                id: 88,
                gender: "Wall Protection",
            },
            {
                id: 89,
                gender: "EIFS",
            },
            {
                id: 90,
                gender: "Painting & Vinyl Wall Covering",
            },
            {
                id: 91,
                gender: "Elevator",
            },
            {
                id: 92,
                gender: "Hard Tile & Stone",
            },
            {
                id: 93,
                gender: "Prefabricated Aluminum Metal Canopies",
            },
            {
                id: 94,
                gender: "Exterior Signage",
            },
            {
                id: 95,
                gender: "Glass & Glazing",
            },
            {
                id: 96,
                gender: "Painting & Vinyl Wall Covering",
            },
            {
                id: 97,
                gender: "RF Shielding",
            },
            {
                id: 98,
                gender: "Plumbing & Medical Gas",
            },
            {
                id: 99,
                gender: "Granite Surfaces",
            },
            {
                id: 100,
                gender: "Overhead Doors",
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
