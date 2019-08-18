import inventory from '@s/modules/inventory.js'
import { ADD_ITEM } from '@s/mutation-types.js'

describe('inventory', () => {
  it('should be namespaced', () => {
    expect(inventory.namespaced).toBe(true)
  })

  it('should have empty state', () => {
    expect(inventory.state).toEqual({})
  })

  it('should have empty state', () => {
    // arrange
    const expected = 24
    const state = {}
    const payload = { item: 'wood', amount: expected }
    // act
    inventory.mutations[ADD_ITEM](state, payload)
    // assert
    expect(state.wood).toEqual(expected)
  })
})
