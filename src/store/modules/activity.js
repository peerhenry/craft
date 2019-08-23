import Vue from 'vue'
import gatherables from '@/settings/gatherables.js'
import {
  GATHERING,
  CRAFTING,
  IDLE,
  idleActivity,
} from '@s/modules/activity/activity-types.js'
import * as helpers from '@s/modules/activity/helpers'
import recipes from '@/settings/recipes.js'

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
  SET_IDLE: state => Vue.set(state, 'currentActivity', idleActivity),
  SET_INTERVAL: (state, interval) => (state.interval = interval),
  SET_TIMEOUT: (state, timeout) => (state.timeout = timeout),
  RESET_CRAFT_PROGRESS: state => (state.craftProgress = 0),
  SET_CRAFT_PROGRESS: (state, progress) => (state.craftProgress = progress),
  ENQUEUE_CRAFT: (state, recipe) => {
    state.craftQueue.push(recipe)
  },
  DEQUEUE_CRAFT: state => state.craftQueue.shift(),
  QUEUE_REMOVE_CRAFT: (state, index) => state.craftQueue.splice(index, 1),
}

export const actions = {
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
    c.dispatch('stop') // other actions must be stopped
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
    if (context.getters.isCrafting) {
      context.commit('DEQUEUE_CRAFT')
      const recipe = recipes[context.state.currentActivity.subject]
      helpers.refundCost(context.commit, recipe)
    }
    context.commit('SET_IDLE')
    helpers.cancelInterval(context.commit, context.state.interval)
    helpers.cancelTimeout(context.commit, context.state.timeout)
  },
  cancelCraft: (context, index) => {
    const recipeKey = context.state.craftQueue[index]
    const recipe = recipes[recipeKey]
    helpers.refundCost(context.commit, recipe)
    context.commit('QUEUE_REMOVE_CRAFT', index)
    if (index === 0) {
      context.dispatch('craftNextInQueue')
    }
  },
  pauseCraft: context => {},
  continueCraft: context => {},
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
