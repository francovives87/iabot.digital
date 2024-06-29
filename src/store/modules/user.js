const state = {
  isAuthenticated: false,
  username: '',
  email: '',
  id: ''
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  username: state => state.username,
  email: state => state.email,
  id: state => state.id
};

const mutations = {
  setAuthentication(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setUserData(state, userData) {
    state.username = userData.username;
    state.email = userData.email;
    state.id = userData.id;
  },
  clearUserData(state) {
    state.username = '';
    state.email = '';
    state.id = '';
  }
};

const actions = {
  authenticateUser({ commit }, userData) {
    commit('setAuthentication', true);
    commit('setUserData', userData);
  },
  deauthenticateUser({ commit }) {
    commit('setAuthentication', false);
    commit('clearUserData');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
