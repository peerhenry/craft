import Vue from 'vue'
import { ADD_ITEM } from '@s/mutation-types.js'

// activity types
const IDLE = 'idle'
const CRAFTING = 'crafting'
const GATHERING = 'gathering'
// const HUNTING = 'HUNTING'
// const MINING = 'MINING'

const idleActivity = {
  type: IDLE,
  item: null,
}

export default {
  namespaced: true,
  state: {
    currentActivity: idleActivity,
    craftProgress: 0,
    interval: null,
    timeout: null,
  },

  getters: {
    status: state => {
      if (state.currentActivity.type === IDLE) return 'idle'
      return `${state.currentActivity.type} ${state.currentActivity.item}`
    },
    isGathering: state => item =>
      state.currentActivity.type === GATHERING &&
      state.currentActivity.item === item,
    isCrafting: state => item =>
      state.currentActivity.type === CRAFTING &&
      state.currentActivity.item === item,
    gatherTimeMs: () => () => 1000,
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
  },

  mutations: {
    SET_CURRENT_ACTIVITY: (state, activity) =>
      Vue.set(state, 'currentActivity', activity),
    SET_INTERVAL: (state, interval) => (state.interval = interval),
    SET_TIMEOUT: (state, timeout) => (state.timeout = timeout),
    SET_CRAFT_PROGRSS: (state, progress) => (state.craftProgress = progress),
  },

  actions: {
    craft: (context, item) => {
      const recipe = context.rootGetters['recipes/recipe'](item)
      subtractCost(context.commit, recipe)
      context.dispatch('stop')
      context.commit('SET_CURRENT_ACTIVITY', {
        type: CRAFTING,
        item: item,
      })
      setCraftTimeoutAndInterval(context, item, recipe)
    },
    gather: (context, item) => {
      context.dispatch('stop')
      context.commit('SET_CURRENT_ACTIVITY', {
        type: GATHERING,
        item: item,
      })
      setGatherTimeout(context, item, 1) // todo: lookup amount in gatherables)
    },
    stop: context => {
      context.commit('SET_CURRENT_ACTIVITY', idleActivity)
      clearTimeout(context.state.timeout)
      context.commit('SET_TIMEOUT', null)
    },
  },
}

// ==== HELPERS ====

const subtractCost = (commit, recipe) => {
  for (const [item, amount] of Object.entries(recipe.cost)) {
    addItem(commit, item, -amount)
  }
}

const setCraftTimeoutAndInterval = (context, item, recipe) => {
  const craftingTimeMs = recipe.seconds * 1000
  setCraftTimeout(context, craftingTimeMs, item, 1)
  setCraftInterval(context, craftingTimeMs)
}

const setCraftTimeout = (context, craftingTimeMs, item, amount) => {
  context.commit(
    'SET_TIMEOUT',
    setTimeout(() => {
      addItem(context.commit, item, amount)
      context.dispatch('stop')
    }, craftingTimeMs)
  )
}

const setCraftInterval = (context, craftingTimeMs) => {
  const intervalStepMs = 20
  const percentChange = (intervalStepMs / craftingTimeMs) * 100
  context.commit(
    'SET_INTERVAL',
    setInterval(() => {
      let newProgress = context.state.craftProgress + percentChange
      if (newProgress >= 100) {
        newProgress = 0
        clearInterval(context.state.interval)
        context.commit('SET_INTERVAL', null)
      }
      context.commit('SET_CRAFT_PROGRSS', newProgress)
    }, intervalStepMs)
  )
}

const setGatherTimeout = (context, item, amount) => {
  context.commit(
    'SET_TIMEOUT',
    setTimeout(
      gatherItem(context, item, amount),
      context.getters.gatherTimeMs(item)
    )
  )
}

const gatherItem = (context, item, amount) => () => {
  addItem(context.commit, item, amount)
  setGatherTimeout(context, item, amount)
}

const addItem = (commit, item, amount) => {
  commit(
    `inventory/${ADD_ITEM}`,
    {
      item,
      amount,
    },
    { root: true }
  )
}
