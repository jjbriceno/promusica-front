<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card dark elevation="6" color="#30314f">
          <v-toolbar color="#4c4e7e" dark>
            <v-row>
              <v-col cols="12" align="center">
                <v-list-item-title class="white--text text-h6 text-uppercase">
                  Bienvenido
                </v-list-item-title>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-card-text class="mt-6">
            <v-form @submit.prevent="login" ref="loginForm">
              <v-text-field :error-messages="emailError" placeholder="Email" outlined prepend-icon="mdi-account"
                name="email" label="Email" :rules="[rules.required, rules.email]" id="email" type="text"
                v-model="form.email"></v-text-field>
              <v-text-field :error-messages="passwordError" maxlength="8" placeholder="Contraseña" outlined
                prepend-icon="mdi-lock" name="password" label="Contraseña" id="password"
                hint="La contraseña debe contener al menos 8 caracteres" :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword" counter v-model="form.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "></v-text-field>
              <v-row justify="center">
                <v-col cols="12">
                  <v-btn type="submit" block x-large color="#4c4e7e">Iniciar Sesión</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
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
      email: 'bricenoj9@gmail.com',
      password: 'password',
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
    errors: {
      email: [],
      password: [],
    },
  }),
  methods: {
    async login() {
      const vm = this;
      try {
        await vm.$store.dispatch('login', this.form);

      } catch (error) {
        vm.errors = error.response.data.errors;
        console.log(error);
      }
    },
  },
  computed: {
    emailError() {
      const vm = this;
      return vm.errors ? (("email" in vm.errors) ? vm.errors.email[0] : '') : '';
    },
    passwordError() {
      const vm = this;
      return vm.errors ? (("password" in vm.errors) ? vm.errors.password[0] : '') : '';
    }
  },
  watch: {
    'form.email': function (newVal, oldVal) {
      const vm = this;
      vm.errors.password && (vm.errors.password = []);
      vm.errors.email = [];
    },
    'form.password': function (newVal, oldVal) {
      const vm = this;
      vm.errors.email && (vm.errors.email = []);
      vm.errors.password = [];
    }
  }
};
</script>
