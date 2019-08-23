<template lang="pug">
  #game
    .topbar
      h1#title CRAFT
      span.version v. 0.0.1
    p.status status: {{ status }}
    .grid
      Inventory
      Gathering
      Crafting
    div(style="margin-top: 32px")
      button.action-btn(@click="stop") stop current activity
</template>

<script>
import Gathering from '@/views/Gathering.vue'
import Crafting from '@/views/Crafting.vue'
import Inventory from '@/views/Inventory.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('activity')

export default {
  name: 'Game',
  components: { Gathering, Crafting, Inventory },
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
#game {
  font-family: 'Josefin Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;
}

#title {
  font-size: 3rem;
  font-weight: bold;
  margin: 2rem;
  font-family: 'Amaranth', sans-serif;
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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 50%;
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
}
</style>
