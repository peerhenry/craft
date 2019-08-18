<template lang="pug">
.crafting
  h2.section-header Crafting
  .craft-grid
    div(v-for="(recipe, item) of recipes")
      ActionButton(@click="craft(item)" :disabled="!canCraft(item)") craft {{ recipe.name }}
      Spinner(v-show="isCrafting(item)")
      .bar
        ProgressBar(v-show="isCrafting(item)" :progress="Math.round(craftProgress)" height="8px")
</template>

<script>
import { ADD_ITEM } from '@s/mutation-types.js'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Spinner from '@c/Spinner.vue'
import ProgressBar from '@c/ProgressBar.vue'
import ActionButton from '@c/ActionButton.vue'
const { mapMutations } = createNamespacedHelpers('inventory')
const { mapActions } = createNamespacedHelpers('activity')

export default {
  name: 'Crafting',
  components: { Spinner, ProgressBar, ActionButton },
  computed: {
    ...mapGetters(['recipes']),
    ...mapGetters('activity', ['isCrafting', 'canCraft', 'craftProgress']),
  },
  methods: {
    ...mapMutations([ADD_ITEM]),
    ...mapActions(['craft']),
  },
}
</script>

<style scoped lang="scss">
.craft-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.bar {
  height: 8px;
}
</style>
