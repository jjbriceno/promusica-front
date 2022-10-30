<template>
  <v-app>
      <v-navigation-drawer
          app
          style="background: linear-gradient(180deg, rgba(69, 39, 160, 1) 37%, rgba(126, 87, 194, 1) 100%);">
          <v-list two-line rounded>
              <v-divider style="border-color: white"></v-divider>
              <v-list-item>
                  <v-list-item-avatar size="200">
                      <v-img
                          src="https://d1r8m46oob3o9u.cloudfront.net/images/home-page-examples/01.jpg"
                          alt="user picture"
                      ></v-img>
                  </v-list-item-avatar>
              </v-list-item>
              <v-list-item-group>
                  <v-divider style="border-color: white"></v-divider>
                  <v-list-item>
                      <v-list-item-content>
                          <v-list-item-title class="white--text text-h6">
                              José Briceño
                          </v-list-item-title>
                          <v-list-item-subtitle class="white--text py-2">
                              bricenoj9@gmail.com
                          </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-icon right large color="amber accent-2" class="mr-2">mdi-shield-crown-outline</v-icon>
                  </v-list-item>
              </v-list-item-group>
          <v-divider style="border-color: white"></v-divider>
          </v-list>
          <v-list nav dense rounded>
              <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
                      <v-list-item-icon>
                          <v-icon v-text="item.icon" class="white--text"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                          <v-list-item-title class="white--text"
                              v-text="item.text"
                          ></v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-item-group>
              <v-divider style="border-color: white"></v-divider>
          </v-list>
          
      </v-navigation-drawer>
      <v-app-bar dark color="deep-purple darken-3" app>
          <v-app-bar-nav-icon>
              <v-icon>mdi-account-school</v-icon>
          </v-app-bar-nav-icon>
          <v-app-bar-title class="font-weight-black">
              Universidad de los Andes
              <h6>Facultad de Arte</h6>
          </v-app-bar-title>
      </v-app-bar>
      <v-main>
          <v-container fluid fill-height>
              <router-view></router-view>
          </v-container>
      </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
      return {
          selectedItem: 0,
          items: [
              { text: "Autores", icon: "mdi-account-multiple", to:"/authors"},
              { text: "Géneros Musicales", icon: "mdi-folder", to:"/genders"},
              { text: "Partituras", icon: "mdi-music-clef-treble", to:"/dashboard"},
              { text: "Prestamos", icon: "mdi-timetable", to:"/loans"},
          ],
      };
  },
};
</script>

<style></style>
