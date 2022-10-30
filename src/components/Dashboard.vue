<template>
    <v-container>
        <v-card elevation="8" class="rounded-xl">
            <v-card-title
                primary-title
                class="font-weight-black primary--text text-subtitle-1 text-uppercase"
            >
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
                transition="dialog-transition"
            >
                <v-card class="rounded-xl">
                    <v-toolbar dark color="#4527a0">
                        <v-toolbar-title>Agregar Nueva Partitura</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="pt-8">
                        <v-form>
                            <v-text-field
                                name="title"
                                label="Título"
                                id="id"
                                outlined
                            ></v-text-field>
                            <v-select
                                :items="authors"
                                v-model="author_id"
                                label="Autor"
                                outlined
                            ></v-select>
                            <v-select
                                :items="genders"
                                v-model="gender_id"
                                label="Géneros"
                                outlined
                            ></v-select>
                            <!-- Location -->
                            <!-- Archivador -->
                            <v-select
                                :items="drawers"
                                v-model="drawer_id"
                                label="Archivador"
                                outlined
                            ></v-select>
                            <!-- Gaveta -->
                            <v-select
                                :items="cabinets"
                                v-model="cabinets_id"
                                label="Gaveta"
                                outlined
                            ></v-select>
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
                :items="users"
                sort-by="id"
                loading="true"
                :search="search"
            >
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
                                    rounded
                                >
                                    {{ item.cuantity }}
                                </v-progress-linear>
                            </td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.location }}</td>
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
                    text: "Título",
                    value: "title",
                    align: "center",
                },
                {
                    text: "Autor",
                    value: "author",
                    align: "center",
                },
                {
                    text: "Cantidad",
                    value: "cuantity",
                    filterable: false,
                    align: "center",
                },
                {
                    text: "Género",
                    value: "gender",
                    filterable: false,
                    align: "center",
                },
                {
                    text: "Ubicación",
                    value: "location",
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
            users: [],
        };
    },
    async created() {
        const vm = this;
        vm.users = [
            {
                id: 1,
                title: "Civil Brand",
                author: "Ariella Rains",
                cuantity: 61,
                gender: "Drama",
                location: "F9-A4-42-52-D1-6C",
            },
            {
                id: 2,
                title: "Night Tide",
                author: "Vaughan Laird-Craig",
                cuantity: 15,
                gender: "Drama",
                location: "6A-C0-F6-24-70-C3",
            },
            {
                id: 3,
                title: "Sicily! (Sicilia!)",
                author: "Haleigh Chaldecott",
                cuantity: 31,
                gender: "Drama",
                location: "B1-E5-25-88-D3-36",
            },
            {
                id: 4,
                title: "Dinner Rush",
                author: "Meggy Elkins",
                cuantity: 38,
                gender: "Drama",
                location: "CE-B4-9E-60-A6-92",
            },
            {
                id: 5,
                title: "Stranger, The (Straniero, Lo)",
                author: "Quint Cheel",
                cuantity: 88,
                gender: "Drama",
                location: "35-7D-7D-61-7C-4A",
            },
            {
                id: 6,
                title: "Chameleon, The ",
                author: "Dev Baldoni",
                cuantity: 63,
                gender: "Drama",
                location: "DD-05-9C-38-DF-3A",
            },
            {
                id: 7,
                title: "Suburbia",
                author: "Issy Rimell",
                cuantity: 81,
                gender: "Drama",
                location: "17-C4-28-45-40-A5",
            },
            {
                id: 8,
                title: "Care Bears Movie, The",
                author: "Vita Logan",
                cuantity: 4,
                gender: "Animation|Children|Fantasy",
                location: "C3-4A-1F-4C-E3-1B",
            },
            {
                id: 9,
                title: "Amen",
                author: "Harlene Dronsfield",
                cuantity: 47,
                gender: "Drama|Musical",
                location: "34-5A-F6-02-F7-F7",
            },
            {
                id: 10,
                title: "Gatekeepers, The",
                author: "Tracey Anning",
                cuantity: 82,
                gender: "Documentary",
                location: "E7-B8-0E-65-21-3E",
            },
            {
                id: 11,
                title: "Sex & the Other Man",
                author: "Marquita O'Carrol",
                cuantity: 31,
                gender: "Comedy|Drama",
                location: "C0-BE-AE-A1-D7-AF",
            },
            {
                id: 12,
                title: "Dragon Gate Inn (Dragon Inn) (Long men kezhan)",
                author: "Zach O' Clovan",
                cuantity: 88,
                gender: "Action|Adventure",
                location: "C8-E3-D8-8D-9B-C1",
            },
            {
                id: 13,
                title: "Opening Night",
                author: "Maritsa Shortall",
                cuantity: 21,
                gender: "Drama",
                location: "FB-29-49-53-3C-55",
            },
            {
                id: 14,
                title: "McHale's Navy",
                author: "Thane Neising",
                cuantity: 4,
                gender: "Comedy|War",
                location: "95-92-9D-FA-4F-66",
            },
            {
                id: 15,
                title: "Jellyfish (Meduzot)",
                author: "Derby Reicherz",
                cuantity: 61,
                gender: "Drama",
                location: "15-D4-4E-AD-DB-33",
            },
            {
                id: 16,
                title: "Up Periscope",
                author: "Ida Issacson",
                cuantity: 47,
                gender: "Action|Drama|War",
                location: "DC-9E-C3-45-93-27",
            },
            {
                id: 17,
                title: "Candleshoe",
                author: "Peyton Doeg",
                cuantity: 79,
                gender: "Adventure|Children|Comedy",
                location: "61-1A-80-5F-9F-10",
            },
            {
                id: 18,
                title: "Lassie Come Home",
                author: "Elnore Boldecke",
                cuantity: 64,
                gender: "Adventure|Children|Drama",
                location: "6D-0F-0F-03-B7-46",
            },
            {
                id: 19,
                title: "Beverly Hills Chihuahua 2",
                author: "Carlita Herculson",
                cuantity: 51,
                gender: "Children|Comedy",
                location: "E0-18-9D-03-BC-FF",
            },
            {
                id: 20,
                title: "Waking Madison ",
                author: "Libbi Clemmen",
                cuantity: 53,
                gender: "Drama",
                location: "33-8F-98-13-71-D0",
            },
            {
                id: 21,
                title: "Beats Being Dead (Dreileben - Etwas Besseres als den Tod)",
                author: "Orlan Plain",
                cuantity: 9,
                gender: "Drama",
                location: "86-61-0D-49-7D-97",
            },
            {
                id: 22,
                title: "Professional, The (Le professionnel)",
                author: "Carolan Stobie",
                cuantity: 100,
                gender: "Action|Drama|Thriller",
                location: "F2-1A-52-DA-C3-FF",
            },
            {
                id: 23,
                title: "Grey Gardens",
                author: "Sherm Jammet",
                cuantity: 85,
                gender: "Drama",
                location: "15-8B-C3-EE-35-7A",
            },
            {
                id: 24,
                title: "Switch, The",
                author: "Talia McKall",
                cuantity: 89,
                gender: "Comedy|Romance",
                location: "8C-AE-AE-2D-EC-0D",
            },
            {
                id: 25,
                title: "Personal Best",
                author: "Minni Cluer",
                cuantity: 80,
                gender: "Drama",
                location: "CA-5D-21-16-50-DF",
            },
            {
                id: 26,
                title: "Primal",
                author: "Jordana Ponsford",
                cuantity: 92,
                gender: "Horror|Thriller",
                location: "4F-4D-88-D2-9D-FC",
            },
            {
                id: 27,
                title: "Sharpe's Sword",
                author: "Tedd Lampbrecht",
                cuantity: 48,
                gender: "Action|Adventure|War",
                location: "ED-02-73-50-D7-C6",
            },
            {
                id: 28,
                title: "Monsters University",
                author: "Noak Lanchester",
                cuantity: 45,
                gender: "Adventure|Animation|Comedy",
                location: "F1-A5-DE-80-BE-9D",
            },
            {
                id: 29,
                title: "Letter, The",
                author: "Dal Judgkins",
                cuantity: 14,
                gender: "Drama|Film-Noir",
                location: "30-BC-0A-3A-8C-85",
            },
            {
                id: 30,
                title: "Rio Bravo",
                author: "Rad Kermath",
                cuantity: 82,
                gender: "Western",
                location: "40-AB-54-19-25-C3",
            },
            {
                id: 31,
                title: "First Deadly Sin, The",
                author: "Tyrone Buffey",
                cuantity: 19,
                gender: "Thriller",
                location: "27-01-4A-30-98-53",
            },
            {
                id: 32,
                title: "Other Voices, Other Rooms",
                author: "Gay Alans",
                cuantity: 8,
                gender: "Drama",
                location: "9F-D7-84-4D-C9-B6",
            },
            {
                id: 33,
                title: "Nightfall",
                author: "Hunt Petersen",
                cuantity: 28,
                gender: "Crime|Drama|Film-Noir",
                location: "ED-1D-A4-B3-F3-C3",
            },
            {
                id: 34,
                title: "House on the Edge of the Park, The (Casa sperduta nel parco, La)",
                author: "Tildy Yukhnevich",
                cuantity: 56,
                gender: "Horror|Thriller",
                location: "F9-14-64-C8-F0-F3",
            },
            {
                id: 35,
                title: "Growth",
                author: "Wildon Splain",
                cuantity: 89,
                gender: "Sci-Fi|Thriller",
                location: "5B-5A-66-60-1B-A6",
            },
            {
                id: 36,
                title: "Waiting for Guffman",
                author: "Thedrick Tumilson",
                cuantity: 30,
                gender: "Comedy",
                location: "DA-E1-2A-0C-4B-A4",
            },
            {
                id: 37,
                title: "Love Hina Spring Special",
                author: "Willyt Gotliffe",
                cuantity: 55,
                gender: "Animation|Comedy|Musical|Romance",
                location: "F2-D0-FB-66-2F-48",
            },
            {
                id: 38,
                title: "Corner Gas: The Movie",
                author: "Sharon Blazdell",
                cuantity: 22,
                gender: "Comedy",
                location: "1F-07-D4-56-6F-CD",
            },
            {
                id: 39,
                title: "Chronos",
                author: "Meara Gregolotti",
                cuantity: 85,
                gender: "Documentary|IMAX",
                location: "B2-7B-B0-19-3C-84",
            },
            {
                id: 40,
                title: "Plot of Fear",
                author: "Julia Wilmott",
                cuantity: 2,
                gender: "Crime|Mystery|Thriller",
                location: "2B-51-CE-B8-25-89",
            },
            {
                id: 41,
                title: "Voyage to the Bottom of the Sea",
                author: "Romy Kubat",
                cuantity: 98,
                gender: "Adventure|Sci-Fi",
                location: "48-67-15-8F-70-4B",
            },
            {
                id: 42,
                title: "Fake It So Real",
                author: "Rayner Raun",
                cuantity: 29,
                gender: "Documentary",
                location: "57-46-01-9A-87-F0",
            },
            {
                id: 43,
                title: "Disappeared, The",
                author: "Bink Lamblin",
                cuantity: 58,
                gender: "Horror",
                location: "EB-BF-D6-F1-C5-6A",
            },
            {
                id: 44,
                title: "Big Stampede, The",
                author: "Garreth Douthwaite",
                cuantity: 4,
                gender: "Western",
                location: "0B-86-44-3E-52-01",
            },
            {
                id: 45,
                title: "Executioner, The (Massacre Mafia Style)",
                author: "Sophi Beevers",
                cuantity: 41,
                gender: "Crime|Drama|Thriller",
                location: "B4-B6-46-B6-1F-3A",
            },
            {
                id: 46,
                title: "Heart of a Lion (Leijonasydän)",
                author: "Orelee Pedrollo",
                cuantity: 68,
                gender: "Drama|Romance",
                location: "B1-90-A7-58-5F-2B",
            },
            {
                id: 47,
                title: "Let's Not Get Angry (Ne nous fâchons pas)",
                author: "Breanne Terrill",
                cuantity: 35,
                gender: "Comedy|Crime",
                location: "25-8F-08-20-1D-DA",
            },
            {
                id: 48,
                title: "My Dinner with André",
                author: "Melamie Cussins",
                cuantity: 94,
                gender: "Drama",
                location: "CD-E2-88-DE-99-A0",
            },
            {
                id: 49,
                title: "Outsourced",
                author: "Tami Keggin",
                cuantity: 92,
                gender: "Comedy|Romance",
                location: "CA-47-17-80-46-4E",
            },
            {
                id: 50,
                title: "Culture High, The",
                author: "Rayna Silliman",
                cuantity: 46,
                gender: "Documentary",
                location: "C9-99-E1-02-F1-35",
            },
            {
                id: 51,
                title: "Lewis Black: Stark Raving Black",
                author: "Olympe Sandeland",
                cuantity: 16,
                gender: "Comedy",
                location: "88-CD-D1-2E-A3-55",
            },
            {
                id: 52,
                title: "Lovers, The (Les Amants)",
                author: "Colet Saddington",
                cuantity: 22,
                gender: "Drama",
                location: "9C-81-C4-3E-F5-FB",
            },
            {
                id: 53,
                title: "In Vogue: The Editor?s Eye",
                author: "Sky Tyzack",
                cuantity: 7,
                gender: "Documentary",
                location: "AC-95-C9-F5-F0-84",
            },
            {
                id: 54,
                title: "Liar Liar",
                author: "Marc Feaver",
                cuantity: 2,
                gender: "Comedy",
                location: "50-6D-35-A4-C2-76",
            },
            {
                id: 55,
                title: "Hangman's House",
                author: "Bond Mowne",
                cuantity: 27,
                gender: "Drama",
                location: "72-AD-D3-CE-47-1C",
            },
            {
                id: 56,
                title: "Henry Fool",
                author: "Garner Labroue",
                cuantity: 75,
                gender: "Comedy|Drama",
                location: "5A-FE-BE-06-3F-37",
            },
            {
                id: 57,
                title: "Brats, The (Les gamins)",
                author: "Maribel MacEllen",
                cuantity: 80,
                gender: "Comedy",
                location: "CB-1D-1A-59-12-F8",
            },
            {
                id: 58,
                title: "Ms. 45 (a.k.a. Angel of Vengeance)",
                author: "Jourdan Duley",
                cuantity: 18,
                gender: "Crime|Drama",
                location: "7C-A4-33-D1-1B-60",
            },
            {
                id: 59,
                title: "That Night's Wife",
                author: "Northrop Ambrosetti",
                cuantity: 99,
                gender: "Drama",
                location: "92-60-B9-E7-8D-77",
            },
            {
                id: 60,
                title: "French Connection II",
                author: "Datha Mugg",
                cuantity: 22,
                gender: "Action|Crime|Drama|Thriller",
                location: "DB-87-DC-2B-C4-C9",
            },
            {
                id: 61,
                title: "Undefeated",
                author: "Marthena Attiwill",
                cuantity: 34,
                gender: "Documentary",
                location: "A8-96-07-81-B5-2C",
            },
            {
                id: 62,
                title: "Deliver Us From Evil",
                author: "Josepha Assiter",
                cuantity: 41,
                gender: "Crime|Drama",
                location: "EB-34-09-1B-C8-4A",
            },
            {
                id: 63,
                title: "Freshman, The",
                author: "Nahum Huthart",
                cuantity: 8,
                gender: "Comedy",
                location: "E4-13-B3-7E-BA-B3",
            },
            {
                id: 64,
                title: "Toy Story 2",
                author: "Corly Blastock",
                cuantity: 75,
                gender: "Adventure|Animation|Children|Comedy|Fantasy",
                location: "E5-CB-E0-5A-E9-E0",
            },
            {
                id: 65,
                title: "Skipped Parts",
                author: "Simmonds Beachem",
                cuantity: 45,
                gender: "Drama|Romance",
                location: "AD-17-35-F4-A0-2F",
            },
            {
                id: 66,
                title: "Beverly Hills Chihuahua 2",
                author: "Corrina Skegg",
                cuantity: 9,
                gender: "Children|Comedy",
                location: "A4-56-AF-53-1D-40",
            },
            {
                id: 67,
                title: "Happy Endings",
                author: "Eziechiele Woodhouse",
                cuantity: 60,
                gender: "Comedy|Drama",
                location: "66-15-40-51-4F-5D",
            },
            {
                id: 68,
                title: "Murder, He Says",
                author: "Mathew Jerram",
                cuantity: 23,
                gender: "Comedy",
                location: "B9-CA-B2-61-FC-53",
            },
            {
                id: 69,
                title: "20 Million Miles to Earth",
                author: "Adan Circuit",
                cuantity: 42,
                gender: "Sci-Fi",
                location: "E0-FF-AD-AF-2B-72",
            },
            {
                id: 70,
                title: "Story of the Late Chrysanthemums, The (Zangiku monogatari)",
                author: "Martita Letchmore",
                cuantity: 82,
                gender: "Drama",
                location: "85-48-3C-EB-ED-66",
            },
            {
                id: 71,
                title: "Stars Above",
                author: "Sholom Ambroise",
                cuantity: 54,
                gender: "(no genres listed)",
                location: "49-6F-FF-7F-F6-DC",
            },
            {
                id: 72,
                title: "Chill Out! (Descongélate!)",
                author: "Rickey Bucknell",
                cuantity: 48,
                gender: "Comedy|Drama",
                location: "53-3B-45-E7-15-9E",
            },
            {
                id: 73,
                title: "Hero at Large",
                author: "De witt Colley",
                cuantity: 75,
                gender: "Comedy",
                location: "BF-12-35-B5-6E-30",
            },
            {
                id: 74,
                title: "Rocaterrania",
                author: "Idelle Joy",
                cuantity: 78,
                gender: "Documentary|Fantasy",
                location: "5B-22-C8-1F-D6-DB",
            },
            {
                id: 75,
                title: "Hamlet (Gamlet)",
                author: "Bink Coady",
                cuantity: 73,
                gender: "Drama",
                location: "8D-4C-A6-FF-BE-B1",
            },
            {
                id: 76,
                title: "Wild at Heart",
                author: "Perrine Doreward",
                cuantity: 81,
                gender: "Crime|Drama|Mystery|Romance|Thriller",
                location: "77-87-38-AE-90-FB",
            },
            {
                id: 77,
                title: "Jönssonligan spelar högt",
                author: "Jacklin Vercruysse",
                cuantity: 15,
                gender: "Comedy",
                location: "08-B2-75-57-0E-B9",
            },
            {
                id: 78,
                title: "Next of Kin",
                author: "Katharina Eton",
                cuantity: 70,
                gender: "Comedy|Drama",
                location: "97-9F-C1-10-5A-9A",
            },
            {
                id: 79,
                title: "This Property is Condemned",
                author: "Basile Skipton",
                cuantity: 84,
                gender: "Drama|Romance",
                location: "50-80-46-3B-BC-0C",
            },
            {
                id: 80,
                title: "Somers Town",
                author: "Dot Erratt",
                cuantity: 20,
                gender: "Drama",
                location: "D7-EF-60-2D-91-0C",
            },
            {
                id: 81,
                title: "Get Low",
                author: "Tiphani Bushill",
                cuantity: 82,
                gender: "Comedy|Drama|Mystery",
                location: "E4-7E-A5-D3-2C-C1",
            },
            {
                id: 82,
                title: "20,000 Leagues Under the Sea",
                author: "Lexie Twomey",
                cuantity: 98,
                gender: "Adventure|Drama|Sci-Fi",
                location: "EE-84-78-50-F3-2A",
            },
            {
                id: 83,
                title: "Paddington",
                author: "Sydelle Anscott",
                cuantity: 4,
                gender: "Children|Comedy",
                location: "08-00-40-D9-C1-54",
            },
            {
                id: 84,
                title: "Blame (6 Films to Keep You Awake) (Películas para no dormir: La culpa)",
                author: "Glen Scruton",
                cuantity: 53,
                gender: "Drama|Horror|Mystery",
                location: "50-E9-16-91-3B-CE",
            },
            {
                id: 85,
                title: "Red Hill",
                author: "Creighton Nevitt",
                cuantity: 79,
                gender: "Crime|Thriller|Western",
                location: "88-53-4E-FD-88-D8",
            },
            {
                id: 86,
                title: "Grabbers",
                author: "Nicolina Izakovitz",
                cuantity: 59,
                gender: "Comedy|Horror|Sci-Fi",
                location: "69-0B-B5-48-13-36",
            },
            {
                id: 87,
                title: "L'homme qui rit",
                author: "Nehemiah Whieldon",
                cuantity: 12,
                gender: "Drama|Fantasy|Romance",
                location: "20-7B-70-21-A8-95",
            },
            {
                id: 88,
                title: "Station West",
                author: "Klara Stillmann",
                cuantity: 74,
                gender: "Action|Mystery|Romance|Western",
                location: "13-3E-C7-78-40-91",
            },
            {
                id: 89,
                title: "Public Housing",
                author: "Elna Marquand",
                cuantity: 22,
                gender: "Documentary",
                location: "0A-20-A2-C9-31-BB",
            },
            {
                id: 90,
                title: "Aloft",
                author: "Fernando Choulerton",
                cuantity: 13,
                gender: "Drama",
                location: "F8-3B-27-6D-A7-31",
            },
            {
                id: 91,
                title: "Bustin' Down the Door",
                author: "Cchaddie Batch",
                cuantity: 32,
                gender: "Documentary",
                location: "F6-8F-46-93-75-09",
            },
            {
                id: 92,
                title: "Krabat",
                author: "Galina McCrackem",
                cuantity: 46,
                gender: "Drama|Fantasy",
                location: "AB-FA-99-CF-3E-97",
            },
            {
                id: 93,
                title: "At Midnight I'll Take Your Soul (À Meia-Noite Levarei Sua Alma)",
                author: "Tommie Prout",
                cuantity: 19,
                gender: "Horror",
                location: "CF-87-1F-E5-75-3A",
            },
            {
                id: 94,
                title: "Frisk",
                author: "Mirabelle Bourges",
                cuantity: 53,
                gender: "Drama",
                location: "3F-FF-71-A4-EC-88",
            },
            {
                id: 95,
                title: "Intruder in the Dust",
                author: "Eadmund Eastcott",
                cuantity: 33,
                gender: "Drama",
                location: "E9-57-CC-41-B7-CE",
            },
            {
                id: 96,
                title: "Whole Wide World, The",
                author: "Jocelyne Poli",
                cuantity: 11,
                gender: "Drama",
                location: "5A-71-04-33-CE-CF",
            },
            {
                id: 97,
                title: "Harsh Times",
                author: "Garey Camoletto",
                cuantity: 75,
                gender: "Action|Crime|Drama",
                location: "40-9A-31-93-D3-6A",
            },
            {
                id: 98,
                title: "Dead End Drive-In",
                author: "Rolland Alelsandrowicz",
                cuantity: 72,
                gender: "Action|Drama|Horror|Sci-Fi|Thriller",
                location: "86-E1-7D-EE-2E-A6",
            },
            {
                id: 99,
                title: "Endangered Species",
                author: "Joelle Heinzler",
                cuantity: 32,
                gender: "Mystery|Sci-Fi|Thriller",
                location: "E3-F9-0C-FA-E0-27",
            },
            {
                id: 100,
                title: "Barbarians at the Gate",
                author: "Tonya Barritt",
                cuantity: 98,
                gender: "Drama",
                location: "16-70-AB-BC-65-D6",
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
