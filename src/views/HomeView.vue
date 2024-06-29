<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Bienvenido a la Página de Inicio</h1>
        <div v-if="!isAuthenticated">
          <p>Por favor, <router-link to="/login">inicia sesión</router-link> para continuar.</p>
        </div>
        <div v-else>
          <p>Estás autenticado. ¡Bienvenido!</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('access_token');
    }
  }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para HomeView */
</style>
