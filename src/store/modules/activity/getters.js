import gatherables from '@/settings/gatherables.js'
import {
  GATHERING,
  CRAFTING,
  IDLE,
} from '@s/modules/activity/activity-types.js'

const getters = {
  status: state => {
    if (state.currentActivity.type === IDLE) return 'idle'
    return `${state.currentActivity.type} ${state.currentActivity.subject}`
  },
  isGathering: state => gatherable =>
    state.currentActivity.type === GATHERING &&
    state.currentActivity.subject === gatherable,
  isCraftingRecipe: state => recipeKey =>
    state.currentActivity.type === CRAFTING &&
    state.currentActivity.subject === recipeKey,
  isCrafting: state => state.currentActivity.type === CRAFTING,
  gatherTimeMs: () => item => gatherables[item].durationSeconds * 1000,
  craftProgress: state => state.craftProgress,
  craftProgressPercent: state => state.craftProgress,
  canCraft: (_s, _g, rootState) => item => {
    const recipe = rootState.recipes[item]
    if (!recipe) return false
    for (const [invItem, itemCost] of Object.entries(recipe.cost)) {
      const hasReq = rootState.inventory[invItem] >= itemCost
      if (!hasReq) return false
    }
    return true
  },
  craftingIsPaused: state => {
    return state.craftQueue.length && state.currentActivity.type !== CRAFTING
  },
}

export default getters
