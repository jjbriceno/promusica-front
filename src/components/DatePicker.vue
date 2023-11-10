<template>
  <v-container>
    <v-row>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
        max-width="auto" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field :error-messages="dateError" v-model="computedDateFormatted" label="Fecha de entrega"
            persistent-hint outlined readonly v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-date-picker :min="currentDate" v-model="date" no-title @input="menu = false">
        </v-date-picker>
      </v-menu>
    </v-row>
  </v-container>
</template>
<script>
export default {
  emits: ['selectedDate'],
  name: 'DatePicker',
  props: {
    dateError: {
      type: String,
      default: '',
      required: false
    }
  },
  data: (vm) => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10)
    ),
    menu: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    currentDate() {
      return new Date().toISOString().slice(0, 10);
    },
  },
  mounted() {
    this.$emit('selectedDate', this.date);
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit('selectedDate', this.date);
    },
  },

  value: {
    immediate: true,
    deep: true,
    handler(newValue) {
      this.date = newValue;
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    },
  },
};
</script>
