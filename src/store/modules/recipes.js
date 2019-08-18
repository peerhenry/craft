import Vue from 'vue'
import { ADD_RECIPE } from '@s/mutation-types.js'
import recipes from '@/settings/recipes.js'

export default {
  namespaced: true,
  state: recipes,
  mutations: {
    [ADD_RECIPE](state, payload) {
      if (!state[payload.name]) Vue.set(state, payload.name, payload.recipe)
    },
  },
}
