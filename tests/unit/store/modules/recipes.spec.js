import recipes from '@s/modules/recipes.js'

describe('inventory', () => {
  it('should be namespaced', () => {
    expect(recipes.namespaced).toBe(true)
  })
})
