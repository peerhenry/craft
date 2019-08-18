<template lang="pug">
.gathering
  h2.section-header Gathering
  .gather-grid
    .gatherable(v-for="gatherable of gatherables")
      ActionButton(@click="gather(gatherable.item )") gather {{ gatherable.item }}
      Spinner(v-show="isGathering(gatherable.item )")
</template>

<script>
import Spinner from '@c/Spinner.vue'
import ActionButton from '@c/ActionButton.vue'
import { createNamespacedHelpers } from 'vuex'
import gatherables from '@/settings/gatherables.js'
const { mapActions, mapGetters } = createNamespacedHelpers('activity')

export default {
  name: 'Gathering',
  components: { Spinner, ActionButton },
  data() {
    return {
      gatherables,
    }
  },
  computed: mapGetters(['isGathering']),
  methods: mapActions(['gather']),
}
</script>

<style scoped lang="scss">
.gather-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
</style>
