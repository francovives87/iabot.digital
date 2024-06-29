const state = {
    tienda: null
  };
  
  const getters = {
    tienda: state => state.tienda
  };
  
  const mutations = {
    setTienda(state, tienda) {
      state.tienda = tienda;
    },
    clearTienda(state) {
      state.tienda = null;
    }
  };
  
  const actions = {
    setTienda({ commit }, tienda) {
      commit('setTienda', tienda);
    },
    clearTienda({ commit }) {
      commit('clearTienda');
    }
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };
  