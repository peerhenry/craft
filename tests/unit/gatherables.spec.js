import gatherables from '@/settings/gatherables.js'
import items from '@/settings/items.js'

describe('gatherables', () => {
  test('all items are defined', () => {
    for (const gatherable of Object.values(gatherables)) {
      expect(items[gatherable.itemKey]).toBeTruthy()
    }
  })
})
