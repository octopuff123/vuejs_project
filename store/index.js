import { createStore } from 'vuex';

export default createStore({
  state: {
    cpid:'',
    username: '',
    password: '',
    token: '',
  },
  mutations: {
    setCredentials(state, { cpid, username, password, token }) {
        state.cpid = cpid;
      state.username = username;
      state.password = password;
      state.token = token;
    },
  },
  actions: {
    setCredentials({ commit }, { cpid, username, password, token }) {
      commit('setCredentials', { cpid, username, password, token });
    },
  },
  getters: {
    CompanyID: (state) => state.cpid,
    Username: (state) => state.username,
    Password: (state) => state.password,
    Token: (state) => state.token,
  },
});
