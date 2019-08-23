<template lang="pug">
.gathering
  h2.section-header Gathering
  .gather-grid
    .gatherable(v-for="(gatherable, gatherableKey) of gatherables")
      ActionButton.gather-button(@click="startGathering(gatherableKey)") 
        span.gather-label {{ displayItem(gatherable.itemKey) }}
        Spinner.gather-spinner(v-show="isGathering(gatherableKey)")
</template>

<script>
import Spinner from '@c/Spinner.vue'
import ActionButton from '@c/ActionButton.vue'
import { createNamespacedHelpers } from 'vuex'
import gatherables from '@/settings/gatherables.js'
const { mapActions, mapGetters } = createNamespacedHelpers('activity')
import itemDisplay from '@/mixins/itemDisplay.js'

export default {
  name: 'Gathering',
  components: { Spinner, ActionButton },
  mixins: [itemDisplay],
  data() {
    return { gatherables }
  },
  computed: mapGetters(['isGathering']),
  methods: mapActions(['startGathering']),
}
</script>

<style scoped lang="scss">
.gather-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.gather-button {
  position: relative;
}

.gather-spinner {
  position: absolute;
  right: 1em;
}
</style>
