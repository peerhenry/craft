import recipes from '@/settings/recipes.js'
import items from '@/settings/items.js'

describe('recipes', () => {
  test('all items are defined', () => {
    for (const recipe of Object.values(recipes)) {
      expect(items[recipe.itemKey]).toBeTruthy()
    }
  })
})
