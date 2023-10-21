<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-form>
          <v-card elevation="6">
            <v-toolbar color="deep-purple darken-3" dark>
              <v-row>
                <v-col cols="12" align="center">
                  <v-list-item-title class="white--text text-h6">
                    Bienvenido
                  </v-list-item-title>
                </v-col>
              </v-row>
            </v-toolbar>
            <v-card-text class="mt-6">
              <v-text-field placeholder="Email" outlined prepend-icon="mdi-account" name="email" label="Email"
                :rules="[rules.required, rules.email]" id="email" type="text" v-model="form.email"></v-text-field>
              <v-text-field maxlength="8" placeholder="Contraseña" outlined prepend-icon="mdi-lock" name="password"
                label="Contraseña" id="password" hint="La contraseña debe contener al menos 8 caracteres"
                :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" counter
                :error-messages="errors" v-model="form.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "></v-text-field>
            </v-card-text>
            <v-card-actions fill-height>
              <v-row class="pb-4">
                <v-col align="center" cols="12">
                  <v-btn color="primary" @click="login">Iniciar Sesión</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Login',
  data: () => ({
    showPassword: false,
    form: {
      email: '',
      password: '',
    },
    rules: {
      required: (value) => !!value || 'Requerido',
      counter: (value) => value.length <= 20 || 'Max 20 characters',
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'E-mail inválido';
      },
    },
    errors: '',
  }),
  methods: {
    async login() {
      const vm = this;
      try {
        await vm.$store.dispatch('login', this.form);
        vm.$router.push('dashboard');
      } catch (error) {
        vm.errors = error.response.data.errors.email[0];
        console.log(error.response.status, error.response.data.errors);
      }
    },
  },
};
</script>
