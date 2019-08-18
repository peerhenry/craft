import { getters } from '@s/store.js'

describe('store', () => {
  it('canCraft should return false if cost is not met', () => {
    const state = {
      recipes: {
        desk: {
          cost: { wood: 4 },
        },
      },
      inventory: { wood: 3 },
    }
    const item = 'desk'
    // act
    const result = getters.canCraft(state)(item)
    // assert
    expect(result).toBe(false)
  })

  it('canCraft should return true if cost is met', () => {
    const state = {
      recipes: {
        desk: {
          cost: { wood: 4 },
        },
      },
      inventory: { wood: 4 },
    }
    const item = 'desk'
    // act
    const result = getters.canCraft(state)(item)
    // assert
    expect(result).toBe(true)
  })

  it('canCraft should return false if inventory is empty', () => {
    const state = {
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
    const result = getters.canCraft(state)(item)
    // assert
    expect(result).toBe(false)
  })

  it('canCraft should return false if recipe does not exist', () => {
    const state = {
      recipes: {},
      inventory: { wood: 4 },
    }
    const item = 'desk'
    // act
    const result = getters.canCraft(state)(item)
    // assert
    expect(result).toBe(false)
  })
})
