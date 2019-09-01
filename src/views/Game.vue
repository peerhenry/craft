<template lang="pug">
  #game
    .topbar
      h1#title C R A F T
      span.version v. 0.0.1
    .status status: {{ status }}
    .grid
      Inventory
      Gathering
      Crafting
      CraftingQueue
    ActionButton(style="margin-top: 32px; width: auto" @click="stop") stop current activity
</template>

<script>
import Gathering from '@/views/Gathering.vue'
import Crafting from '@/views/Crafting.vue'
import CraftingQueue from '@/views/CraftingQueue.vue'
import Inventory from '@/views/Inventory.vue'
import ActionButton from '@/components/ActionButton.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('activity')

export default {
  name: 'Game',
  components: { Gathering, Crafting, Inventory, CraftingQueue, ActionButton },
  data() {
    return {
      gatheringResource: null,
      crafting: null,
      craftProgress: 0,
      currentTimeout: null,
      currentInterval: null,
    }
  },
  computed: mapGetters(['status']),
  methods: mapActions(['stop']),
}
</script>

<style lang="scss">
html {
  background-color: #7fdbff;
  background-image: linear-gradient(#7fdbff, darkgreen);
  height: 100%;
}

#game {
  font-family: 'Josefin Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;
  padding: 0 2em;
}

#title {
  font-size: 6rem;
  font-weight: bold;
  margin: 2rem;
  font-family: 'Amaranth', sans-serif;
  filter: blur(1px);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 100%;
  margin: auto;
}

.section-header {
  font-size: 3rem;
  margin: 1rem 0;
}

.version {
  position: absolute;
  right: 10px;
  top: 10px;
}

.status {
  font-size: 1.8rem;
  margin: 2rem 0;
}
</style>
