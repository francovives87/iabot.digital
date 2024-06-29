import { createStore } from 'vuex';
import user from './modules/user';
import tienda from './modules/tienda';

export default createStore({
  modules: {
    user,
    tienda
  }
});
