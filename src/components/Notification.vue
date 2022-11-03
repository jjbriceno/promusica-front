<template>
  <div>
    <v-alert outlined type="red" text :value="alert">
      Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula
      eget dolor. Praesent ac massa at ligula laoreet iaculis. Vestibulum
      ullamcorper mauris at ligula.
    </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    alert: {
      type: Boolean,
    },
  },
  data: () => ({}),
  mounted: () => ({}),
};
</script>
