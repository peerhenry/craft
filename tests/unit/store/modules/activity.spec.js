import { getters } from '@s/modules/activity.js'

describe('activity getters', () => {
  test('canCraft should return false if cost is not met', () => {
    const rootState = {
      recipes: {
        desk: {
          cost: { wood: 4 },
        },
      },
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
      recipes: {
        desk: {
          cost: { wood: 4 },
        },
      },
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
      recipes: {
        desk: {
          cost: {
            wood: 4,
          },
        },
      },
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
      recipes: {},
      inventory: { wood: 4 },
    }
    const item = 'desk'
    // act
    const result = getters.canCraft({}, {}, rootState)(item)
    // assert
    expect(result).toBe(false)
  })
})
