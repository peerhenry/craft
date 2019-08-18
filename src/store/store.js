import Vue from 'vue'
import Vuex from 'vuex'
import inventory from '@s/modules/inventory.js'
import recipes from '@s/modules/recipes.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    inventory,
    recipes,
  },
  getters: {
    canCraft: state => item => {
      const recipe = state.recipes[item]
      if (!recipe) return false
      for (const [invItem, itemCost] of Object.entries(recipe.cost)) {
        const hasReq = state.inventory[invItem] >= itemCost
        if (!hasReq) return false
      }
      return true
    },
  },
})
