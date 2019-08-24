import Vue from 'vue'
import { ADD_ITEM } from '@s/mutation-types.js'

export default {
  namespaced: true,
  state: {
    wood: 5,
  },
  mutations: {
    [ADD_ITEM](state, payload) {
      if (!state[payload.item]) Vue.set(state, payload.item, 0) // add reactive item if it doesnt exit yet
      state[payload.item] += payload.amount || 1
      if (state[payload.item] === 0) Vue.delete(state, payload.item) // remove reactive item if count drops to zero
    },
  },
}
