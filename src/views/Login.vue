<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-form>
          <v-card>
            <v-toolbar color="primary" dark> Login </v-toolbar>
            <v-card-text>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="text"
                v-model="form.email"></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="form.password"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="login">Login</v-btn>
              <v-btn color="primary">Cancel</v-btn>
              <v-btn color="red" dark @click="logout">Logout</v-btn>
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
    form: {
      email: 'ruecker.shanna@example.net',
      password: 'password',
    },
  }),
  methods: {
    async logout() {},
    async login() {
      await this.$store.dispatch('login', this.form);
    },
  },
};
</script>
