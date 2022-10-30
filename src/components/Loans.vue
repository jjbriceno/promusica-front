<template>
    <v-container>
        <v-card class="rounded-xl">
            <v-card-title
                primary-title
                class="font-weight-black primary--text text-subtitle-1 text-uppercase"
            >
                Préstamos
                <v-spacer></v-spacer>
                <v-btn color="success" fab small @click="dialog = !dialog">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle> Realizar un préstamo </v-card-subtitle>
            <hr style="color: #4527a0" />
            <v-card-text>
                <v-form v-model="valid">
                    <v-container>
                        <h4>Prestado a:</h4>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="firstname"
                                    :rules="nameRules"
                                    :counter="10"
                                    label="Nombre"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="lastname"
                                    :rules="nameRules"
                                    :counter="10"
                                    label="Apellido"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Dirección"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Télefono"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <h4>Partitura:</h4>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select
                                    :items="music_sheet"
                                    v-model="music_sheet_id"
                                    label="Seleccione..."
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    name="cuantity"
                                    label="Cantidad"
                                    id="id"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {};
</script>

<style></style>
