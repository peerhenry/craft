import Vue from 'vue'
import gatherables from '@/settings/gatherables.js'
import {
  GATHERING,
  CRAFTING,
  IDLE,
  idleActivity,
} from '@s/modules/activity/activity-types.js'
import * as helpers from '@s/modules/activity/helpers'

export const state = {
  craftQueue: [],
  currentActivity: idleActivity,
  craftProgress: 0,
  interval: null,
  timeout: null,
}

export const getters = {
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
  canCraft: (_s, _g, rootState) => item => {
    const recipe = rootState.recipes[item]
    if (!recipe) return false
    for (const [invItem, itemCost] of Object.entries(recipe.cost)) {
      const hasReq = rootState.inventory[invItem] >= itemCost
      if (!hasReq) return false
    }
    return true
  },
}

export const mutations = {
  SET_CURRENT_ACTIVITY: (state, activity) =>
    Vue.set(state, 'currentActivity', activity),
  SET_INTERVAL: (state, interval) => (state.interval = interval),
  SET_TIMEOUT: (state, timeout) => (state.timeout = timeout),
  SET_CRAFT_PROGRESS: (state, progress) => (state.craftProgress = progress),
  ENQUEUE_CRAFT: (state, recipe) => {
    state.craftQueue.push(recipe)
  },
  DEQUEUE_CRAFT: state => state.craftQueue.shift(),
}

export const actions = {
  enqueueCraft: (c, recipeKey) => {
    c.commit('ENQUEUE_CRAFT', recipeKey)
    const recipe = c.rootGetters['recipes/recipe'](recipeKey)
    helpers.subtractCost(c.commit, recipe)
    if (!c.getters.isCrafting) c.dispatch('craftNextInQueue')
  },
  craftNextInQueue: c => {
    if (c.state.craftQueue.length === 0) return
    const recipeKey = c.state.craftQueue[0]
    c.dispatch('craft', recipeKey)
  },
  craft: async (c, recipeKey) => {
    await c.dispatch('stop')
    const recipe = c.rootGetters['recipes/recipe'](recipeKey)
    c.commit('SET_CURRENT_ACTIVITY', {
      type: CRAFTING,
      subject: recipeKey,
    })
    helpers.setCraftTimeoutAndInterval(c, recipe)
  },
  gather: (context, gatherableKey) => {
    context.dispatch('stop')
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
    if (context.state.currentActivity.type === CRAFTING) {
      const recipe = context.rootGetters['recipes/recipe'](
        context.state.currentActivity.subject
      )
      helpers.refundCost(context.commit, recipe)
    }
    context.commit('SET_CURRENT_ACTIVITY', idleActivity)
    helpers.cancelInterval(context.commit, context.state.interval)
    helpers.cancelTimeout(context.commit, context.state.timeout)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
