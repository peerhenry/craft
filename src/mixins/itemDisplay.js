import items from '@/settings/items.js'

const itemDisplay = {
  methods: {
    displayItem(key) {
      const item = items[key]
      return `${item.icon} ${item.name}`
    },
  },
}

export default itemDisplay
