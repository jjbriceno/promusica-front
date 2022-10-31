<template>
  <v-app>
    <Drawer v-if="$store.state.auth" />
    <v-app-bar dark color="deep-purple darken-3" app>
      <v-app-bar-nav-icon>
        <v-icon>mdi-account-school</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-black">
        <div>Universidad de los Andes</div>
        <h5>Facultad de Arte</h5>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <UserMenu v-if="$store.state.auth" />
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from './components/Drawer.vue';
import UserMenu from './components/UserMenu.vue';
export default {
  components: {
    Drawer,
    UserMenu,
  },
  data() {
    return {};
  },
};
</script>

<style>
.gradient {
  background: linear-gradient(
    180deg,
    rgba(69, 39, 160, 1) 37%,
    rgba(126, 87, 194, 1) 100%
  );
}
</style>
