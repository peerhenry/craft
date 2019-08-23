import items from '@/settings/items.js'
import recipes from '@/settings/recipes.js'

const itemDisplay = {
  methods: {
    displayRecipe(key) {
      const recipe = recipes[key]
      const item = items[recipe.itemKey]
      const name = this.keyToDisplayName(recipe.itemKey)
      return `${item.icon} ${name}`
    },
    keyToDisplayName(key) {
      return key
        .split('_')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    },
  },
}

export default itemDisplay
