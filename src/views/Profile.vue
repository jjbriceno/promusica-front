<template>
  <v-container>
    <v-card dark elevation="8" color="#4c4e7e">
      <v-card-title class="headline">
        {{ $store.state.user.name }}
      </v-card-title>
      <hr color="white" />

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
              <v-btn type="submit" color="primary">Guardar</v-btn>
              <v-btn dark color="red" @click="clear">Limpiar</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      },
    };
  },
  // props: {
  //   user: {
  //     type: Object,
  //     required: true,
  //   },
  // },
};
</script>
