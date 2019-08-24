import { ADD_ITEM } from '@s/mutation-types.js'

export const clearTimeoutAndInterval = ctx => {
  cancelInterval(ctx)
  cancelTimeout(ctx)
}

export const cancelInterval = ctx => {
  clearInterval(ctx.state.interval)
  ctx.commit('SET_INTERVAL', null)
}

export const cancelTimeout = ctx => {
  clearTimeout(ctx.state.timeout)
  ctx.commit('SET_TIMEOUT', null)
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

export const setCraftTimeoutAndInterval = (context, recipe) => {
  const progress = context.getters.craftProgressPercent / 100
  const craftingDurationMs = recipe.craftDurationSeconds * 1000
  const remainingCraftTimeMs = craftingDurationMs * (1 - progress)
  setCraftTimeout(context, {
    timeMs: remainingCraftTimeMs,
    recipe,
  })
  setCraftInterval(context, craftingDurationMs)
}

export const setCraftTimeout = (context, payload) => {
  context.commit(
    'SET_TIMEOUT',
    setTimeout(
      () => finishCraft(context, payload.recipe.itemKey, payload.recipe.amount),
      payload.timeMs
    )
  )
}

export const finishCraft = (context, itemKey, amount) => {
  context.commit('DEQUEUE_CRAFT')
  context.commit('SET_IDLE')
  addItem(context.commit, itemKey, amount)
  context.dispatch('craftNextInQueue')
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
    cancelInterval(context)
  }
  context.commit('SET_CRAFT_PROGRESS', newProgress)
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
