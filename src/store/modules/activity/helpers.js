import { ADD_ITEM } from '@s/mutation-types.js'
import { idleActivity } from '@s/modules/activity/activity-types.js'

export const cancelInterval = (commit, interval) => {
  clearInterval(interval)
  commit('SET_INTERVAL', null)
  commit('SET_CRAFT_PROGRSS', 0)
}

export const cancelTimeout = (commit, timeout) => {
  clearTimeout(timeout)
  commit('SET_TIMEOUT', null)
}

export const subtractCost = (commit, recipe) => {
  for (const [item, amount] of Object.entries(recipe.cost)) {
    addItem(commit, item, -amount)
  }
}

export const refundCost = (commit, recipe) => {
  for (const [item, amount] of Object.entries(recipe.cost)) {
    addItem(commit, item, amount)
  }
}

export const setCraftTimeoutAndInterval = (context, item, recipe) => {
  const craftingTimeMs = recipe.seconds * 1000
  setCraftTimeout(context, craftingTimeMs, item, 1)
  setCraftInterval(context, craftingTimeMs)
}

export const setCraftTimeout = (context, craftingTimeMs, item, amount) => {
  context.commit(
    'SET_TIMEOUT',
    setTimeout(() => finishCraft(context, item, amount), craftingTimeMs)
  )
}

export const finishCraft = (context, item, amount) => {
  context.commit('SET_CURRENT_ACTIVITY', idleActivity)
  addItem(context.commit, item, amount)
  context.dispatch('stop')
}

export const setCraftInterval = (context, craftingTimeMs) => {
  const intervalStepMs = 20
  const percentChange = (intervalStepMs / craftingTimeMs) * 100
  const updateProgress = () => updateCraftingProgress(context, percentChange)
  const interval = setInterval(updateProgress, intervalStepMs)
  context.commit('SET_INTERVAL', interval)
}

export const updateCraftingProgress = (context, percentChange) => {
  let newProgress = context.state.craftProgress + percentChange
  if (newProgress >= 100) {
    newProgress = 0
    clearInterval(context.state.interval)
    context.commit('SET_INTERVAL', null)
  }
  context.commit('SET_CRAFT_PROGRSS', newProgress)
}

export const setGatherTimeout = (context, item, amount) => {
  const gather = () => gatherItem(context, item, amount)
  const timeout = setTimeout(gather, context.getters.gatherTimeMs(item))
  context.commit('SET_TIMEOUT', timeout)
}

export const gatherItem = (context, item, amount) => {
  addItem(context.commit, item, amount)
  setGatherTimeout(context, item, amount)
}

export const addItem = (commit, item, amount) => {
  commit(
    `inventory/${ADD_ITEM}`,
    {
      item,
      amount,
    },
    { root: true }
  )
}
