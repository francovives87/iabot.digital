<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon v-if="isAdminView" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title @click="goToRoute('Home')" style="cursor: pointer;">
      <img :src="logo" alt="iabot logo" class="logo" />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" @click="goToRoute('Login')" color="white" text>
      <v-icon left>mdi-login</v-icon>
      Ingresar/Registrarse
    </v-btn>
    <template v-else>
      <v-btn v-if="!isAdminView" icon @click="goToRoute('AdminDashboard')" color="white" text>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn color="white" text>
        <v-icon left>mdi-account</v-icon>
        {{ email }}
      </v-btn>
      <v-btn @click="handleLogout" color="white" text>
        <v-icon left>mdi-logout</v-icon>
        Salir
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    isAdminView: Boolean
  },
  data() {
    return {
      logo: require('@/assets/images/iabot_logo.png')
    };
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'email'])
  },
  methods: {
    ...mapActions('user', ['deauthenticateUser']),
    goToRoute(route) {
      this.$router.push({ name: route });
    },
    handleLogout() {
      this.deauthenticateUser();
      this.$router.push({ name: 'Home' });
    },
    toggleDrawer() {
      this.$emit('toggle-drawer');
    }
  }
};
</script>

<style scoped>
.logo {
  height: 50px; /* Ajusta el tamaño según sea necesario */
}
.v-toolbar-title {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
