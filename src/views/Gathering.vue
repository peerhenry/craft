<template lang="pug">
.gathering
  h2.section-header Gathering
  div
    ActionButton(@click="gather('wood')") gather wood
    Spinner(v-show="isGathering('wood')")
  div
    ActionButton(@click="gather('stone')") gather stone
    Spinner(v-show="isGathering('stone')")
</template>

<script>
import Spinner from '@c/Spinner.vue'
import ActionButton from '@c/ActionButton.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('activity')

export default {
  name: 'Gathering',
  components: { Spinner, ActionButton },
  computed: mapGetters(['isGathering']),
  methods: mapActions(['gather']),
}
</script>

<style scoped lang="scss"></style>
