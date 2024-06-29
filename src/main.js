import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Asegúrate de importar el store
import vuetify from './plugins/vuetify'; // Asegúrate de importar Vuetify
import { loadFonts } from './plugins/webfontloader';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'vue-cal/dist/vuecal.css';



loadFonts();

const app = createApp(App);

app.use(router);
app.use(store); // Asegúrate de usar el store
app.use(vuetify); // Asegúrate de usar Vuetify
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
});

app.mount('#app');
