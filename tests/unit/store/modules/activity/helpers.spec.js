import * as helpers from '@s/modules/activity/helpers.js'

describe('helpers', () => {
  test('cancelInterval should work', () => {
    // arrange
    const context = {
      commit: jest.fn(),
      state: {
        interval: null,
      },
    }
    // act
    helpers.cancelInterval(context)
    // assert
    expect(context.commit).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith('SET_INTERVAL', null)
  })

  test('cancelTimeout should work', () => {
    // arrange
    const context = {
      commit: jest.fn(),
      state: {
        timeout: null,
      },
    }
    // act
    helpers.cancelTimeout(context)
    // assert
    expect(context.commit).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith('SET_TIMEOUT', null)
  })

  function expectAddItem(commit, item, amount) {
    expect(commit).toHaveBeenCalledWith(
      `inventory/ADD_ITEM`,
      {
        item,
        amount,
      },
      { root: true }
    )
  }

  test('subtractCost works', () => {
    // arrange
    const expected = 23
    const commit = jest.fn()
    const recipe = {
      cost: {
        wood: expected,
      },
    }
    // act
    helpers.subtractCost(commit, recipe)
    // assert
    expect(commit).toHaveBeenCalledTimes(1)
    expectAddItem(commit, 'wood', -expected)
  })

  test('subtractCost works when cost is multiple items', () => {
    // arrange
    const commit = jest.fn()
    const recipe = {
      cost: {
        wood: 23,
        iron: 17,
        stone: 88,
      },
    }
    // act
    helpers.subtractCost(commit, recipe)
    // assert
    expect(commit).toHaveBeenCalledTimes(3)
    expectAddItem(commit, 'wood', -recipe.cost.wood)
    expectAddItem(commit, 'iron', -recipe.cost.iron)
    expectAddItem(commit, 'stone', -recipe.cost.stone)
  })

  test('refundCost works', () => {
    // arrange
    const expected = 23
    const commit = jest.fn()
    const recipe = {
      cost: {
        wood: expected,
      },
    }
    // act
    helpers.refundCost(commit, recipe)
    // assert
    expect(commit).toHaveBeenCalledTimes(1)
    expectAddItem(commit, 'wood', expected)
  })

  test('finishCraft works', () => {
    // arrange
    const item = 'wood'
    const amount = 35
    const context = {
      commit: jest.fn(),
      dispatch: jest.fn(),
    }
    // act
    helpers.finishCraft(context, item, amount)
    // assert
    expect(context.dispatch).toHaveBeenCalledWith('craftNextInQueue')
    expect(context.commit).toHaveBeenCalledTimes(3)
    expect(context.commit).toHaveBeenCalledWith('DEQUEUE_CRAFT')
    expectAddItem(context.commit, item, amount)
  })

  test('gatherItem works and sets new timeout', () => {
    // arrange
    const item = 'wood'
    const amount = 35
    const context = {
      commit: jest.fn(),
      getters: {
        gatherTimeMs: jest.fn(),
      },
    }
    // act
    helpers.gatherItem(context, item, amount)
    // assert
    expect(context.commit).toHaveBeenCalledTimes(2)
    expectAddItem(context.commit, item, amount)
    expect(context.commit).toHaveBeenCalledWith(
      'SET_TIMEOUT',
      expect.anything()
    )
    expect(context.getters.gatherTimeMs).toHaveBeenCalledWith(item)
  })
})
