<template lang="pug">
.crafting-page-grid
  Inventory
  Crafting
  CraftingQueue
</template>

<script>
import Crafting from '@/views/Crafting.vue'
import CraftingQueue from '@/views/CraftingQueue.vue'
import Inventory from '@/views/Inventory.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('activity')

export default {
  name: 'Game',
  components: { Inventory, Crafting, CraftingQueue },
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
.crafting-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 50%;
  margin: auto;
}
</style>
