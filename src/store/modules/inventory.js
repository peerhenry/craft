import Vue from 'vue'
import Vuex from 'vuex'
import { ADD_ITEM } from '@s/mutation-types.js'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {},
  mutations: {
    [ADD_ITEM](state, payload) {
      if (!state[payload.item]) Vue.set(state, payload.item, 0)
      state[payload.item] += payload.amount || 1
    },
  },
}
