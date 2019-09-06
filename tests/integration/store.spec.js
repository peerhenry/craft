import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '@s/store-config.js'
import {
  IDLE,
  GATHERING,
  CRAFTING,
} from '@s/modules/activity/activity-types.js'
import recipes from '@/settings/recipes.js'

Vue.use(Vuex)

const resetStore = store => {
  store.replaceState({
    activity: {
      craftProgress: 0,
      craftQueue: [],
      currentActivity: {
        type: IDLE,
        subject: null,
      },
      interval: null,
      timeout: null,
    },
    inventory: {},
    recipes,
  })
}

describe('store', () => {
  it('dispatch startGathering should set correct currentActivity', async () => {
    // Arrange
    const store = new Vuex.Store(storeConfig)
    resetStore(store)
    // Act
    await store.dispatch('activity/startGathering', 'wood')
    // Assert
    const activity = store.state.activity.currentActivity
    expect(activity.type).toBe(GATHERING)
    expect(activity.subject).toBe('wood')
  })

  it('dispatch craft while gathering should cancel gather', async () => {
    // Arrange
    const store = new Vuex.Store(storeConfig)
    resetStore(store)
    store.state.inventory.wood = 500
    await store.dispatch('activity/startGathering', 'wood')
    // Act
    await store.dispatch('activity/craft', 'sticks')
    // Assert
    const activity = store.state.activity.currentActivity
    expect(activity.type).toBe(CRAFTING)
    expect(activity.subject).toBe('sticks')
  })

  it('dispatch enqueueCraft should subtract proper cost', async () => {
    // Arrange
    const store = new Vuex.Store(storeConfig)
    resetStore(store)
    const initialWood = 500
    store.state.inventory.wood = initialWood
    const recipeKey = 'sticks'
    const cost = recipes[recipeKey].cost.wood
    const expected = initialWood - cost
    // Act
    await store.dispatch('activity/enqueueCraft', recipeKey)
    // Assert
    const result = store.state.inventory.wood
    expect(result).toBe(expected)
  })

  it('dispatch startGathering while crafting should pause crafting', async () => {
    // Arrange
    const store = new Vuex.Store(storeConfig)
    resetStore(store)
    expect(store.getters['activity/craftingIsPaused']).toBeFalsy() // sanity
    const initialWood = 500
    store.state.inventory.wood = initialWood
    await store.dispatch('activity/enqueueCraft', 'sticks')
    expect(store.getters['activity/craftingIsPaused']).toBeFalsy() // assert setup
    // Act
    await store.dispatch('activity/startGathering', 'wood')
    // Assert
    expect(store.getters['activity/craftingIsPaused']).toBe(true)
  })

  it('cancelCraft on later item should not influence craft in progress', async () => {
    // Arrange
    const store = new Vuex.Store(storeConfig)
    resetStore(store)
    expect(store.getters['activity/craftingIsPaused']).toBeFalsy() // sanity
    const initialWood = 500
    store.state.inventory.wood = initialWood
    await store.dispatch('activity/enqueueCraft', 'sticks')
    await store.dispatch('activity/enqueueCraft', 'sticks')
    expect(store.getters['activity/craftingIsPaused']).toBeFalsy() // assert setup
    // Act
    await store.dispatch('activity/cancelCraft', 1)
    // Assert
    expect(store.getters['activity/craftingIsPaused']).toBe(false)
    expect(store.getters['activity/isCraftingRecipe']('sticks')).toBe(true)
    expect(store.state.activity.interval).not.toBe(null)
    expect(store.state.activity.timeout).not.toBe(null)
  })
})
