<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" depressed large color="deep-purple darken-3">
        <v-list-item two-line dense>
          <v-badge
            bordered
            bottom
            color="success"
            dot
            offset-x="10"
            offset-y="10">
            <v-avatar size="40">
              <v-img
                src="https://d1r8m46oob3o9u.cloudfront.net/images/home-page-examples/01.jpg"></v-img>
            </v-avatar>
          </v-badge>
          <v-list-item-content>
            <v-list-item-title
              v-text="$store.state.user.email"></v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="invokeMethod(item.action)">
            <v-list-item-title v-text="item.text"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        icon: 'mdi-account-box',
        text: 'Editar perfil',
        action: '',
      },
      {
        icon: 'mdi-logout-variant',
        text: 'Cerrar sesión',
        action: 'logout',
      },
    ],
  }),
  methods: {
    invokeMethod(name) {
      const vm = this;
      vm[name]();
    },
    logout() {
      const vm = this;
      vm.$store.dispatch('logout');
      vm.$router.push('/');
    },
  },
};
</script>
