export default {
  namespaced: true,
  state: {
    nourishment: 15,
    xp: 0,
  },
  getters: {
    nourishment: state => state.nourishment,
    xp: state => state.xp,
  },
  mutations: {
    ADD_NOURISHMENT(state, payload) {
      state.nourishment += payload
      if (state.nourishment > 100) state.nourishment = 100
      else if (state.nourishment < 0) state.nourishment = 0
    },
    ADD_XP(state, points) {
      state.xp += points
    },
  },
}
