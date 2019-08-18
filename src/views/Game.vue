<template lang="pug">
  #game
    h1#title CRAFT
    p state: {{ state }}
    .grid
      .inventory
        h2.section-header Inventory
        p(v-for="(value, item) in inventory") {{ item }}: {{ value }}
      .actions
        h2.section-header Actions
        div
          button.action-btn(@click="startGathering('wood')") gather wood
          Spinner(v-show="gatheringResource === 'wood'")
        div
          button.action-btn(@click="startGathering('stone')") gather stone
          Spinner(v-show="gatheringResource === 'stone'")
      .crafting
        h2.section-header Crafting
        div
          button.action-btn(@click="craft('chair')" :disabled="!canCraft('chair')") craft chair
          Spinner(v-show="crafting === 'chair'")
      div(style="margin-top: 32px")
        button.action-btn(@click="startGathering()") cancel action
</template>

<script>
import { setTimeout, clearTimeout } from 'timers'
import Spinner from '@c/Spinner.vue'
import { mapState, mapGetters, createNamespacedHelpers } from 'vuex'
import { ADD_ITEM } from '@s/mutation-types.js'

const { mapMutations } = createNamespacedHelpers('inventory')

export default {
  name: 'Game',
  components: { Spinner },
  data() {
    return {
      gatheringResource: null,
      crafting: null,
      currentTimeout: null,
    }
  },
  computed: {
    ...mapState({
      inventory: state => state.inventory,
      recipes: state => state.recipes,
    }),
    ...mapGetters(['canCraft']),
    state() {
      if (this.gatheringResource) return `gathering ${this.gatheringResource}`
      else if (this.crafting) return `crafting ${this.crafting}`
      else return 'idle'
    },
  },
  methods: {
    ...mapMutations([ADD_ITEM]),
    startGathering(resource) {
      if (this.isValidResource(resource)) {
        if (resource !== this.gatheringResource) {
          this.cancel()
          this.gatheringResource = resource
          this.setGatherTimeout()
        }
      } else {
        this.cancel()
        this.gatheringResource = null
      }
    },
    isValidResource(resource) {
      return resource === 'wood' || resource === 'stone'
    },
    cancel() {
      clearTimeout(this.currentTimeout)
      this.currentTimeout = null
      this.gatheringResource = null
      if (this.crafting) {
        const cost = this.recipes[this.crafting].cost
        for (const [key, val] of Object.entries(cost)) {
          this.addToInventory(key, val)
        }
      }
      this.crafting = null
    },
    setGatherTimeout() {
      this.currentTimeout = setTimeout(
        () => this.gather(this.gatheringResource),
        1000
      )
    },
    gather(resource) {
      this[ADD_ITEM]({ item: resource, amount: 1 })
      this.setGatherTimeout()
    },
    craft(item) {
      const isValid = item in this.recipes
      if (!isValid) return
      if (this.crafting !== item && this.currentTimeout) {
        this.cancel()
      }
      const recipe = this.recipes[item]
      const cost = recipe.cost
      const costEntries = Object.entries(cost)
      for (const [key, val] of costEntries) {
        this[ADD_ITEM]({
          item: key,
          amount: -val,
        })
      }
      this.crafting = item
      this.currentTimeout = setTimeout(() => {
        this[ADD_ITEM]({ item })
        this.crafting = null
        this.cancel()
      }, recipe.seconds * 1000)
    },
  },
}
</script>

<style lang="scss">
#game {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;
}

#title {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem;
}

.action-btn {
  padding: 0.8em;
  outline: none;
  border: none;
  color: white;
  background-color: #4caf50;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-bottom: 0.5em;
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 1rem;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 50%;
  margin: auto;
}

.section-header {
  font-size: 3rem;
  margin: 1rem 0;
}
</style>
