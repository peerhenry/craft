import items from '@/settings/items.js'
import recipes from '@/settings/recipes.js'
import keyToDisplayName from '@/mixins/helpers/keyToDisplayName.js'

const recipeDisplay = {
  methods: {
    displayRecipe(key) {
      const recipe = recipes[key]
      const item = items[recipe.itemKey]
      const name = keyToDisplayName(recipe.itemKey)
      return `${item.icon} ${name}`
    },
  },
}

export default recipeDisplay
