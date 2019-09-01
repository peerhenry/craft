import inventory from '@s/modules/inventory.js'
import recipes from '@s/modules/recipes.js'
import activity from '@s/modules/activity.js'
import character from '@s/modules/character.js'

export default {
  modules: {
    inventory,
    recipes,
    activity,
    character,
  },
  getters: {
    recipes: (_s, _g, rootState) => rootState.recipes,
  },
}
