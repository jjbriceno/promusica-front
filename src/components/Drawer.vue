<template>
  <v-navigation-drawer app style="background-color: #30314f;">
    <v-list two-line rounded>
      <v-divider style="border-color: white"></v-divider>
      <v-list-item>
        <v-list-item-avatar size="200">
          <v-img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
            alt="user picture"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item-group>
        <v-divider style="border-color: white"></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="white--text text-h6">
              {{ $store.state.user.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="white--text py-2">
              {{ $store.state.user.email }}
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
            <v-list-item-title class="white--text" v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider style="border-color: white"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'Drawer',
  data() {
    return {
      selectedItem: 0,
      items: [
        { text: 'Partituras', icon: 'mdi-music-clef-treble', to: '/dashboard' },
        { text: 'Autores', icon: 'mdi-lead-pencil', to: '/authors' },
        { text: 'Géneros Musicales', icon: 'mdi-folder', to: '/genders' },
        { text: 'Prestatarios', icon: 'mdi-account-clock', to: '/borrowers' },
        { text: 'Préstamos', icon: 'mdi-timetable', to: '/loans' },
      ],
    };
  },
};
</script>

<style>
.gradient {
  background: linear-gradient(180deg,
      rgba(69, 39, 160, 1) 37%,
      rgba(126, 87, 194, 1) 100%);
}
</style>
