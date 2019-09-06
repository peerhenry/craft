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
      () => finishCraft(context, payload.recipe, payload.recipe.amount),
      payload.timeMs
    )
  )
}

export const finishCraft = (context, recipe) => {
  addItem(context.commit, recipe.itemKey, recipe.amount)
  context.commit('character/ADD_NOURISHMENT', recipe.effect.nourishment, {
    root: true,
  })
  context.commit('character/ADD_XP', recipe.effect.xp, { root: true })
  context.commit('DEQUEUE_CRAFT')
  context.commit('SET_IDLE')
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

export const setGatherTimeout = (context, gatherable) => {
  // item, amount
  const gather = () => {
    gatherItem(context, gatherable)
  }
  const timeout = setTimeout(gather, gatherable.durationSeconds * 1000)
  context.commit('SET_TIMEOUT', timeout)
}

export const gatherItem = (context, gatherable) => {
  addItem(context.commit, gatherable.itemKey, gatherable.amount)
  context.commit('character/ADD_NOURISHMENT', gatherable.effect.nourishment, {
    root: true,
  })
  context.commit('character/ADD_XP', gatherable.effect.xp, { root: true })
  // start new gather
  setGatherTimeout(context, gatherable)
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
