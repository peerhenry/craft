<template lang="pug">
  #game
    h1#title CRAFT
    p state: {{ state }}
    .grid
      .actions
        h2.section-header Actions
        div
          button.action-btn(@click="startGathering('wood')") gather wood
          Spinner(v-show="gatheringResource === 'wood'")
        div
          button.action-btn(@click="startGathering('stone')") gather stone
          Spinner(v-show="gatheringResource === 'stone'")
        div
          button.action-btn(@click="startGathering()") stop gathering
      .inventory
        h2.section-header Inventory
        p wood: {{ wood }}
        p stone: {{ stone }}
</template>

<script>
import { setTimeout, clearTimeout } from 'timers'
import Spinner from '@c/Spinner.vue'

export default {
  name: 'Game',
  components: { Spinner },
  data() {
    return {
      wood: 0,
      stone: 0,
      gatheringResource: null,
      currentTimeout: null,
    }
  },
  computed: {
    state() {
      if (this.gatheringResource) return `gathering ${this.gatheringResource}`
      else return 'idle'
    },
  },
  methods: {
    gather(resource) {
      this[resource] += 1
      this.setGatherTimeout()
    },
    setGatherTimeout() {
      this.currentTimeout = setTimeout(
        () => this.gather(this.gatheringResource),
        1000
      )
    },
    startGathering(resource) {
      if (this.isValidResource(resource)) {
        if (resource !== this.gatheringResource) {
          clearTimeout(this.currentTimeout)
          this.gatheringResource = resource
          this.setGatherTimeout()
        }
      } else {
        clearTimeout(this.currentTimeout)
        this.gatheringResource = null
      }
    },
    isValidResource(resource) {
      return resource === 'wood' || resource === 'stone'
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
