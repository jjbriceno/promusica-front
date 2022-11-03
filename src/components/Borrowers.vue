<template>
  <v-container>
    <v-card class="rounded-xl">
      <v-card-title
        primary-title
        class="font-weight-black primary--text text-subtitle-1 text-uppercase">
        Prestatario
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle> Registrar nuevo prestatario </v-card-subtitle>
      <hr style="color: #4527a0" />
      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.firstName"
                  :counter="10"
                  label="Nombre"
                  placeholder="Nombre"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.lastName"
                  :counter="10"
                  label="Apellido"
                  placeholder="Apellido"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.email"
                  label="E-mail (Opcional)"
                  placeholder="E-mail"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.phone"
                  label="Télefono"
                  counter="11"
                  placeholder="Télefono"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="form.address"
                  label="Dirección (Opcional)"
                  counter="50"
                  placeholder="Dirección (Opcional)"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn type="submit" color="primary">Guardar</v-btn>
              <v-btn type="submit" dark color="red">Limpiar</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {},
  }),
  methods: {
    async submit() {
      const vm = this;
      let response = await axios.post('api/borrowers/store', { ...vm.form });
      vm.$refs.form.reset();
      console.log(response.data);
    },
  },
};
</script>

<style></style>
