export default {
  namespaced: true,
  state: {
    nourishment: 15,
  },
  getters: {
    nourishment: state => state.nourishment,
  },
  mutations: {
    ADD_NOURISHMENT(state, payload) {
      state.nourishment += payload
      if (state.nourishment > 100) state.nourishment = 100
      else if (state.nourishment < 0) state.nourishment = 0
    },
  },
}
