<template lang="pug">
  #game
    .topbar
      h1#title C R A F T
      span.version v. 0.0.1
    .statusbar status: {{ status }}
    .navbar
      span.nav-item
        router-link(:to="{name: 'gathering'}") Gathering
      span.nav-item
        router-link(:to="{name: 'crafting'}") Crafting
      span.nav-item
        router-link(:to="{name: 'tools'}") Tools
    router-view
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
  components: { Gathering, Crafting, Inventory, ActionButton, CraftingQueue },
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
  font-size: 4.8rem;
  font-weight: bold;
  margin: 2rem;
  font-family: 'Amaranth', sans-serif;
  filter: blur(1px);
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

.statusbar {
  font-size: 1.8rem;
  margin: 2rem 0;
}

.navbar {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50%;
  margin: auto;
  margin-bottom: 4rem;
}

.nav-item a {
  font-family: 'Amaranth', sans-serif;
  filter: blur(0.5px);
  font-size: 3.8rem;
  text-decoration: none;
  color: #222;
  transition: color 0.1s linear;

  &.router-link-exact-active {
    color: red;
    filter: blur(1px);
  }

  &:hover {
    color: lightgoldenrodyellow;
    filter: blur(1px);
  }
}
</style>
