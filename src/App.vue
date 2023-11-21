<template>
  <v-app style="background-color: #393c5f">
    <Drawer v-if="$store.state.user.auth" />
    <v-app-bar dark color="#30314f" app>
      <v-app-bar-nav-icon>
        <v-icon>mdi-account-school</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-black">
        <div>Fundación Promúsica</div>
        <h5>Coro de Niños y Jovenes de la Universidad de los Andes</h5>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <UserMenu v-if="$store.state.user.auth" />
    </v-app-bar>

    <v-main>
      <!-- <v-snackbar
        color="success"
        top
        timeout="2500"
        v-model="snackbar"
        class="mt-16"
      >
        <span class="d-flex align-center white--text">
          <v-icon class="mr-2">mdi-bell</v-icon>
          <span>{{ " Registro guardado con exito " }}</span>
        </span>
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            x
          </v-btn>
        </template>
      </v-snackbar> -->
      <v-snackbar
        v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
        :key="snackbar.text + Math.random()"
        v-model="snackbar.showing"
        :timeout="1500"
        top
        :color="snackbar.color"
        :style="`bottom: ${index * 60 + 8}px`"
      >
        <span class="d-flex align-center white--text">
          <v-icon class="mr-2">mdi-bell</v-icon>
          <span>{{ snackbar.text }}</span>
        </span>
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar.showing = false"
          >
            x
          </v-btn>
        </template>
      </v-snackbar>

      <v-container fluid fill-height>
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-main>
    <!-- Add the footer here -->
    <v-footer color="#30314f">
      <v-spacer></v-spacer>
      <div class="text-center white--text">&copy; 2023 Your Company Name</div>
    </v-footer>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer.vue";
import UserMenu from "./components/UserMenu.vue";
import { mapState } from "vuex";

export default {
  components: {
    Drawer,
    UserMenu,
  },
  computed: {
    ...mapState(["snackbars"]),
  },
  data() {
    return {};
  },
};
</script>
