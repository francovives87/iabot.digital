<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="4">
        <v-card>
          <v-card-title>
            <span class="headline">Iniciar Sesión</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                label="Correo Electrónico"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!valid" @click="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { login as userLogin } from '@/services/user.service';
import { useToast } from 'vue-toastification';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
    };
  },
  methods: {
    ...mapActions('user', ['authenticateUser']),
    async handleLogin() {
      const toast = useToast();
      try {
        const data = await userLogin(this.email, this.password);
        this.authenticateUser({
          username: data.username,
          email: data.email,
          id: data.credentials.cod_ref
        });
        this.$router.push({ name: 'AdminDashboard' }); // Cambiado a AdminDashboard
        toast.success('Login exitoso');
      } catch (error) {
        console.error('Error en el login:', error);
        toast.error('Login fallido. Por favor, verifica tus credenciales.');
      }
    },
  },
};
</script>

<style scoped>
.headline {
  text-align: center;
  width: 100%;
}
</style>
