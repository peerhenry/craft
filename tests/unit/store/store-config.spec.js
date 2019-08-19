import storeConfig from '@s/store-config.js'

describe('storeConfig', () => {
  it('should contain recipes getter', () => {
    const expected = 'yo195'
    const rootState = {
      recipes: expected,
    }
    // act
    const result = storeConfig.getters.recipes({}, {}, rootState)
    // assert
    expect(result).toBe(expected)
  })
})
