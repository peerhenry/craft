import getters from '@s/modules/activity/getters.js'
import * as recipes from '@/settings/recipes.js'
recipes.default = {
  desk: {
    cost: { wood: 4 },
  },
}

describe('activity getters', () => {
  test('canCraft should return false if cost is not met', () => {
    const rootState = {
      inventory: { wood: 3 },
    }
    const item = 'desk'
    // act
    const result = getters.canCraft({}, {}, rootState)(item)
    // assert
    expect(result).toBe(false)
  })

  test('canCraft should return true if cost is met', () => {
    const rootState = {
      inventory: { wood: 4 },
    }
    const item = 'desk'
    // act
    const result = getters.canCraft({}, {}, rootState)(item)
    // assert
    expect(result).toBe(true)
  })

  test('canCraft should return false if inventory is empty', () => {
    const rootState = {
      inventory: {},
    }
    const item = 'desk'
    // act
    const result = getters.canCraft({}, {}, rootState)(item)
    // assert
    expect(result).toBe(false)
  })

  test('canCraft should return false if recipe does not exist', () => {
    const rootState = {
      inventory: { wood: 4 },
    }
    const item = 'asofuh'
    // act
    const result = getters.canCraft({}, {}, rootState)(item)
    // assert
    expect(result).toBe(false)
  })
})
