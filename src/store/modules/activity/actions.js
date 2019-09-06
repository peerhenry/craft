import gatherables from '@/settings/gatherables.js'
import { GATHERING, CRAFTING } from '@s/modules/activity/activity-types.js'
import * as helpers from '@s/modules/activity/helpers'
import recipes from '@/settings/recipes.js'

const actions = {
  enqueueCraft: (c, recipeKey) => {
    c.commit('ENQUEUE_CRAFT', recipeKey)
    const recipe = recipes[recipeKey]
    helpers.subtractCost(c.commit, recipe)
    if (!c.getters.isCrafting) c.dispatch('craftNextInQueue')
  },
  craftNextInQueue: c => {
    c.commit('RESET_CRAFT_PROGRESS')
    c.commit('SET_IDLE')
    if (c.state.craftQueue.length === 0) {
      return
    }
    const recipeKey = c.state.craftQueue[0]
    c.dispatch('craft', recipeKey)
  },
  craft: async (c, recipeKey) => {
    await c.dispatch('stop') // other actions must be stopped
    const recipe = recipes[recipeKey]
    c.commit('SET_CURRENT_ACTIVITY', {
      type: CRAFTING,
      subject: recipeKey,
    })
    helpers.setCraftTimeoutAndInterval(c, recipe)
  },
  startGathering: (context, gatherableKey) => {
    context.dispatch('stop') // other actions must be stopped
    context.dispatch('gather', gatherableKey)
  },
  gather: (context, gatherableKey) => {
    context.commit('SET_CURRENT_ACTIVITY', {
      type: GATHERING,
      subject: gatherableKey,
    })
    helpers.setGatherTimeout(
      context,
      gatherableKey,
      gatherables[gatherableKey].amount
    )
  },
  stop: context => {
    context.commit('SET_IDLE')
    helpers.clearTimeoutAndInterval(context)
  },
  cancelCraft: (context, index) => {
    const recipeKey = context.state.craftQueue[index]
    const recipe = recipes[recipeKey]
    helpers.refundCost(context.commit, recipe)
    context.commit('QUEUE_REMOVE_CRAFT', index)
    if (index === 0) {
      context.dispatch('craftNextInQueue')
      helpers.clearTimeoutAndInterval(context)
    }
  },
  resumeCraft: ctx => {
    ctx.dispatch('stop')
    if (ctx.state.craftQueue.length === 0) {
      return
    }
    const recipeKey = ctx.state.craftQueue[0]
    const recipe = recipes[recipeKey]
    ctx.commit('SET_CURRENT_ACTIVITY', {
      type: CRAFTING,
      subject: recipeKey,
    })
    helpers.setCraftTimeoutAndInterval(ctx, recipe)
  },
}

export default actions
