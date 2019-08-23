import items from '@/settings/items.js'
import recipes from '@/settings/recipes.js'

const itemDisplay = {
  methods: {
    displayRecipe(key) {
      const recipe = recipes[key]
      const item = items[recipe.itemKey]
      return `${item.icon} ${item.name}`
    },
  },
}

export default itemDisplay
