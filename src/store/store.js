import Vue from 'vue'
import Vuex from 'vuex'
import inventory from '@s/modules/inventory.js'
import recipes from '@s/modules/recipes.js'
import activity from '@s/modules/activity.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    inventory,
    recipes,
    activity,
  },
  getters: {
    recipes: (_s, _g, rootState) => rootState.recipes,
  },
})
