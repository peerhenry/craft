<template lang="pug">
.crafting
  h2.section-header Crafting
  .craft-grid
    div(v-for="(recipe, recipeKey) of recipes")
      ActionButton.craft-button(@click="enqueueCraft(recipeKey)" :disabled="!canCraft(recipeKey)") 
        span {{ displayRecipe(recipeKey) }}
        Spinner.craft-spinner(v-show="isCraftingRecipe(recipeKey)")
      .bar
        ProgressBar(v-show="isCraftingRecipe(recipeKey)" :progress="Math.round(craftProgress)" height="8px")
  CraftingQueue
</template>

<script>
import { ADD_ITEM } from '@s/mutation-types.js'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Spinner from '@c/Spinner.vue'
import ProgressBar from '@c/ProgressBar.vue'
import ActionButton from '@c/ActionButton.vue'
const { mapMutations } = createNamespacedHelpers('inventory')
const { mapActions } = createNamespacedHelpers('activity')
import recipeDisplay from '@/mixins/recipeDisplay.js'
import CraftingQueue from '@/views/CraftingQueue.vue'

export default {
  name: 'Crafting',
  components: { Spinner, ProgressBar, ActionButton, CraftingQueue },
  mixins: [recipeDisplay],
  computed: {
    ...mapGetters(['recipes']),
    ...mapGetters('activity', [
      'isCraftingRecipe',
      'canCraft',
      'craftProgress',
    ]),
  },
  methods: {
    ...mapMutations([ADD_ITEM]),
    ...mapActions(['enqueueCraft']),
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

.craft-button {
  position: relative;
}

.craft-spinner {
  position: absolute;
  right: 1em;
}
</style>
