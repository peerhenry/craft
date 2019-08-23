import items from '@/settings/items.js'
import keyToDisplayName from '@/mixins/helpers/keyToDisplayName.js'

const itemDisplay = {
  methods: {
    displayItem(key) {
      const item = items[key]
      return `${item.icon} ${keyToDisplayName(key)}`
    },
  },
}

export default itemDisplay
