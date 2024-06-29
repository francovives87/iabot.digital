<template>
  <v-app>
    <AppBar
      :isAdminView="isAdminView"
      @logout="handleLogout"
      @toggle-drawer="toggleDrawer"
    />
    <AppDrawer
      :isAdminView="isAdminView"
      :drawer="drawer"
      @update:drawer="drawer = $event"
    />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { logout as userLogout, refreshToken } from '@/services/user.service';
import AppBar from './components/base/AppBar.vue';
import AppDrawer from './components/base/AppDrawer.vue';
import { fetchTienda } from '@/services/tienda.service';


export default {
  name: 'App',
  components: {
    AppBar,
    AppDrawer
  },
  data() {
    return {
      drawer: false,
      refreshTokenInterval: null,
    };
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'username', 'email', 'id']),
    ...mapGetters('tienda', ['tienda']),
    isAdminView() {
      return this.$route.matched.some(record => record.meta.requiresAuth);
    },
  },
  methods: {
    ...mapActions('user', ['authenticateUser', 'deauthenticateUser']),
    ...mapActions('tienda', ['setTienda']),

    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async handleLogout() {
      await userLogout();
      this.deauthenticateUser();
      this.$router.push({ name: 'Home' });
      this.clearRefreshTokenInterval();
    },
    async loadTienda() {
      try {
        const tiendaData = await fetchTienda();
        this.setTienda(tiendaData);
      } catch (error) {
        console.error('Error al obtener los datos de la tienda:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar una notificación
      }
    },
    async initializeUser() {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          await refreshToken(); // Refresca el token antes de cualquier acción
          const userData = {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            id: localStorage.getItem('id')
          };
          this.authenticateUser(userData);
          this.startRefreshTokenInterval(); // Iniciar la renovación del token
          await this.loadTienda();

        } catch (error) {
          console.error('Error al renovar el token:', error);
          // Si hay un error, asegurarse de que el usuario esté desautenticado
          this.deauthenticateUser();
        }
      }
    },
    updateDrawer() {
      this.drawer = this.isLargeScreen && this.isAdminView;
    },
    onResize() {
      // Restablecer el estado del drawer cuando se cambia el tamaño de la ventana
      this.drawer = false;
      this.updateDrawer();
    },
    startRefreshTokenInterval() {
      this.refreshTokenInterval = setInterval(async () => {
        try {
          await refreshToken();
        } catch (error) {
          console.error('Error al renovar el token:', error);
          // Si hay un error, asegurarse de que el usuario esté desautenticado
          this.deauthenticateUser();
        }
      }, 15 * 60 * 1000); // Renueva el token cada 15 minutos
    },
    clearRefreshTokenInterval() {
      if (this.refreshTokenInterval) {
        clearInterval(this.refreshTokenInterval);
        this.refreshTokenInterval = null;
      }
    }
  },
  async mounted() {
    window.addEventListener('resize', this.onResize);
    this.updateDrawer();
    await this.initializeUser();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.clearRefreshTokenInterval();
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  max-width: 300px;
}
</style>
