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
    return `${state.currentActivity.type} ${state.currentActivity.item}`
  },
  isGathering: state => item =>
    state.currentActivity.type === GATHERING &&
    state.currentActivity.item === item,
  isCraftingItem: state => item =>
    state.currentActivity.type === CRAFTING &&
    state.currentActivity.item === item,
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
  SET_CRAFT_PROGRSS: (state, progress) => (state.craftProgress = progress),
  ENQUEUE_CRAFT: (state, recipe) => {
    state.craftQueue.push(recipe)
  },
  DEQUEUE_CRAFT: state => state.craftQueue.shift(),
}

export const actions = {
  enqueueCraft: (context, itemKey) => {
    const recipe = context.rootGetters['recipes/recipe'](itemKey)
    context.commit('ENQUEUE_CRAFT', recipe)
    if (!context.getters.isCrafting) context.dispatch('craftNextInQueue')
  },
  craftNextInQueue: c => {
    if (c.state.craftQueue.length === 0) return
    const nextRecipe = c.state.craftQueue[0]
    c.commit('DEQUEUE_CRAFT')
    c.dispatch('craft', nextRecipe)
  },
  craft: async (context, recipe) => {
    // obsolete?
    await context.dispatch('stop')
    helpers.subtractCost(context.commit, recipe)
    context.commit('SET_CURRENT_ACTIVITY', {
      type: CRAFTING,
      item: recipe.key,
    })
    helpers.setCraftTimeoutAndInterval(context, recipe.key, recipe)
  },
  gather: (context, item) => {
    context.dispatch('stop')
    context.commit('SET_CURRENT_ACTIVITY', {
      type: GATHERING,
      item: item,
    })
    helpers.setGatherTimeout(context, item, gatherables[item].amount)
  },
  stop: context => {
    if (context.state.currentActivity.type === CRAFTING) {
      const recipe = context.rootGetters['recipes/recipe'](
        context.state.currentActivity.item
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
