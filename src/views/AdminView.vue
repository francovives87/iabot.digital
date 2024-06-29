<template>
  <v-container>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AdminView',
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters('tienda', ['tienda'])
  },
  methods: {
    ...mapActions('tienda', ['setTienda']),
  
  },
  async mounted() {
  }
};
</script>

<style scoped>
/* Aquí puedes agregar los estilos de AdminView */
</style>
