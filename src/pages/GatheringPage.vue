<template lang="pug">
.gather-grid
  Inventory
  Gathering
</template>

<script>
import Gathering from '@/views/Gathering.vue'
import Inventory from '@/views/Inventory.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('activity')

export default {
  name: 'Game',
  components: { Gathering, Inventory },
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
.gather-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 50%;
  margin: auto;
}

.section-header {
  font-size: 3rem;
  margin: 1rem 0;
}
</style>
