import Vue from 'vue'
import { ADD_ITEM } from '@s/mutation-types.js'

export default {
  namespaced: true,
  state: {
    wood: 5,
  },
  mutations: {
    [ADD_ITEM](state, payload) {
      if (!state[payload.item]) Vue.set(state, payload.item, 0)
      state[payload.item] += payload.amount || 1
    },
  },
}
