import inventory from '@s/modules/inventory.js'
import recipes from '@s/modules/recipes.js'
import activity from '@s/modules/activity.js'

export default {
  modules: {
    inventory,
    recipes,
    activity,
  },
  getters: {
    recipes: (_s, _g, rootState) => rootState.recipes,
  },
}
